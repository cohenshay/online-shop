const { generateMessage } = require("../utils/message");

let ioHandler = io => {
  let users = [];
  io.on("connection", socket => {
    socket.on("join", userName => {
      if (userName) {
        users.push({
          id: socket.id,
          userName: userName
        });

        let len = users.length;
        len--;

        io.emit("userList", users, users[len].id);

        socket.emit(
          "getMsg",
          generateMessage("Admin", "Welcome to the chat app")
        );
      }
    });

    socket.on("getMsg", data => {
      socket.broadcast.to(data.toid).emit("sendMsg", {
        msg: data.msg,
        name: data.name
      });
    });

    socket.on("getRoomMsg", data => {
      console.log(data);
      socket.to(data.roomName).emit("sendRoomMsg", {
        msg: data.msg,
        name: data.name
      });
    });

    socket.on("disconnect", () => {
      for (let i = 0; i < users.length; i++) {
        if (users[i].id === socket.id) {
          users.splice(i, 1);
        }
      }
      io.emit("exit", users);
    });

  });
};

module.exports = ioHandler;
