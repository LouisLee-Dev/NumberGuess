import { useState, useEffect } from "react";
import { Navbar, Container, Nav, Button } from "react-bootstrap";
import store from "../store";
import InfoModal from "./InfoModal";
import NavBarDropDown from "./NavBarDropDown";
import { NavLink } from "react-router-dom";

const Header = (props) => {
  const numbersOnlyMode = store.getState().numbersOnlyMode;
  const practiceMode = store.getState().practiceMode;
  const [mobile, setMobile] = useState(false);
  const [show, setShow] = useState(false);

  const handleModalClose = () => {
    setShow(false);
  };

  const handleModalShow = () => {
    setShow(true);
  };
  const changeToDailyMode = () => {
    console.log(props.challengeLink, "this is challenge Link of Header");
    store.dispatch({
      type: "dailyChallengeMode",
      payload: true,
    });
    store.dispatch({
      type: "challengeLink",
      payload: null,
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
  useEffect(() => {
    if (
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      )
    ) {
      setMobile(true);
    }
  }, []);
  const handleClick = () => {
    handleModalShow();
  };

  return (
    <div>
      <Navbar className="mainColor" expand="lg">
        <Container style={{ color: "white", maxWidth: "640px" }}>
          <Nav
            className={
              "justify-content-center d-flex flex-row align-items-baseline " +
              (mobile ? "mx-auto  mt-1 mb-2" : "float-end ")
            }
            style={{ minWidth: "160px" }}
          >
            <Navbar.Brand
              className={"logo " + (mobile ? "mx-auto" : "")}
              href="/"
            >
              <img
                src="./android-chrome-512x512.png"
                alt="number guess logo"
                width="20"
                className="me-2"
              />
              <span style={{ marginRight: "15px" }}>Number Guess</span>
            </Navbar.Brand>
            {!props.challengeLink && (
              <>
                {numbersOnlyMode || practiceMode ? (
                  <div></div>
                ) : (
                  <NavItem
                    section="stats"
                    icon={<i className="fas fa-chart-bar"></i>}
                  />
                )}

                <NavItem
                  section="settings"
                  icon={<i className="fas fa-cog"></i>}
                />
              </>
            )}

            {props.challengeLink && (
              // <button
              //   className="navBtn"
              //   style={{
              //     padding: "3px 5px",
              //     borderRadius: "5px",
              //   }}
              //   href="/"
              //   onClick={changeToDailyMode}
              // >
              //   <i
              //     className="fas fa-sync"
              //     style={{
              //       marginRight: "5px",
              //     }}
              //   ></i>
              //   {/* <NavLink
              //     to="/"
              //     onClick={changeToDailyMode}
              //     style={() => ({
              //       textDecoration: "none",
              //     })}
              //   > */}
              //   New Game
              //   {/* </NavLink> */}
              // </button>
              <Navbar.Brand
                className="navBtn"
                style={{
                  padding: "3px 5px",
                  borderRadius: "5px",
                }}
                href="/"
                onClick={changeToDailyMode}
              >
                <i
                  className="fas fa-sync"
                  style={{
                    marginRight: "5px",
                  }}
                ></i>
                New Game
              </Navbar.Brand>
            )}
            <button className="navBtn" onClick={handleClick}>
              {<i className="fas fa-info-circle"></i>}
            </button>
            {!props.challengeLink && <NavBarDropDown />}
          </Nav>
        </Container>
      </Navbar>
      <InfoModal show={show} handleClose={handleModalClose} />
    </div>
  );
};

const NavItem = (props) => {
  const changeSection = (section) => {
    // eslint-disable-next-line default-case
    switch (section) {
      case "info":
        store.dispatch({
          type: "section",
          payload: "info",
        });
        break;
      case "stats":
        store.dispatch({
          type: "section",
          payload: "stats",
        });
        break;
      case "settings":
        store.dispatch({
          type: "section",
          payload: "settings",
        });
        break;
      case "custom":
        store.dispatch({
          type: "section",
          payload: "game",
        });
        store.dispatch({
          type: "customEquation",
          payload: "true",
        });
        break;
    }
  };
  return (
    <Button
      onClick={() => changeSection(props.section)}
      className="navBtn"
      style={{
        padding: "3px 5px",
        borderRadius: "5px",
        marginRight: props.challengeLink ? "24px" : "6px",
      }}
      disabled={props.diabledState}
      variant="secondary"
    >
      {props.icon} {props.text}
    </Button>
  );
};

export default Header;
