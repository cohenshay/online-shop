import React, { Component } from "react";
import { connect } from 'react-redux';
import socketIOClient from "socket.io-client";
import { getRoomMessages, setRoomMessages, getRooms } from '../actions/roomMessages';
import Moment from 'react-moment';
class ChatPage extends Component {
  constructor() {
    super();
    this.state = {
      socket: socketIOClient("http://127.0.0.1:5000"),
      socketId: null,
      roomMessages: [],
      currentMessage: null,
      messages: [],
      userList: [],
      roomName: null
    };
  }
  componentWillReceiveProps(nextProps, prevState) {
    this.setState({
      roomMessages: nextProps.roomMessages
    })
  }
  sendPrivateMessage = (user) => {
    const message = {
      toid: user.id,
      msg: "motherfucker!!!",
      name: this.props.currentUser.username
    }

    this.state.socket.emit('getMsg', message);
  }

  sendRoomMessage = (msg) => {

    //save
    const message = {
      text: msg,
      sender: this.props.currentUser.username,
      roomName: this.state.roomName
    }
    this.props.setRoomMessages(message);
    //send  

    this.state.socket.emit('getRoomMsg', message);
  }
  renderMessages = () => {
    return (
      <div>
        {this.state.roomMessages.map((message, index) =>
          <div key={index} className="message">
            <div className="message__title">
              <h4>{message.sender}</h4>
              <span> <Moment format="h:mm a">{message.createdAt}</Moment></span>
            </div>
            <div className="message__body">
              <p>{message.text}</p>
            </div>
          </div>
        )}
      </div>
    )
  }
  checkResponse = (response) => {
    if (response.status == 401) {
      this.props.history.push("/");
    }
  }
  enterRoom = (roomName) => {
    this.state.socket.emit('join',  this.props.currentUser,roomName);
    this.setState({roomName});
  }
  componentDidMount() {

    // this.props.getRoomMessages(this.state.roomName,this.checkResponse);
    this.props.getRooms();

    this.state.socket.on("connect", (err) => {
      if (err)
        return console.log(err);

      this.state.socket.emit('join', this.props.currentUser, "general");
    });


    this.state.socket.on('sendRooms', (rooms) => {
      console.log("rooms", rooms)
    });

    this.state.socket.on('userList', (userList, socketId) => {
      console.log("userList", userList)
      this.setState((prevState) => { return { socketId, userList } });
    });


    this.state.socket.on('exit', (userList) => {
      console.log("exit", userList)
      this.setState({ userList: userList });
    });

    this.state.socket.on('sendMsg', (message) => {
      console.log(message)
      //this.setState((prevState) => ({ messages: [...prevState.messages, message] }));
    });

    this.state.socket.on('sendRoomMsg', (data) => {
      this.setState((prevState) => ({ roomMessages: [...prevState.roomMessages, data] }));
    });
  }

  render() {
    return (
      <div className="chatPage">
        <div className="chat__sidebar">
          <h3>People</h3>
          <div id="users">
            {this.state.userList.length > 0 &&
              <ol>
                {this.state.userList.filter(x=>x.roomName==this.state.roomName).map((user, index) => <li key={index} onClick={() => { this.sendPrivateMessage(user) }}>{user.username}</li>)}
              </ol>
            }
          </div>
          {this.state.messages.length > 0 &&
            <div>
              <h3>Private Messages</h3>
              <li>
                {this.state.messages.map((msg, index) => <div className="message__title" key={index}><h4>{`from: ${msg.name}, to: ${msg.msg}`}</h4></div>)}
              </li>
            </div>
          }
        </div>

        <div className="chat__main">
          <ol id="messages" className="chat__messages"></ol>
          {
            this.state.roomMessages && this.state.roomMessages.length > 0 && this.renderMessages()
          }
          <div className="chat__footer">
            <div id="message-form" >
              <input name="message" onChange={(e) => this.setState({ currentMessage: e.target.value })} type="text" placeholder="Message" autoFocus autoComplete="off" />
              <button onClick={(e) => { this.sendRoomMessage(this.state.currentMessage) }}>Send</button>
            </div>
          </div>
          <b>Rooms</b>
          {
            this.props.rooms && this.props.rooms.map((room, index) =>
              <div key={index}
                className="rooms-names"
                onClick={() => this.enterRoom(room.name)}>{room.name}</div>)
          }
        </div>




      </div>

    );
  }
}
const mapDispatchToProps = (dispatch, props) => ({
  getRoomMessages: (roomName, callback) => {
    dispatch(getRoomMessages(roomName, callback));
  },
  getRooms: () => {
    dispatch(getRooms());
  },
  setRoomMessages: (roomName, msg) => {
    dispatch(setRoomMessages(roomName, msg));
  },
});
const mapStateToProps = (state, props) => ({
  roomMessages: state.roomMessages.roomMessages,
  currentUser: state.auth.currentUser || JSON.parse(localStorage.getItem("currentUser")),
  rooms: state.roomMessages.rooms,
});

export default connect(mapStateToProps, mapDispatchToProps)(ChatPage);
