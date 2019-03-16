import React, { Component } from "react";
import { connect } from 'react-redux';
import socketIOClient from "socket.io-client";
import { getRoomMessages, setRoomMessages, saveLike, getLikes, newNotifiactions } from '../../actions/roomMessages';
import ConnectedUsers from './components/ConnectedUsers';
import PrivateChat from "./PrivateChat";
const moment = require('moment');

class ChatPage extends Component {
  constructor() {
    super();
    this.state = {
      socket: socketIOClient("http://127.0.0.1:5000"),
      socketId: null,
      roomMessages: [],
      currentMessage: null,
      userList: [],
      pros: null,
      cons: null,
      privateChatWith: null,
      filter: ""
    };
  }

  componentWillReceiveProps(nextProps, prevState) {
    if (nextProps.roomMessages != this.props.roomMessages) {
      this.setState({
        roomMessages: nextProps.roomMessages,
      })
    }
  }

  componentDidUpdate = (prevProps, prevState) => {
    if (this.state.filter) {
      let wordsToHighLight = [];
      let consAndPros = [...document.getElementsByClassName("textOpinion")];
      consAndPros.forEach(element => {
        wordsToHighLight.push(element);
      });

      let userNames = [...document.getElementsByClassName("poepleText")];
      userNames.forEach(element => {
        wordsToHighLight.push(element);
      });

      wordsToHighLight.forEach(element => {
        this.highLightFilteredWords(element, this.state.filter, "mark-word");
      });
    }
    else if (prevState.filter) {
      this.setState({ roomMessages: this.props.roomMessages });
    }
  }

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

  handlePros = (e) => {
    const pros = e.target.value;
    this.setState({ pros })
  }

  handleCons = (e) => {
    const cons = e.target.value;
    this.setState({ cons })
  }

  sendDisLike = (message, index) => {
    let data = {
      messageId: message._id,
      subject: this.props.match.params.subject,
      type: "disLike",
      sender: this.props.currentUser,
      createdAt: moment.utc().toString(),
      index
    }

    this.state.socket.emit('getLike', data);
    this.props.saveLike(data);
  }

  sendLike = (message, index) => {
    let data = {
      messageId: message._id,
      subject: this.props.match.params.subject,
      type: "like",
      sender: this.props.currentUser,
      createdAt: moment.utc().toString(),
      index
    }



    this.state.socket.emit('getLike', data);
    this.props.saveLike(data);
  }

  setPrivateChatWith = (member) => {
    this.props.history.push(`/privateChat/${member.userId}`);
  }

  componentDidMount() {
    const subject = this.props.match.params.subject;
    this.props.getRoomMessages({ subject }, this.checkResponse)
    this.props.getLikes();
    this.state.socket.on("connect", (err) => {
      if (err)
        return console.log(err);

      this.state.socket.emit('join', this.props.currentUser, this.props.match.params.subject);
    });

    this.state.socket.on('userList', (userList, socketId) => {
      console.log("userList", userList)
      this.setState((prevState) => { return { socketId, userList } });
    });


    this.state.socket.on('exit', (userList) => {
      console.log("exit", userList)
      this.setState({ userList: userList });
    });

    this.state.socket.on('sendLike', (data) => {

      let like = {
        sender: data.sender._id,
        createdAt: data.createdAt
      }
      let otherMessage = [];
      let messageUpdate = [];
      this.setState((previousState, currentProps) => {
        otherMessage = previousState.roomMessages.filter(x => x._id != data.messageId);
        messageUpdate = previousState.roomMessages.filter(x => x._id == data.messageId)[0];
        if (data.type == "like") messageUpdate.likes.push(like);
        else messageUpdate.disLikes.push(like);
        otherMessage.splice(data.index, 0, messageUpdate);

        return {
          roomMessages: otherMessage
        };
      });

      this.props.newNotifiactions({
        sender: data.sender.username,
        createdAt: data.createdAt,
        type:data.type
      });
    });

    this.state.socket.on('sendRoomMsg', (data) => {
      console.log("message: ", data);
      this.setState((prevState) => ({ roomMessages: [...prevState.roomMessages, data] }));
    });


  }

  applyFilter = (e) => {
    const filter = e.target.value;
    if (filter) {
      let filterResults = this.state.roomMessages.filter(x => x.cons.includes(filter) || x.pros.includes(filter));
      return this.setState({ roomMessages: filterResults, filter });
    }
    this.setState({ filter, roomMessages: this.props.roomMessages });
  }

  highLightFilteredWords = (container, what, spanClass) => {
    var content = container.innerHTML;
    var words = content.split('');
    var i = words.length;
    var word = '';

    while (--i) {
      word = words[i];
      if (word.toLowerCase() == what.toLowerCase()) {
        words[i] = `<span class="${spanClass}">` + word + "</span>";
      }
      else {
        words[i] = word;
      }
    }
    container.innerHTML = words.join('');
  }

  render() {

    return (

      <div className="chatPage">

        <ConnectedUsers userList={this.state.userList} setPrivateChatWith={this.setPrivateChatWith} />


        <div className="mainContent">


          {this.state.privateChatWith == null &&
            <div>            <div className="search">
              <input type="text" name="name" placeholder="חפש חוות דעת" value={this.state.filter} onChange={this.applyFilter} />
            </div>
              <div className="allOpinions">
                {this.state.roomMessages && this.state.roomMessages.length > 0 && this.state.roomMessages.map((message, index) =>
                  <div className="opinionWrap" key={index}>
                    <div className="poeple">
                      <div className="poepleImg">
                        <img src={window.location.origin + `/images/users/${message.username}.jpg`} />
                      </div>
                      <div className="poepleText">{message.username}</div>
                      <div className="replay">
                        <img src={window.location.origin + "/images/like.png"} className="like" onClick={() => this.sendLike(message, index)} /><span className="likes-number pointer" onClick={() => this.sendLike(message, index)}>{message.likes && message.likes.length}</span>
                        <img src={window.location.origin + "/images/unlike.png"} className="unlike" onClick={() => this.sendDisLike(message, index)} /><span className="disLikes-number pointer" onClick={() => this.sendDisLike(message, index)}>{message.disLikes && message.disLikes.length}</span>
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
            </div>

          }
          <div className="productImg"></div>
          <div className=""></div>



        </div>


      </div>
    );
  }
}
const mapDispatchToProps = (dispatch, props) => ({
  getRoomMessages: (roomName, callback) => { dispatch(getRoomMessages(roomName, callback)); },
  saveLike: (data) => { dispatch(saveLike(data)); },
  savePrivateMessage: (data) => { dispatch(savePrivateMessage(data)); },
  getLikes: () => { dispatch(getLikes()) },
  setRoomMessages: (roomName, msg) => { dispatch(setRoomMessages(roomName, msg)); },
  newNotifiactions: (data) => { dispatch(newNotifiactions(data)) },
});
const mapStateToProps = (state, props) => ({
  roomMessages: state.roomMessages.roomMessages || [],
  currentUser: state.auth.currentUser || JSON.parse(localStorage.getItem("currentUser")),
  rooms: state.roomMessages.rooms,
});

export default connect(mapStateToProps, mapDispatchToProps)(ChatPage);
