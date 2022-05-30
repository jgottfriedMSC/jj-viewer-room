package viewer.room.server.controller;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import viewer.room.server.dto.Message;

@Controller
public class WebSocketBroadcastController {
	
	@MessageMapping("/operations")
	@SendTo("/topic/operations")
	public Message handleOperation(Message msg) {
		return new Message(msg.getFrom(), msg.getText(), "ALL");
	}
	
}
