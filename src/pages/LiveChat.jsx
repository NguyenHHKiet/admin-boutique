import { useEffect, useState } from "react";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import Chat from "../components/chat/Chat";
import io from "socket.io-client";
import "../assets/Chat.css";
import useAxios from "../hooks/useAxios";

const socket = io.connect("http://localhost:5000");

const LiveChat = () => {
    const [username] = useState("ADMIN");
    const [room, setRoom] = useState("CLIENT_NAME");
    const { response, sendRequest } = useAxios();

    useEffect(() => {
        sendRequest({ url: "/message" });
    }, [sendRequest]);

    const joinRoom = (room) => {
        socket.emit("join_room", room);
    };

    const handleOnClick = (socketId) => {
        setRoom(socketId);
        joinRoom(socketId);
    };

    return (
        <div
            className="container"
            style={{
                height: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
            }}>
            <div className="row clearfix">
                <div className="col-lg-12" style={{ maxHeight: "35rem" }}>
                    <div>
                        <h5>Chat</h5>
                        <Breadcrumb>
                            <Breadcrumb.Item active>Apps</Breadcrumb.Item>
                            <Breadcrumb.Item active>Chat</Breadcrumb.Item>
                        </Breadcrumb>
                    </div>
                    <div className="card chat-app m-0">
                        <div id="plist" className="people-list">
                            <div className="input-group">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Search..."
                                />
                            </div>
                            <ul
                                className="list-unstyled chat-list mt-2 mb-0 overflow-auto"
                                style={{ maxHeight: "25rem" }}>
                                {response?.users?.length > 0 ? (
                                    response?.users?.map((item) => (
                                        <li
                                            onClick={() =>
                                                handleOnClick(item.socketId)
                                            }
                                            className="clearfix border-1 border"
                                            key={item.socketId}>
                                            <img
                                                src="https://bootdey.com/img/Content/avatar/avatar1.png"
                                                alt="avatar"
                                            />
                                            <div className="about">
                                                <div
                                                    className="name"
                                                    style={{ width: "9rem" }}>
                                                    {item.socketId}
                                                </div>
                                                <div className="status">
                                                    {" "}
                                                    <i className="fa fa-circle offline"></i>{" "}
                                                    left 7 mins ago{" "}
                                                </div>
                                            </div>
                                        </li>
                                    ))
                                ) : (
                                    <p>No Users</p>
                                )}
                            </ul>
                        </div>
                        <div className="chat">
                            <div className="chat-header clearfix">
                                <div className="row">
                                    <div className="col">
                                        <a
                                            data-toggle="modal"
                                            data-target="#view_info">
                                            <img
                                                src="https://bootdey.com/img/Content/avatar/avatar1.png"
                                                alt="avatar"
                                            />
                                        </a>
                                        <div className="chat-about">
                                            <h6 className="m-b-0">{room}</h6>
                                            <small>
                                                Last seen: 2 hours ago
                                            </small>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <Chat
                                socket={socket}
                                username={username}
                                room={room}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LiveChat;
