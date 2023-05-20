package handlers

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	"server/src/domain"

	"github.com/gorilla/websocket"
)

type WebsocketHandler struct {
	hub *domain.Hub
}

type SocketMsg struct {
	Method  string
	Message string
	User    int
	Num     int
}

func NewWebsocketHandler(hub *domain.Hub) *WebsocketHandler {
	return &WebsocketHandler{
		hub: hub,
	}
}

func (h *WebsocketHandler) Handle(w http.ResponseWriter, r *http.Request) {
	upgrader := &websocket.Upgrader{
		CheckOrigin: func(r *http.Request) bool {
			return true
		},
	}

	ws, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Fatal(err)
	}

	client := domain.NewClient(ws)
	fmt.Println("create client")
	go client.ReadLoop(h.hub.BroadcastCh, h.hub.UnRegisterCh)
	go client.WriteLoop()

	message := &SocketMsg{Method: "GetMe", Message: "", User: len(h.hub.Clients), Num: len(h.hub.Clients) + 1}
	message_json, _ := json.Marshal(message)

	writer, err := ws.NextWriter(websocket.TextMessage)
	if err != nil {
		return
	}

	writer.Write(message_json)

	if err := writer.Close(); err != nil {
		return
	}

	h.hub.RegisterCh <- client
}
