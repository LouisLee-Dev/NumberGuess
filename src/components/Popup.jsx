import { useState, useRef } from "react";
import { Button, Col, Row, Navbar, Container, Nav } from "react-bootstrap";
import FromEquationToLink from "./FromEquationToLink";
import html2canvas from "html2canvas";
import { saveAs } from "file-saver";
import store from "../store";
import { NavLink } from "react-router-dom";
const domain = "http://numberguess.org/";

const Popup = (props) => {
  // this is challenge link
  const copyEquationLink = () => {
    window.navigator.clipboard.writeText(
      "http://numberguess.org/challenge/" +
        (unescape(encodeURIComponent(props.equation)),
        window
          .btoa(props.equation)
          .replace(/\//g, "_")
          .replace(/\+/g, "-")
          .replace(/=*$/, ""))
    );
  };
  const saveAsEmoji = () => {
    let output = "";
    props.moves.forEach((line) => {
      line.forEach((move, index) => {
        if (props.equation.includes(move) === false) {
          output += "⬜";
        }
        if (props.equation.includes(move) && props.equation[index] === move) {
          output += "🟩";
        }
        if (props.equation.includes(move) && props.equation[index] != move) {
          output += "🟧";
        }
        if (index === line.length - 1) {
          output += "\n";
        }
      });
    });
    return output;
  };

  const saveImg = () => {
    html2canvas(document.getElementsByClassName("gameField")[0]).then(function (
      canvas
    ) {
      canvas.toBlob(function (blob) {
        saveAs(blob, "Number game.png");
      });
    });
  };

  return (
    <div>
      <div className="wrap"></div>
      <div
        className="popUpMenu"
        style={{ overflow: "hidden", borderRadius: "15px" }}
      >
        <div>
          {props.popup === "custom" ? (
            <ChallengeMenu
              close={() => {
                props.close();
              }}
            />
          ) : (
            ""
          )}
          {props.popup === "won" ? (
            <WonMenu
              restart={props.restart}
              saveImg={saveImg}
              saveAsEmoji={saveAsEmoji}
              copyEquationLink={copyEquationLink}
              close={() => {
                props.close();
              }}
            />
          ) : (
            ""
          )}
          {props.popup === "lost" ? (
            <LostMenu
              restart={props.restart}
              close={() => {
                props.close();
              }}
              saveImg={saveImg}
              copyEquationLink={copyEquationLink}
              equation={props.equation}
            />
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default Popup;

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
const changePracticeMode = () => {
  store.dispatch({
    type: "practiceMode",
    payload: true,
  });
  store.dispatch({
    type: "numbersOnlyMode",
    payload: false,
  });
  store.dispatch({
    type: "dailyChallengeMode",
    payload: false,
  });
};
const WonMenu = (props) => {
  console.log(props, "this is props of won menu");
  const dailyChallengeMode = store.getState().dailyChallengeMode;
  const challengeLink = store.getState().challengeLink;
  const [showShareBtns, setShowShareBtns] = useState(false);
  const emojies = props.saveAsEmoji();
  return (
    <div className="secondaryColor" style={{ paddingBottom: "10px" }}>
      <span style={{ backgroundColor: "#edf0f6" }}>
        <h5
          className="p-2"
          style={{ color: "#d4ac41", backgroundColor: "#edf0f6" }}
        >
          You Won! 🏆
        </h5>
        <span
          style={{
            position: "absolute",
            fontSize: "1.2rem",
            width: "40px",
            top: "9px",
            right: "10px",
          }}
          className="fas closeBtn"
          onClick={() => {
            props.close();
          }}
        >
          OK
        </span>
      </span>
      {challengeLink ? (
        // <Button
        //   className="restartBtn"
        //   onClick={() => {
        //     store.dispatch({
        //       type: "challengeLink",
        //       payload: null,
        //     });

        //     props.restart();
        //   }}
        // >
        //   <NavLink className="nav-link" to="/" onClick={changeToDailyMode}>
        //     New Game
        //   </NavLink>
        <Navbar.Brand
          className="restartBtn"
          href="/"
          onClick={changeToDailyMode}
        >
          New Game
        </Navbar.Brand>
      ) : dailyChallengeMode ? (
        <Button
          className="restartBtn"
          // onClick={() => {
          //   store.dispatch({
          //     type: "challengeLink",
          //     payload: null,
          //   });
          //   props.restart();
          // }}
        >
          <NavLink
            className="nav-link"
            to="/math-wordle-unlimited"
            onClick={changePracticeMode}
          >
            Play unlimited math challenge
          </NavLink>
        </Button>
      ) : (
        <Button
          className="restartBtn"
          onClick={() => {
            store.dispatch({
              type: "challengeLink",
              payload: null,
            });
            props.restart();
          }}
        >
          New Game
        </Button>
      )}
      {}

      <p className="mt-1 mb-1" style={{ fontSize: ".8rem" }}>
        {/* or press Enter to play again */}
      </p>

      {showShareBtns ? (
        <Row className="pe-3 ps-3 pb-2">
          <Col sm="6" xs="6">
            <Button
              className="mt-2 share-stats-btn twitter-share"
              style={{ width: "100%" }}
              size="sm"
              href={
                "https://twitter.com/intent/tweet?text=" +
                encodeURIComponent(
                  "I won! This is my result: \n" +
                    emojies +
                    " Check it on " +
                    domain
                )
              }
              target="_blank"
            >
              Twitter
            </Button>
          </Col>
          <Col sm="6" xs="6">
            <Button
              className="mt-2 share-stats-btn facebook-share"
              style={{ width: "100%" }}
              size="sm"
              href={
                "https://www.facebook.com/sharer/sharer.php?u=" +
                domain +
                "&quote=" +
                encodeURIComponent(
                  "I won! This is my result: \n" +
                    emojies +
                    " Check it on " +
                    domain
                )
              }
              target="_blank"
            >
              Facebook
            </Button>
          </Col>
          <Col sm="6" xs="6">
            <Button
              className="mt-2 share-stats-btn whatsapp-share"
              style={{ width: "100%" }}
              size="sm"
              href={
                "whatsapp://send?text=" +
                encodeURIComponent(
                  "I won! This is my result: \n" +
                    emojies +
                    " Check it on " +
                    domain
                )
              }
              target="_blank"
            >
              WhatsApp
            </Button>
          </Col>
          <Col sm="6" xs="6">
            <Button
              className="mt-2 share-stats-btn reddit-share"
              style={{ width: "100%" }}
              size="sm"
              href={
                "http://www.reddit.com/submit?url=" +
                domain +
                "&title=" +
                encodeURIComponent(
                  "I won! This is my result: \n" +
                    emojies +
                    " Check it on " +
                    domain
                )
              }
              target="_blank"
            >
              Reddit
            </Button>
          </Col>
        </Row>
      ) : (
        <Button
          size="sm"
          className="popupBtn"
          onClick={() => setShowShareBtns(true)}
        >
          <i className="fas fa-share me-2"></i>Share you result!
        </Button>
      )}
      <Button size="sm" className="popupBtn" onClick={props.copyEquationLink}>
        <i className="fas fa-link me-2"></i>Copy link to this game
      </Button>
      {challengeLink ? (
        <div></div>
      ) : dailyChallengeMode ? (
        <Button
          size="sm"
          className="popupBtn"
          onClick={() => {
            store.dispatch({
              type: "section",
              payload: "stats",
            });
          }}
        >
          <i className="fas fa-chart-bar"></i> View my Stats
        </Button>
      ) : (
        <div></div>
      )}
    </div>
  );
};

const LostMenu = (props) => {
  const dailyChallengeMode = store.getState().dailyChallengeMode;
  const challengeLink = store.getState().challengeLink;

  return (
    <div className="secondaryColor" style={{ paddingBottom: "10px" }}>
      <span style={{ backgroundColor: "#edf0f6" }}>
        <h5 className="p-2" style={{ backgroundColor: "#edf0f6" }}>
          You Lost!
        </h5>
        <span
          style={{
            position: "absolute",
            fontSize: "1.2rem",
            width: "40px",
            top: "9px",
            right: "10px",
          }}
          className="fas closeBtn"
          onClick={() => {
            props.close();
          }}
        >
          OK
        </span>
      </span>
      <p className="mt-1 mb-1" style={{ fontSize: ".9rem" }}>
        The answer was:
      </p>
      <div className="answerBox mx-auto">
        <span>{props.equation}</span>
      </div>
      {challengeLink ? (
        <Navbar.Brand
          className="restartBtn"
          href="/"
          onClick={changeToDailyMode}
        >
          New Game
        </Navbar.Brand>
      ) : dailyChallengeMode ? (
        <Button
          className="restartBtn"
          // onClick={() => {
          //   store.dispatch({
          //     type: "challengeLink",
          //     payload: null,
          //   });
          //   props.restart();
          // }}
        >
          <NavLink
            className="nav-link"
            to="/math-wordle-unlimited"
            onClick={changePracticeMode}
          >
            Play unlimited math challenge
          </NavLink>
        </Button>
      ) : (
        <Button
          className="restartBtn"
          onClick={() => {
            store.dispatch({
              type: "challengeLink",
              payload: null,
            });
            props.restart();
          }}
        >
          New Game
        </Button>
      )}
      {/* <p className="mt-1 mb-1" style={{ fontSize: ".875rem" }}>
        or press Enter to play again
      </p> */}
      <Button size="sm" className="popupBtn" onClick={props.copyEquationLink}>
        <i className="fas fa-link me-2"></i>Copy link to this game
      </Button>
      {/* <Button size="sm" className="popupBtn" onClick={props.saveImg}>
        <i className="fas fa-download me-2"></i>Download puzzle image
      </Button> */}
      {challengeLink ? (
        <div></div>
      ) : dailyChallengeMode ? (
        <Button
          size="sm"
          className="popupBtn"
          onClick={() => {
            store.dispatch({
              type: "section",
              payload: "stats",
            });
          }}
        >
          <i className="fas fa-chart-bar"></i> View my Stats
        </Button>
      ) : (
        <div></div>
      )}
    </div>
  );
};

const ChallengeMenu = (props) => {
  const [message, setMessage] = useState("");
  const [showShareBtns, setShowShareBtns] = useState(false);
  const input = useRef();
  const link = useRef();
  const invalidLink = useRef(false);
  const numbersOnlyMode = store.getState().numbersOnlyMode;

  const generateLink = () => {
    const getLink = new FromEquationToLink(
      input.current.value,
      numbersOnlyMode
    );
    if (getLink.error) {
      setMessage(getLink.error);
      invalidLink.current = true;
    } else if (getLink.link) {
      window.navigator.clipboard.writeText(getLink.link);
      link.current = getLink.link;
      invalidLink.current = false;
      setMessage("Link Copied!");
    }
  };

  const handleShareButtonClick = () => {
    generateLink();

    if (!invalidLink.current && link.current) {
      setShowShareBtns(true);
    }
  };

  const onChangeHandler = () => {
    setShowShareBtns(false);
    setMessage("");
  };

  return (
    <div className="secondaryColor" style={{ paddingBottom: "20px" }}>
      <span style={{ backgroundColor: "#edf0f6" }}>
        <h5 className="menuColor p-2">Number Guess Generator</h5>
        <span
          style={{
            position: "absolute",
            fontSize: "1.2rem",
            width: "40px",
            top: "9px",
            right: "10px",
          }}
          className="fas closeBtn"
          onClick={props.close}
        >
          OK
        </span>
      </span>
      <p
        className="mt-3 mb-3 pe-2 ps-2 popupChallengeText"
        style={{ fontSize: ".9rem" }}
      >
        <span>Challenge your friends with</span>
        <span className="popupMode">
          {numbersOnlyMode ? "Guess The Numbers" : "Math Equation"}
        </span>
        <span>
          Choose from
          <span className="fw-bold">
            {" "}
            5 to 10 {numbersOnlyMode ? "numbers" : "symbols"}
          </span>
        </span>
        <span>
          for example
          <span className="fw-bold">
            {" "}
            {numbersOnlyMode ? "3 4 5 6 7 5" : "4 + 5 = 9"}{" "}
          </span>
          <span className="fst-italic">
            {" "}
            {numbersOnlyMode ? "(6 numbers selected)" : "(5 symbols)"}{" "}
          </span>
        </span>
      </p>
      <input
        ref={input}
        className="answerBox mx-auto pt-0 pb-0"
        onChange={onChangeHandler}
        type="text"
      />
      <p className="mt-3 mb-3 pe-2 ps-2" style={{ fontSize: ".9rem" }}>
        {message}
      </p>
      <Button className="facebook-share" onClick={generateLink}>
        Copy Link
      </Button>

      {showShareBtns ? (
        <Row className="pe-3 ps-3 pb-2">
          <Col sm="6" xs="6">
            <Button
              className="mt-2 share-stats-btn twitter-share"
              style={{ width: "100%" }}
              size="sm"
              href={
                "https://twitter.com/intent/tweet?text=" +
                encodeURIComponent(
                  "Solve the challenge by guessing the correct maths equation. \n" +
                    "Can you solve it? " +
                    link.current
                )
              }
              target="_blank"
            >
              Twitter
            </Button>
          </Col>
          <Col sm="6" xs="6">
            <Button
              className="mt-2 share-stats-btn facebook-share"
              style={{ width: "100%" }}
              size="sm"
              href={
                "https://www.facebook.com/sharer/sharer.php?u=" +
                link.current +
                "&quote=" +
                encodeURIComponent(
                  "Solve the challenge by guessing the correct maths equation. \n" +
                    "Can you solve it? " +
                    link.current
                )
              }
              target="_blank"
            >
              Facebook
            </Button>
          </Col>
          <Col sm="6" xs="6">
            <Button
              className="mt-2 share-stats-btn whatsapp-share"
              style={{ width: "100%" }}
              size="sm"
              href={
                "whatsapp://send?text=" +
                encodeURIComponent(
                  "Solve the challenge by guessing the correct maths equation. \n" +
                    "Can you solve it? " +
                    link.current
                )
              }
              target="_blank"
            >
              WhatsApp
            </Button>
          </Col>
          <Col sm="6" xs="6">
            <Button
              className="mt-2 share-stats-btn reddit-share"
              style={{ width: "100%" }}
              size="sm"
              href={
                "http://www.reddit.com/submit?url=" +
                link.current +
                "&title=" +
                encodeURIComponent(
                  "Solve the challenge by guessing the correct maths equation. \n" +
                    "Can you solve it? " +
                    link.current
                )
              }
              target="_blank"
            >
              Reddit
            </Button>
          </Col>
        </Row>
      ) : (
        <Button
          className="facebook-share ms-5"
          onClick={handleShareButtonClick}
        >
          Share Link
        </Button>
      )}
    </div>
  );
};
