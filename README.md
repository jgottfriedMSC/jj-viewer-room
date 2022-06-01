# jj-viewer-room
## Description
This application is somewhat similar to the well-known web app "Watch2Gether". Users can meet in a room via the browser and watch YouTube videos together. The commands that have been implemented and are sent to all clients in parallel are:

1. play - command to start the current video.
2. pause - command to pause the current video
3. like - give a like to a video in the waiting list
4. dislike - give a dislike to a video in the waiting list
5. delete - delete a video from the waiting list
6. addVideo - add a video to the waiting list
7. time - automatic command to synchronize the video time

Users can add videos to a list and decide which video to follow next based on the likes. To load the videos, the Youtube video ID is required, which can be found in the URL of each video. 

The application is a distributed system. It consists of a frontend application (Angular App) which communicates with the backend (Spring Boot Java Server).
The communication is based on the websocket technology.

## Getting Started Guide
Prerequisite: Maven + Angular must be installed.

To start the application, the GitHub project must first be cloned to disk. 

In the CLI, navigate to the backend folder (jj-viewer-room/viewer-room-backend/viewer.room) and execute "mvn clean package spring-boot:repackage" in the console.
This will create a directory named target in the current folder.
Inside this folder you will then find the executable JAR file (viewer.room-0.0.1-SNAPSHOT.jar). 
Execute this file with "java -jar viewer.room-0.0.1-SNAPSHOT.jar" and the server is running.

In the CLI, navigate to the frontend folder (jj-viewer-room/viewer-room-frontend/rx-stomp/viewer-room-frontend) and execute "ng serve" from there.

It is then possible to call up the URL "http://localhost:4200/" via several browsers and use the application.