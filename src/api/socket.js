import socketIOClient from "socket.io-client";
import Peer from "peerjs";

const ENDPOINT = "https://liquid-portal-api.herokuapp.com/";
const socket = socketIOClient(ENDPOINT);
const port = process.env.PORT || 3001;
const myPeer = new Peer(undefined, {
  secure: true,
  host: "https://liquid-portal.herokuapp.com",
  port: 443,
  path: "/",
});
const peers = {};
//

export const onRoomEntered = (roomId, userId, videoGrid) => {
  console.log(port);
  myPeer.on("open", (id) => {
    socket.emit("join-room", roomId, id);
  });

  const myVideo = document.createElement("video");
  myVideo.muted = true;
  myVideo.id = "video";

  navigator.mediaDevices
    .getUserMedia({
      video: true,
      audio: true,
    })
    .then((stream) => {
      addVideoStream(myVideo, stream, videoGrid);
      myPeer.on("call", (call) => {
        call.answer(stream);
        const video = document.createElement("video");
        video.id = "video";

        call.on("stream", (userVideoStream) => {
          addVideoStream(video, userVideoStream, videoGrid);
        });
      });

      socket.on("user-connected", (userId) => {
        connectToNewUser(userId, stream, videoGrid);
      });
      socket.on("user-disconnected", (userId) => {
        if (peers[userId]) {
          peers[userId].close();
        }
      });
    });
};

const addVideoStream = (video, stream, videoGrid) => {
  video.srcObject = stream;
  video.addEventListener("loadedmetadata", () => {
    video.play();
  });
  if (videoGrid) {
    videoGrid.append(video);
  }
};

const connectToNewUser = (userId, stream, videoGrid) => {
  const call = myPeer.call(userId, stream);
  const video = document.createElement("video");
  video.id = "video";
  call.on("stream", (userVideoStream) => {
    addVideoStream(video, userVideoStream, videoGrid);
  });
  call.on("close", () => {
    video.remove();
  });
  peers[userId] = call;
};
