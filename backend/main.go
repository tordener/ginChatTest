package main

import (
	"log"
	"net/http"
	"sync"

	"github.com/gin-gonic/gin"
	"github.com/gorilla/websocket"
)

var upgrader = websocket.Upgrader{
	CheckOrigin: func(r *http.Request) bool { return true },
}

type client struct {
	conn *websocket.Conn
	send chan []byte
}

var clients = make(map[*client]bool)
var clientsMu sync.Mutex

func broadcast(message []byte) {
	clientsMu.Lock()
	defer clientsMu.Unlock()
	for c := range clients {
		select {
		case c.send <- message:
		default:
			close(c.send)
			delete(clients, c)
		}
	}
}

func handleWs(c *gin.Context) {
	ws, err := upgrader.Upgrade(c.Writer, c.Request, nil)
	if err != nil {
		log.Println("Upgrade error:", err)
		return
	}
	client := &client{conn: ws, send: make(chan []byte, 256)}

	clientsMu.Lock()
	clients[client] = true
	clientsMu.Unlock()

	go writePump(client)
	readPump(client)
}

func readPump(c *client) {
	defer func() {
		clientsMu.Lock()
		delete(clients, c)
		clientsMu.Unlock()
		c.conn.Close()
	}()
	for {
		_, message, err := c.conn.ReadMessage()
		if err != nil {
			log.Println("read error:", err)
			break
		}
		broadcast(message)
	}
}

func writePump(c *client) {
	for msg := range c.send {
		err := c.conn.WriteMessage(websocket.TextMessage, msg)
		if err != nil {
			break
		}
	}
	c.conn.Close()
}

func main() {
	r := gin.Default()
	r.GET("/ws", func(c *gin.Context) {
		handleWs(c)
	})
	r.Run(":8080")
}
