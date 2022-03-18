package viewer.room.server;

import java.net.ServerSocket;

public class SimpleHTTPServer {

	public static void main(String[] args) throws Exception {
		try (ServerSocket serverSocket = new ServerSocket(8080)) {
			while (true) {
				// do something
			}
		}
	}
	
	
}
