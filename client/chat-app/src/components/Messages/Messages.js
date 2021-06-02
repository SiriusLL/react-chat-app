import React from "react";
import ScrollToBotttom from "react-scroll-to-bottom";
import "./Messages.css";
import Message from "../Message/Message";

const Messages = ({ messages, name }) => {
  return (
    <ScrollToBottom>
      {messages.map((message, i) => (
        <div key={i}>
          <Message message={message} name={name} />
        </div>
      ))}
    </ScrollToBottom>
  );
};

export default Messages;
