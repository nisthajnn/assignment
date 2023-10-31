import { React, useState, useEffect, useRef } from "react";
import Sections from "./Sections";
import { fetchData } from "../api/dataFetcher";
import { groupByFunc } from "./features/Grouping";
import { sortTasks } from "./features/Sorting.jsx";
import "./styles/Dashboard.css";
import { BiSlider } from "react-icons/bi";
import { AiOutlineDown } from "react-icons/ai";

const Dashboard = () => {
  const status_seq = ["Backlog", "Todo", "In progress", "Done", "Canceled"];
  const [showController, setShowController] = useState(false);
  const [orderBy, setOrderBy] = useState("priority");
  const [groupBy, setGroupBy] = useState("status");
  const [ticketData, setTicketData] = useState(null);
  const [passingData, setPassingData] = useState(null);
  const controllerRef = useRef(null);

  useEffect(() => {
    if (sessionStorage.getItem("groupby")) {
      setGroupBy(sessionStorage.getItem("groupby"));
    }

    if (sessionStorage.getItem("orderby")) {
      setOrderBy(sessionStorage.getItem("orderby"));
    }

    const fetchTaskAndSetTask = async () => {
      const fetchedData = await fetchData();
      if (fetchedData) {
        setTicketData(fetchedData);
      }
    };
    fetchTaskAndSetTask();
  }, []);

  useEffect(() => {
    if (ticketData !== null) {
      const a = groupByFunc(ticketData, groupBy);
      const d = sortTasks(a, groupBy, orderBy);
      if (groupBy === "status") {
        for (let i = 0; i < status_seq.length; i++) {
          let check = false;
          Object.keys(d).map((index) => {
            if (index == status_seq[i]) check = true;
          });
          if (check == false) {
            d[status_seq[i]] = {};
          }
        }
      }
      sessionStorage.setItem("groupby", groupBy);
      sessionStorage.setItem("orderby", orderBy);
      setPassingData(d);
    }
  }, [ticketData, groupBy, orderBy]);
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        showController &&
        controllerRef.current &&
        !controllerRef.current.contains(event.target) &&
        !event.target.classList.contains("event_listen")
      ) {
        setShowController(false);
      }
    };

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [showController]);

  return (
    <div className="dashboard">
      <div className="top_header">
        <div
          className="controller"
          tabIndex={2}
          onClick={() => {
            setShowController(!showController);
          }}
          ref={controllerRef}
        >
          <div className="icons">
            <BiSlider />
          </div>
          <div className="head">Display</div>
          <div className="icons">
            <AiOutlineDown />
          </div>
        </div>
      </div>
      {showController && (
        <div className="subDisplay event_listen">
          <div className="subdispcontent event_listen">
            <div className="select_id event_listen">
              <p className="event_listen">Grouping</p>

              <div>
                <select
                  className="event_listen"
                  name="grouping"
                  id="grouping"
                  value={groupBy}
                  onChange={(e) => {
                    setPassingData(null);
                    setGroupBy(e.target.value);
                  }}
                >
                  <option className="event_listen" value="status">
                    Status
                  </option>
                  <option className="event_listen" value="priority">
                    Priority
                  </option>
                  <option className="event_listen" value="user">
                    User
                  </option>
                </select>
              </div>
            </div>
            <div className="select_id event_listen">
              <p className="event_listen">Ordering</p>
              <div>
                <select
                  name="ordering"
                  className="event_listen"
                  id="ordering"
                  value={orderBy}
                  onChange={(e) => {
                    setPassingData(null);
                    setOrderBy(e.target.value);
                  }}
                >
                  <option className="event_listen" value="priority">
                    Priority
                  </option>
                  <option className="event_listen" value="title">
                    Title
                  </option>
                </select>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="ticket_view">
        {passingData &&
          Object.keys(passingData).map((index) => (
            <Sections
              key={index}
              index={index}
              ticketData={ticketData}
              passingData={passingData}
              groupBy={groupBy}
            />
          ))}
      </div>
    </div>
  );
};

export default Dashboard;
