import React from "react";
import Cards from "./Cards";
import Userpic from "./features/Userpic";

import { PiCellSignalNoneFill } from "react-icons/pi";
import { BsFillExclamationSquareFill } from "react-icons/bs";
import { PiCellSignalFullFill } from "react-icons/pi";
import { PiCellSignalMediumFill } from "react-icons/pi";
import { PiCellSignalLowFill } from "react-icons/pi";
import { BiAdjust } from "react-icons/bi";
import { BsFillXCircleFill } from "react-icons/bs";
import { FcOk } from "react-icons/fc";
import { PiCircle } from "react-icons/pi";
import { PiCircleDashed } from "react-icons/pi";

const priority_icon = {
  "No Priority": PiCellSignalNoneFill,
  Urgent: BsFillExclamationSquareFill,
  High: PiCellSignalFullFill,
  Medium: PiCellSignalMediumFill,
  Low: PiCellSignalLowFill,
};
const priority_icon_color = {
  "No Priority": "grey",
  Urgent: "orange",
  High: "grey",
  Medium: "grey",
  Low: "grey",
};

const progress_icon = {
  Backlog: PiCircleDashed,
  Todo: PiCircle,
  "In progress": BiAdjust,
  Done: FcOk,
  Canceled: BsFillXCircleFill,
};

const progress_icon_color = {
  Backlog: "grey",
  Todo: "grey",
  "In progress": "orange",
  Done: "blue",
  Canceled: "grey",
};

const Sections = ({ index, ticketData, passingData, groupBy }) => {
  const priority_seq = ["Urgent", "High", "Medium", "Low", "No Priority"];

  return (
    <div style={{ backgroundColor: "", maxWidth: "16em" }}>
      {groupBy === "status" && (
        <div>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <div
              style={{
                color: `${progress_icon_color[index]}`,
                marginRight: ".5em",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {React.createElement(progress_icon[index])}
            </div>

            <div style={{ marginRight: "1.4em" }}>{index}</div>

            <div className="header">
              {passingData[index].length ? passingData[index].length : 0}
            </div>

            <div
              style={{ display: "flex", flex: 1, justifyContent: "flex-end" }}
            >
              <div
                className="header"
                style={{
                  marginLeft: "4em",
                  fontSize: "1.2em",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginRight: "1em",
                }}
              >
                +
              </div>

              <div className="header">...</div>
            </div>
          </div>

          <div>
            {passingData[index].length &&
              passingData[index].map((value) => {
                return (
                  <Cards
                    id={value.id}
                    title={value.title}
                    groupBy={groupBy}
                    userId={value.userId}
                    priority={value.priority}
                    ticketData={ticketData}
                    status={value.status}
                    requirement={value.tag}
                  />
                );
              })}
            {passingData[index].length === 0 && (
              <div
                style={{
                  minWidth: "2.1em",
                  minHeight: "3em",
                  height: "3em",
                  backgroundColor: "red",
                }}
              >
                No data
              </div>
            )}
          </div>
        </div>
      )}

      {groupBy === "priority" && (
        <div>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <div
              style={{
                color: `${priority_icon_color[priority_seq[index]]}`,
                marginRight: ".5em",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {React.createElement(priority_icon[priority_seq[Number(index)]])}
            </div>
            <div style={{ marginRight: "1.4em" }}>
              {passingData[4 - index] !== undefined &&
                priority_seq[Number(index)]}
            </div>

            <div className="header">
              {" "}
              {passingData[4 - index] !== undefined &&
                passingData[4 - index].length}{" "}
            </div>

            <div
              style={{ display: "flex", flex: 1, justifyContent: "flex-end" }}
            >
              <div
                className="header"
                style={{
                  fontSize: "1.2em",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginRight: "1em",
                }}
              >
                +
              </div>

              <div className="header">...</div>
            </div>
          </div>

          <div>
            {passingData[4 - index] !== undefined &&
              passingData[4 - index].map((value) => {
                return (
                  <Cards
                    id={value.id}
                    title={value.title}
                    groupBy={groupBy}
                    userId={value.userId}
                    ticketData={ticketData}
                    status={value.status}
                    priority={value.priority}
                    requirement={value.tag}
                  />
                );
              })}
          </div>
        </div>
      )}

      {groupBy === "user" && (
        <div>
          <div style={{ display: "flex", flexDirection: "row" }}>
            {<Userpic userId={index} Userdata={ticketData.users} />}

            <div style={{ marginRight: "1.4em" }}>
              {" "}
              {ticketData.users.map((key) => {
                if (key.id === index) {
                  return key.name;
                }
              })}
            </div>
            <div className="header">{passingData[index].length}</div>
            <div
              style={{ display: "flex", flex: 1, justifyContent: "flex-end" }}
            >
              <div
                className="header"
                style={{
                  fontSize: "1.2em",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginRight: "1em",
                }}
              >
                +
              </div>

              <div className="header">...</div>
            </div>
          </div>

          <div>
            {passingData[index].map((value) => {
              return (
                <Cards
                  id={value.id}
                  title={value.title}
                  groupBy={groupBy}
                  userId={passingData[index][0].userId}
                  ticketData={ticketData}
                  status={value.status}
                  priority={value.priority}
                  requirement={value.tag}
                />
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default Sections;
