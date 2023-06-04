import React from "react";
import store from "../store";
import { NavLink } from "react-router-dom";
import Nav from "react-bootstrap/Nav";

const NavBar = () => {
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
    <div
      className="nav-container"
      style={{ maxWidth: "600px", minWidth: "275px" }}
    >
      <NavLink
        to="/"
        onClick={changeToDailyMode}
        style={({ isActive }) => ({
          backgroundColor: isActive ? "#64c3a6" : "#ebedf3",
          border: isActive ? "none" : "none",
          color: isActive ? "white" : "#69758e",
        })}
      >
        Daily Math Challenge
      </NavLink>
      <NavLink
        to="/math-wordle-unlimited"
        onClick={changePracticeMode}
        style={({ isActive }) => ({
          backgroundColor: isActive ? "#64c3a6" : "#ebedf3",
          border: isActive ? "none" : "none",
          color: isActive ? "white" : "#69758e",
        })}
      >
        Unlimited Math Challenge
      </NavLink>
      <NavLink
        to="/guess-the-numbers"
        onClick={changetoNumberMode}
        style={({ isActive }) => ({
          backgroundColor: isActive ? "#64c3a6" : "#ebedf3",
          border: isActive ? "none" : "none",
          color: isActive ? "white" : "#69758e",
        })}
      >
        Number Guess Puzzle
      </NavLink>
    </div>
  );
};

export default NavBar;
