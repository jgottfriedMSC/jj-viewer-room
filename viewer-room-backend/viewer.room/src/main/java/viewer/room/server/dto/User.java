package viewer.room.server.dto;

public class User {

	private String name;
	private String room;
	
	public User(String name, String room) {
		this.name = name;
		this.room = room;
	}
	
	public String getName() {
		return this.name;
	}
	
	public String getRoom() {
		return this.room;
	}
	
}
