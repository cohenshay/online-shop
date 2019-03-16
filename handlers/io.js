const { generateMessage } = require("../utils/message");

let ioHandler = io => {
  let usersInRoom = [];
  let privateUsersAdapter = {};

  io.on("connection", socket => {
    socket.on("join", (currentUser, roomName) => {

      if (currentUser) {
        //Hanling ROOM MESSAGES
        if (roomName != "private") {
          if (!io.sockets.adapter.rooms[roomName] || io.sockets.adapter.rooms[roomName].sockets[socket.id] != true) {
            if (usersInRoom.filter(x => x.userId == currentUser._id && x.roomName == roomName).length == 0) {
              usersInRoom.push({
                id: socket.id,
                username: currentUser.username,
                userId: currentUser._id,
                roomName
              });
            }
            let len = usersInRoom.length;
            len--;

            socket.join(roomName);

            //Send this event to everyone in the room.
            // io.sockets.in(roomName).emit('sendMsg', "You are in room " + roomName);

            io.emit("userList", usersInRoom, usersInRoom[len].id);
            io.emit("sendRooms", io.sockets.adapter.rooms);
            console.log("room join", usersInRoom);
          }
        }
        if (roomName == "private") {
          console.log("private join",privateUsersAdapter);
          privateUsersAdapter[currentUser._id] = socket;
        }
        else {
          console.log("not join", usersInRoom);
          io.emit("userList", usersInRoom);
        }
      }
    });

    socket.on("getPrivateMessage", data => {
      console.log("getPrivateMessage", data);
      privateUsersAdapter[data.receiver].emit("sendMsg", data);
    });

    socket.on("getLike", data => {
      console.log("getLike", data);
      io.sockets.in(data.subject).emit("sendLike", data);
    });

    socket.on("getRoomMessage", data => {
      console.log("getRoomMessage", data);
      io.sockets.in(data.subject).emit("sendRoomMsg", data);
    });

    socket.on("disconnect", () => {
      for (let i = 0; i < usersInRoom.length; i++) {
        if (usersInRoom[i].id === socket.id) {
          usersInRoom = usersInRoom.splice(i, 1);
        }
      }
      console.log("disconnect", usersInRoom);
      io.emit("exit", usersInRoom);
    });

  });
};

module.exports = ioHandler;
