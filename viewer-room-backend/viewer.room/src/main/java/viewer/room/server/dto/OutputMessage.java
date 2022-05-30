package viewer.room.server.dto;

import viewer.room.server.utils.StringUtils;

public class OutputMessage {

	private String from;
	private String text;
	private String recipient;
	private String time;
	
	public OutputMessage() {
		
	}
	
	public OutputMessage(String from, String text, String recipient) {
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
