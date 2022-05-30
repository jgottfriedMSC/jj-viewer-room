package viewer.room.server.controller;

import java.security.Principal;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.simp.user.SimpUser;
import org.springframework.messaging.simp.user.SimpUserRegistry;
import org.springframework.stereotype.Controller;

import viewer.room.server.dto.OutputMessage;

@Controller
public class WebSocketBroadcastController {
	
	@Autowired
	private SimpUserRegistry userRegistry;
	
	@Autowired
	private SimpMessagingTemplate template;
	
	@MessageMapping("/operations")
	@SendTo("/topic/operations")
	public void handleOperation(OutputMessage msg, StompHeaderAccessor headers) {
		sendTo("/topic/operations", msg, headers);
	}
	
	private void sendTo(String destination, OutputMessage message, StompHeaderAccessor headers) {
		Optional<String> user = Optional.ofNullable(headers.getUser()).map(Principal::getName);
		System.out.println("USER:" + user);
		
		if (user.isPresent()) {
			List<String> subscribers = userRegistry.getUsers().stream()
					.map(SimpUser::getName)
					.filter(name -> !user.get().equals(name))
					.collect(Collectors.toList());
			for (String s : subscribers) {
				System.out.println(s);
			}
			
			
			subscribers.forEach(sub -> template.convertAndSendToUser(sub, destination, message));
		}
	}
	
}
