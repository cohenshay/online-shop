import OutsideClickHandler from 'react-outside-click-handler';
import React from "react";
function Notifications(props) {
    return (
        <OutsideClickHandler
            onOutsideClick={() => {
                props.close()
            }}
        >
            <div className="notifications-bar">
                {
                    props.newNotifiactions.map((item, index) =>
                        <div key={index} className="notification-item">
                            <span className="sender"> {item.sender}</span>
                            <span className={item.type == "like" ? "like" : "disLike"}>{item.type == "like" ? " liked " : " disLiked "} </span>
                            <span>your post</span>
                            <div className="arrow"></div>
                        </div>
                    )
                }
            </div>
        </OutsideClickHandler>
    );
}

export default Notifications;