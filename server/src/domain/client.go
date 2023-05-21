package domain

import (
	"fmt"
	"log"

	"github.com/gorilla/websocket"
)

type Client struct {
	ws     *websocket.Conn
	sendCh chan []byte
	user   int
}

type SocketMsg struct {
	Method  string
	Message string
	User    int
	Num     int
}

func NewClient(ws *websocket.Conn, user int) *Client {
	return &Client{
		ws:     ws,
		sendCh: make(chan []byte),
		user:   user,
	}
}

func (c *Client) ReadLoop(broadCast chan<- []byte, unregister chan<- *Client) {
	defer func() {
		// disconnectMsg := &SocketMsg{Method: "Disconnect", Message: "", User: c.user, Num: -1}
		// disconnectMsg_json, _ := json.Marshal(disconnectMsg)
		// broadCast <- disconnectMsg_json
		c.disconnect(unregister)
	}()

	for {
		_, jsonMsg, err := c.ws.ReadMessage()
		if err != nil {
			if websocket.IsUnexpectedCloseError(err, websocket.CloseGoingAway, websocket.CloseAbnormalClosure) {
				log.Printf("unexpected close error: %v", err)
			}
			break
		}
		fmt.Println(string(jsonMsg))
		broadCast <- jsonMsg
	}
}

func (c *Client) WriteLoop() {
	defer func() {
		c.ws.Close()
	}()

	for {
		message := <-c.sendCh

		fmt.Println(string(message))

		w, err := c.ws.NextWriter(websocket.TextMessage)
		if err != nil {
			return
		}

		w.Write(message)

		if err := w.Close(); err != nil {
			return
		}
	}
}

func (c *Client) disconnect(unregister chan<- *Client) {
	unregister <- c
	c.ws.Close()
}
