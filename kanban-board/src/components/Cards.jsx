import React from "react";
import "./styles/Card.css";
import Userpic from "./features/Userpic";
import { PiCellSignalNoneFill } from "react-icons/pi";
import { BsFillExclamationSquareFill } from "react-icons/bs";
import { BiAdjust } from "react-icons/bi";
import { BsFillXCircleFill } from "react-icons/bs";
import { FcOk } from "react-icons/fc";
import { PiCellSignalMediumFill } from "react-icons/pi";
import { PiCellSignalLowFill } from "react-icons/pi";
import { PiCircle } from "react-icons/pi";
import { PiCircleDashed } from "react-icons/pi";
import { PiCellSignalFullFill } from "react-icons/pi";

const progress_icon = {
  Backlog: PiCircleDashed,
  Todo: PiCircle,
  "In progress": BiAdjust,
  Done: FcOk,
  Canceled: BsFillXCircleFill,
};

const priority_seq = ["Urgent", "High", "Medium", "Low", "No Priority"];
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

const progress_icon_color = {
  Backlog: "grey",
  Todo: "grey",
  "In progress": "orange",
  Done: "blue",
  Canceled: "grey",
};

const Cards = ({
  id,
  title,
  groupBy,
  userId,
  ticketData,
  status,
  priority,
  requirement,
}) => {
  return (
    <div className="card">
      {
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              flexDirection: "",
            }}
          >
            <div className="header" style={{ fontSize: ".75em" }}>
              {id}
            </div>

            {groupBy !== "user" && (
              <div>
                <Userpic userId={userId} Userdata={ticketData.users} />
              </div>
            )}
          </div>

          <div
            style={{ height: "maxContent", display: "flex", marginTop: "3px" }}
          >
            {groupBy !== "status" && (
              <div
                style={{
                  color: `${progress_icon_color[status]}`,
                  marginRight: ".5em",
                }}
              >
                {React.createElement(progress_icon[status])}
              </div>
            )}

            <div
              class="card_text"
              style={{
                fontSize: ".8em",
                width: "22em",
                fontWeight: "600",
                marginBottom: "1em",
              }}
            >
              {title}
            </div>
          </div>
          {
            <div
              style={{
                display: "flex",
                justifyContent: "",
                flexDirection: "row",
                flexWrap: "wrap",
              }}
            >
              {groupBy !== "priority" && groupBy === "user" && (
                <div
                  style={{
                    color: `${priority_icon_color[priority_seq[4 - priority]]}`,
                    marginRight: ".5em",
                  }}
                >
                  {React.createElement(
                    priority_icon[priority_seq[4 - priority]]
                  )}
                </div>
              )}
              {groupBy !== "priority" && groupBy === "status" && (
                <div
                  style={{
                    color: `${priority_icon_color[priority_seq[4 - priority]]}`,
                    marginRight: ".5em",
                  }}
                >
                  {React.createElement(
                    priority_icon[priority_seq[4 - priority]]
                  )}
                </div>
              )}
              {requirement.length &&
                requirement.map((index) => {
                  return (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        marginTop: "0.2em",
                        marginRight: ".3em",
                        marginLeft: "0.2em",
                      }}
                    >
                      <div
                        style={{
                          height: ".5em",
                          width: ".5em",
                          borderRadius: "50%",
                          backgroundColor: "rgb(181, 179, 179)",
                          marginTop: ".2em",
                          marginRight: ".3em",
                        }}
                      ></div>
                      <div
                        className="head"
                        style={{ fontSize: ".7em", color: "grey" }}
                      >
                        {index}
                      </div>
                    </div>
                  );
                })}
            </div>
          }
        </div>
      }
    </div>
  );
};

export default Cards;
