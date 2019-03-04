import React, { Component } from "react";
import { connect } from 'react-redux';
import socketIOClient from "socket.io-client";
import { getRoomMessages, setRoomMessages, getRooms } from '../../actions/roomMessages';
import ConnectedUsers from './components/ConnectedUsers';
const moment = require('moment');

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
      roomName: null,
      pros: null,
      cons: null
    };
  }

  componentWillReceiveProps(nextProps, prevState) {
    if (nextProps.roomMessages != this.props.roomMessages) {
      this.setState({
        roomMessages: nextProps.roomMessages,
      })
    }
  }
  // sendPrivateMessage = (user) => {
  //   const message = {
  //     toid: user.id,
  //     msg: "test",
  //     name: this.props.currentUser.username
  //   }

  //   this.state.socket.emit('getPrivateMessage', message);
  // }

  sendRoomMessage = (msg) => {
    const createdAt = moment.utc().toString();
    //save
    const message = {
      cons: this.state.cons,
      pros: this.state.pros,
      username: this.props.currentUser.username,
      subject: this.props.match.params.subject,
      createdAt,
    }
    this.props.setRoomMessages(message);
    //send  

    this.state.socket.emit('getRoomMessage', message);
  }

  checkResponse = (response) => {
    if (response.status == 401) {
      this.props.history.push("/");
    }
  }

  componentDidMount() {
    const subject = this.props.match.params.subject;
    this.props.getRoomMessages({ subject }, this.checkResponse)
   
    this.state.socket.on("connect", (err) => {
      if (err)
        return console.log(err);

      this.state.socket.emit('join', this.props.currentUser, this.props.match.params.subject);
    });


    // this.state.socket.on('sendRooms', (rooms) => {
    //   console.log("rooms", rooms)
    // });

    this.state.socket.on('userList', (userList, socketId) => {
      console.log("userList", userList)
      this.setState((prevState) => { return { socketId, userList } });
    });


    this.state.socket.on('exit', (userList) => {
      console.log("exit", userList)
      this.setState({ userList: userList });
    });

    // this.state.socket.on('sendMsg', (message) => {
    //   console.log(message)
    //   //this.setState((prevState) => ({ messages: [...prevState.messages, message] }));
    // });

    this.state.socket.on('sendRoomMsg', (data) => {
      console.log("message: ", data);
      this.setState((prevState) => ({ roomMessages: [...prevState.roomMessages, data] }));
    });
  }
  handlePros = (e) => {
    const pros = e.target.value;
    this.setState({ pros })
  }
  handleCons = (e) => {
    const cons = e.target.value;
    this.setState({ cons })
  }
  render() {

    return (

      <div className="chatPage">

        <ConnectedUsers userList={this.state.userList} />

        <div className="mainContent">
          <div className="search">
            <input type="text" name="name" value="" placeholder="חפש חוות דעת" />
          </div>
         
          <div className="allOpinions">
            {this.state.roomMessages && this.state.roomMessages.length>0 && this.state.roomMessages.map((message, index) =>
              <div className="opinionWrap" key={index}>
                <div className="poeple">
                  <div className="poepleImg">
                    <img src={window.location.origin + "/images/20150731_191335 (3).jpg"} />
                  </div>
                  <div className="poepleText">{message.username}</div>
                  <div className="replay">
                    <img src={window.location.origin + "/images/like.png"} />
                    <img src={window.location.origin + "/images/unlike.png"} className="unlike" />
                  </div>
                </div>
                <div className="textOpinionWrap">
                  <div className="title">יתרונות:</div>
                  <div className="textOpinion">{message.pros}</div>
                </div>
                <div className="textOpinionWrap">
                  <div className="title">חסרונות:</div>
                  <div className="textOpinion">{message.cons}</div>
                </div>
                <div className="dateOpinion">{message.createdAt}</div>
              </div>)}

            <div className="write-response">
              כתוב תגובה
          <div className="response-wrapper">
                <div className="response-image"></div>
                <input type="text" onChange={this.handlePros} placeholder="pros" />
                <input type="text" onChange={this.handleCons} placeholder="cons" /><button onClick={this.sendRoomMessage}>שלח</button>
              </div>
            </div>




          </div>
          <div className="productImg"></div>
          <div className=""></div>
        </div>

      </div>
      // <div className="chatPage">
      //   <div className="chat__sidebar">
      //     <h3>People</h3>
      //     <div id="users">
      //       {this.state.userList.length > 0 &&
      //         <ol>
      //           {this.state.userList.filter(x => x.roomName == this.state.roomName).map((user, index) => <li key={index} onClick={() => { this.sendPrivateMessage(user) }}>{user.username}</li>)}
      //         </ol>
      //       }
      //     </div>
      //     {this.state.messages.length > 0 &&
      //       <div>
      //         <h3>Private Messages</h3>
      //         <li>
      //           {this.state.messages.map((msg, index) => <div className="message__title" key={index}><h4>{`from: ${msg.name}, to: ${msg.msg}`}</h4></div>)}
      //         </li>
      //       </div>
      //     }
      //   </div>

      //   <div className="chat__main">
      //     <ol id="messages" className="chat__messages"></ol>
      //     {
      //       this.state.roomMessages && this.state.roomMessages.length > 0 && this.renderMessages()
      //     }
      //     <div className="chat__footer">
      //       <div id="message-form" >
      //         <input name="message" onChange={(e) => this.setState({ currentMessage: e.target.value })} type="text" placeholder="Message" autoFocus autoComplete="off" />
      //         <button onClick={(e) => { this.sendRoomMessage(this.state.currentMessage) }}>Send</button>
      //       </div>
      //     </div>
      //     <b>Rooms</b>
      //     {
      //       this.props.rooms && this.props.rooms.map((room, index) =>
      //         <div key={index}
      //           className="rooms-names"
      //           onClick={() => this.enterRoom(room.name)}>{room.name}</div>)
      //     }
      //   </div>
      // </div>

    );
  }
}
const mapDispatchToProps = (dispatch, props) => ({
  getRoomMessages: (roomName, callback) => {
    dispatch(getRoomMessages(roomName, callback));
  },
  // getRooms: () => {
  //   dispatch(getRooms());
  // },
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
