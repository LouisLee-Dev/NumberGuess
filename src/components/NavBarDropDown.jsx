import React from "react";
// import "bootstrap/dist/css/bootstrap.css";
import Dropdown from "react-bootstrap/Dropdown";
import store from "../store";
import { NavLink } from "react-router-dom";
export default function NavBarDropDown() {
  const changeToDailyMode = () => {
    store.dispatch({
      type: "dailyChallengeMode",
      payload: true,
    });
    store.dispatch({
      type: "numbersOnlyMode",
      payload: false,
    });
    store.dispatch({
      type: "practiceMode",
      payload: false,
    });
  };
  const changetoNumberMode = () => {
    store.dispatch({
      type: "dailyChallengeMode",
      payload: false,
    });
    store.dispatch({
      type: "numbersOnlyMode",
      payload: true,
    });
    store.dispatch({
      type: "practiceMode",
      payload: false,
    });
  };

  const changePracticeMode = () => {
    store.dispatch({
      type: "dailyChallengeMode",
      payload: false,
    });
    store.dispatch({
      type: "practiceMode",
      payload: true,
    });
    store.dispatch({
      type: "numbersOnlyMode",
      payload: false,
    });
  };
  return (
    <Dropdown>
      <Dropdown.Toggle className="navBtn">
        <i className="fas fa-bars"></i>
      </Dropdown.Toggle>
      <Dropdown.Menu style={{ position: "absolute", left: "-192px" }}>
        <Dropdown.Item>
          <NavLink
            to="/"
            onClick={changeToDailyMode}
            className={"non-decoration"}
            style={({ isActive }) => ({
              backgroundColor: isActive ? "#64c3a6" : "#ebedf3",
              border: isActive ? "none" : "none",
              color: isActive ? "white" : "#69758e",
            })}
          >
            Daily Math Challenge
          </NavLink>
        </Dropdown.Item>
        <Dropdown.Item>
          <NavLink
            to="/math-wordle-unlimited"
            onClick={changePracticeMode}
            className={"non-decoration"}
            style={({ isActive }) => ({
              backgroundColor: isActive ? "#64c3a6" : "#ebedf3",
              border: isActive ? "none" : "none",
              color: isActive ? "white" : "#69758e",
            })}
          >
            Unlimited Math Challenge
          </NavLink>
        </Dropdown.Item>
        <Dropdown.Item>
          <NavLink
            to="/guess-the-numbers"
            onClick={changetoNumberMode}
            className={"non-decoration"}
            style={({ isActive }) => ({
              backgroundColor: isActive ? "#64c3a6" : "#ebedf3",
              border: isActive ? "none" : "none",
              color: isActive ? "white" : "#69758e",
            })}
          >
            Number Guess Puzzle
          </NavLink>
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}
