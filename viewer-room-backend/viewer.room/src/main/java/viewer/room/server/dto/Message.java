package viewer.room.server.dto;

import viewer.room.server.utils.StringUtils;

public class Message {

	private String from;
	private String text;
	private String recipient;
	private String time;
	
	public Message() {
		
	}
	
	public Message(String from, String text, String recipient) {
		this.from = from;
		this.text = text;
		this.recipient = recipient;
		this.time = StringUtils.getCurrentTimeStamp();
	}
	
	public String getFrom() {
		return this.from;
	}
	
	public String getText() {
		return this.text;
	}
	
	public String getRecipient() {
		return this.recipient;
	}
	
	public String getTime() {
		return this.time;
	}
}
