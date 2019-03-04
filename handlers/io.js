const { generateMessage } = require("../utils/message");

let ioHandler = io => {
  let users = [];
  io.on("connection", socket => {
    socket.on("join", (currentUser, roomName) => {

      if (currentUser) {
        if (!io.sockets.adapter.rooms[roomName] || io.sockets.adapter.rooms[roomName].sockets[socket.id] != true) {
          if (users.filter(x => x.userId == currentUser._id && x.roomName==roomName).length == 0) {
            users.push({
              id: socket.id,
              username: currentUser.username,
              userId: currentUser._id,
              roomName
            });
          }
          let len = users.length;
          len--;

          socket.join(roomName);

          //Send this event to everyone in the room.
          io.sockets.in(roomName).emit('sendMsg', "You are in room " + roomName);

          io.emit("userList", users, users[len].id);
          io.emit("sendRooms", io.sockets.adapter.rooms);
          console.log("join", users);
        }
        else {
          console.log("not join", users);
          io.emit("userList", users);
        }
      }
    });

    socket.on("getPrivateMessage", data => {
      console.log("getPrivateMessage",data);
      socket.broadcast.to(data.toid).emit("sendMsg", data);
    });

    socket.on("getRoomMessage", data => {
      console.log("getRoomMessage",data);
      io.sockets.in(data.subject).emit("sendRoomMsg", data);
    });

    socket.on("disconnect", () => {
      for (let i = 0; i < users.length; i++) {
        if (users[i].id === socket.id) {
          users = users.splice(i, 1);
        }
      }
      console.log("disconnect", users);
      io.emit("exit", users);
    });

  });
};

module.exports = ioHandler;
