import { useEffect, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import "./Chat.css";

function Chat({ socket, username, room }) {
    const [currentMessage, setCurrentMessage] = useState("");
    const [users, setUsers] = useState([]);

    const getUser = (socketId) => {
        return users.find((room) => room.socketId === socketId);
    };

    (() => {
        if (room !== "CLIENT_NAME") {
            !users.some((user) => user.socketId === room) &&
                setUsers((prevent) => {
                    return [...prevent, { socketId: room, messageList: [] }];
                });
        }
    })();

    const sendMessage = async () => {
        if (currentMessage !== "" && room !== "CLIENT_NAME") {
            const messageData = {
                session: room,
                author: username,
                message: currentMessage,
                time:
                    new Date(Date.now()).getHours() +
                    ":" +
                    new Date(Date.now()).getMinutes(),
            };

            await socket.emit("send_message", messageData);
            const user = getUser(room);

            setUsers((users) => {
                const userIndex = users.findIndex(
                    (user) => user.socketId === room
                );
                users[userIndex].messageList = [
                    ...user.messageList,
                    messageData,
                ];
                return [...users];
            });

            setCurrentMessage("");
        }
    };

    useEffect(() => {
        socket.on("receive_message", (data) => {
            setUsers((users) => {
                const userIndex = users.findIndex(
                    (user) => user.socketId === data.session
                );
                let updatedUsers = [...users];
                updatedUsers[userIndex].messageList = [
                    ...users[userIndex].messageList,
                    data,
                ];
                return updatedUsers;
            });
        });
    }, [socket]);

    const user = getUser(room);

    return (
        <div className="chat-window">
            <div className="chat-body clearfix" style={{ height: "24rem" }}>
                <ScrollToBottom className="message-container">
                    {user?.messageList?.map((messageContent, index) => {
                        return (
                            <div
                                key={index}
                                className="message"
                                id={
                                    username === messageContent.author
                                        ? "other"
                                        : "you"
                                }>
                                <div>
                                    <div className="message-content">
                                        <p>{messageContent.message}</p>
                                    </div>
                                    <div className="message-meta">
                                        <p id="time">{messageContent.time}</p>
                                        <p id="author">
                                            {messageContent.author}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </ScrollToBottom>
            </div>
            <div className="chat-message clearfix ">
                <div className="input-group mb-0" style={{ height: "2rem" }}>
                    <input
                        className="form-control"
                        type="text"
                        placeholder="Enter text here..."
                        value={currentMessage}
                        onChange={(event) => {
                            setCurrentMessage(event.target.value);
                        }}
                        onKeyPress={(event) => {
                            event.key === "Enter" && sendMessage();
                        }}
                    />
                    <div className="input-group-prepend" onClick={sendMessage}>
                        <span className="input-group-text h-100">
                            <i className="fa fa-send"></i>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Chat;
