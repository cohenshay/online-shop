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
                            {`${item.sender} ${item.type == "like" ? "liked" : "disLiked"} your post`}
                        </div>)
                }
            </div>
        </OutsideClickHandler>
    );
}

export default Notifications;