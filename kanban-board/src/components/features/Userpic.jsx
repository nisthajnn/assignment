import React from "react";
import "../styles/icon.css";

function Userpic({ userId, Userdata }) {
  const generateRandomId = Array.from(
    { length: 15 },
    () => Math.floor(Math.random() * 10) + 1
  );

  return (
    <div className="maindivicon">
      <div className="circularimg">
        <img
          className="randomicon"
          src={`https://source.unsplash.com/1600x900/?portrait/${generateRandomId}`}
          alt="user pic"
        />
      </div>
      {Userdata.map((it) => {
        if (it.id === userId) {
          if (it.available === false)
            return (
              <div className="active" style={{ backgroundColor: "grey" }}></div>
            );
          else {
            return (
              <div
                className="inactive"
                style={{ backgroundColor: "green" }}
              ></div>
            );
          }
        }
      })}
    </div>
  );
}

export default Userpic;
