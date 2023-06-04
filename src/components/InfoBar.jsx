import React from "react";
import { Container, Button as BootstrapBtn } from "react-bootstrap";
import "react-popper-tooltip/dist/styles.css";
import store from "../store";
import { Form } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const InfoBar = (props) => {
  const numbersOnlyMode = store.getState().numbersOnlyMode;
  const practiceMode = store.getState().practiceMode;
  const changetoNumberMode = () => {
    store.dispatch({
      type: "numbersOnlyMode",
      payload: !numbersOnlyMode,
    });
  };
  // const changetoDailyChallengeMoe = () => {

  // }
  const changePracticeMode = () => {
    store.dispatch({
      type: "practiceMode",
      payload: !practiceMode,
    });
  };
  return (
    <div className="w-100 py-2">
      <Container
        style={{ maxWidth: "640px" }}
        className="d-flex align-items-center justify-content-center"
      >
        <div></div>
        <div style={{ width: "max-content" }}>
          <ul className="nav nav-tabs flex-row text-center border-0">
            {numbersOnlyMode ? (
              <li className="nav-item flex-sm-fill d-flex align-items-center">
                <button
                  className="tab-infobar"
                  style={{
                    color: "#69758e",
                    borderRadius: "5px",
                    fontWeight: "600",
                    margin: "0 6px 0 0",
                    width: "150px",
                  }}
                >
                  <NavLink
                    className="nav-link"
                    to="/"
                    onClick={changetoNumberMode}
                  >
                    Daily Challenge Mode
                  </NavLink>
                </button>
              </li>
            ) : practiceMode ? (
              <div>
                <li className="nav-item flex-sm-fill d-flex align-items-center">
                  <button
                    className="navBtn"
                    style={{
                      padding: "3px 5px",
                      borderRadius: "5px",
                    }}
                    onClick={props.restart}
                  >
                    <i
                      className="fas fa-sync"
                      style={{
                        marginRight: "5px",
                      }}
                    ></i>
                    Reset
                  </button>
                  <button
                    className="tab-infobar"
                    style={{
                      color: "#69758e",
                      borderRadius: "5px",
                      fontWeight: "600",
                      margin: "0 6px 0 0",
                      width: "150px",
                    }}
                  >
                    <NavLink
                      className="nav-link"
                      to="/"
                      onClick={changePracticeMode}
                    >
                      Daily Challenge Mode
                    </NavLink>
                  </button>
                </li>
              </div>
            ) : (
              <li className="nav-item flex-sm-fill d-flex align-items-center">
                <button
                  className="tab-infobar"
                  style={{
                    color: "#69758e",
                    borderRadius: "5px",
                    fontWeight: "600",
                    margin: "0 6px 0 0",
                    width: "150px",
                  }}
                >
                  <NavLink
                    className="nav-link"
                    to="/guess-the-numbers"
                    onClick={changetoNumberMode}
                  >
                    Number Only Mode
                  </NavLink>
                </button>
                <button
                  className="tab-infobar"
                  style={{
                    color: "#69758e",
                    borderRadius: "5px",
                    fontWeight: "600",
                    margin: "0 6px 0 0",
                    width: "150px",
                  }}
                >
                  <NavLink
                    className="nav-link"
                    to="/math-wordle-unlimited"
                    onClick={changePracticeMode}
                  >
                    Practice Mode
                  </NavLink>
                </button>
              </li>
            )}
          </ul>
        </div>
      </Container>
    </div>
  );
};

export default InfoBar;
