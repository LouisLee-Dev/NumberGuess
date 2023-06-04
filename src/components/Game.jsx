import { useState, useEffect, useCallback } from "react";
import GameField from "./GameField";
import Keyboard from "./Keyboard";
import NavBar from "./NavBar";
import store from "../store";
import Validation from "./Validate";
// import GenerateEquation from "./GenerateEquation";
import RecordGameResult from "./RecordGameResult";
import Popup from "./Popup";
import { checkNoOperatorsInExpression } from "../utils/utilityFunctions";
import InfoBar from "./InfoBar";
import GenerateNumber from "./GenerateNumber";
import { Equations5, Equation6, Equation8 } from "../utils/equations/equations";

const keys = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "0",
  "Enter",
  "Backspace",
  "-",
  "*",
  "/",
  "+",
];

const Game = (props) => {
  const practiceMode = store.getState().practiceMode;
  const arithmeticSigns = store.getState().arithmeticSigns;
  const [moves, setMoves] = useState(
    store.getState().moves.moves ? store.getState().moves.moves : []
  );
  const [difficulty, setDifficulty] = useState(store.getState().equationLength);
  const gameStatus = JSON.parse(
    localStorage.getItem(`Guess-Status-${difficulty}`)
  );
  const [equation, setEquation] = useState(
    gameStatus ? gameStatus.solution : ""
  );
  const [challengeLink, setChallengeLink] = useState(null);

  // store.subscribe(() => {
  //   if (numbersOnlyMode !== store.getState().numbersOnlyMode) {
  //     setNumbersOnlyMode(store.getState().numbersOnlyMode);
  //   }
  //   // if (challengeLink !== store.getState().challengeLink) {
  //   //   setChallengeLink(store.getState().challengeLink);
  //   // }
  // });

  const [numbersOnlyMode, setNumbersOnlyMode] = useState(
    store.getState().numbersOnlyMode
  );

  const [currentLine, setCurrentLine] = useState(
    store.getState().moves.currentLine ? store.getState().moves.currentLine : 0
  );
  const [error, setError] = useState("");
  const [status, setStatus] = useState(
    store.getState().status ? store.getState().status : "playing"
  );
  const [popup, setPopup] = useState();
  // store.getState().customEquation ? "custom" : ""
  const [section, setSection] = useState("game");
  const [numberSwitch, setNumberSwitch] = useState(false);
  // store.subscribe(() => {
  //   if (section !== store.getState().section) {
  //     setSection(store.getState().section);
  //   }
  //   if (store.getState().customEquation) {
  //     setPopup("custom");
  //   }
  // });
  const populateField = (difficulty) => {
    const numbersOnlyMode = store.getState().numbersOnlyMode;
    const practiceMode = store.getState().practiceMode;
    const loadedField = [];
    const row = [];
    for (let k = 0; k < difficulty; k++) {
      row[k] = "";
    }
    // console.log(props.challengeLink, "this is challenge LInk");
    if (props.challengeLink !== null) {
      console.log("challengeLink");
      setPopup("");
      store.dispatch({
        type: "status",
        payload: "playing",
      });
      for (let i = 0; i < 6; i++) {
        loadedField[i] = Array.from(row);
      }
      setMoves(loadedField);
      store.dispatch({
        type: "saveMoves",
        payload: { moves: loadedField, currentLine: 0 },
      });
    } else {
      const gameStatus = JSON.parse(
        localStorage.getItem(`Guess-Status-${difficulty}`)
      );
      if (gameStatus && numbersOnlyMode === false && practiceMode === false) {
        let temp = gameStatus.solution;
        setEquation(temp);
        setCurrentLine(gameStatus.guessStatus.length);

        for (let i = 0; i < gameStatus.guessStatus.length; i++) {
          loadedField[i] = gameStatus.guessStatus[i];
          setMoves(loadedField[i]);

          const won = loadedField[i].every(
            (key, index) => key === equation[index]
          );

          switch (true) {
            case won:
              store.dispatch({
                type: "status",
                payload: "won",
              });
              setStatus("won");

              setTimeout(() => {
                setPopup("won");
              }, 1000);
              setCurrentLine((prev) => ++prev);
              break;
            case gameStatus.guessStatus.length >= 5:
              store.dispatch({
                type: "status",
                payload: "lost",
              });
              setStatus("lost");
              setPopup("lost");
              // window.history.pushState("", "", "/");
              break;
            default:
              setCurrentLine((prev) => prev);
          }
        }
        if (gameStatus.guessStatus.length < 6) {
          for (let i = gameStatus.guessStatus.length; i < 6; i++) {
            loadedField[i] = Array.from(row);
          }
        }
      } else {
        for (let i = 0; i < 6; i++) {
          loadedField[i] = Array.from(row);
        }
      }
      setMoves(loadedField);
      store.dispatch({
        type: "saveMoves",
        payload: { moves: loadedField, currentLine: 0 },
      });
    }
  };

  const registerKey = (key) => {
    // if (
    //   localStorage.getItem(`guess-next-goal-time-${difficulty}`) &&
    //   numbersOnlyMode === false &&
    //   practiceMode === false
    // ) {
    //   setStatus("ended");
    // }
    if (status === "playing") {
      let index;
      let newMoves = moves;
      switch (key) {
        case "Enter":
          const validation = new Validation(
            moves[currentLine],
            equation,
            numbersOnlyMode
          );

          // console.log(validation);
          if (validation.result !== "validated") {
            // console.log(validation.result, "validation");
            validationError(validation.result);
          } else {
            if (
              numbersOnlyMode === false &&
              practiceMode === false &&
              props.challengeLink === null
            ) {
              //save current guess_status and solution on localstorage
              const storedData = JSON.parse(
                localStorage.getItem(`Guess-Status-${difficulty}`)
              );
              const currentStatus = {
                guessStatus: storedData?.guessStatus
                  ? storedData?.guessStatus
                  : [],
                solution: storedData?.solution ? storedData?.solution : {},
              };

              currentStatus.guessStatus.push(moves[currentLine]);
              currentStatus.solution = equation;
              localStorage.setItem(
                `Guess-Status-${difficulty}`,
                JSON.stringify(currentStatus)
              );
            }

            const won = moves[currentLine].every(
              (key, index) => key === equation[index]
            );
            store.dispatch({
              type: "saveMoves",
              payload: { moves: moves, currentLine: currentLine + 1 },
            });
            switch (true) {
              case won:
                store.dispatch({
                  type: "status",
                  payload: "won",
                });
                if (
                  numbersOnlyMode === false &&
                  practiceMode === false &&
                  props.challengeLink === null
                ) {
                  localStorage.setItem(
                    `guess-next-goal-time-${difficulty}`,
                    Date.now() + parseInt(10 * 1000)
                  );
                }
                setTimeout(() => {
                  setPopup("won");
                }, 1000);
                if (numbersOnlyMode === false && practiceMode === false) {
                  RecordGameResult(true, currentLine + 1);
                }
                setCurrentLine((prev) => ++prev);
                setStatus("won");
                // window.history.pushState("", "", "/");
                break;
              case currentLine >= 5:
                store.dispatch({
                  type: "status",
                  payload: "lost",
                });
                if (
                  numbersOnlyMode === false &&
                  practiceMode === false &&
                  props.challengeLink === null
                ) {
                  localStorage.setItem(
                    `guess-next-goal-time-${difficulty}`,
                    Date.now() + parseInt(10 * 1000)
                  );
                }
                setStatus("lost");

                setPopup("lost", RecordGameResult(false, 0));
                // window.history.pushState("", "", "/");

                break;
              default:
                setCurrentLine((prev) => ++prev);
            }
          }

          break;
        case "Backspace":
          index = moves[currentLine].indexOf("") - 1;
          newMoves[currentLine][index === -2 ? difficulty - 1 : index] = "";
          setMoves([...newMoves]);
          store.dispatch({
            type: "saveMoves",
            payload: { moves: newMoves, currentLine: currentLine },
          });
          break;
        default:
          index = moves[currentLine].indexOf("");
          newMoves[currentLine][index] = key;
          setMoves([...newMoves]);
          store.dispatch({
            type: "saveMoves",
            payload: { moves: newMoves, currentLine: currentLine },
          });
      }
    }
  };

  const validationError = (error) => {
    setError(error);
    setTimeout(() => {
      setError("");
    }, 1500);
  };

  const close = () => {
    document.getElementsByClassName("popUpMenu")[0]?.classList.add("zoom-out");
    setTimeout(() => {
      setPopup("");
      store.dispatch({
        type: "customEquation",
        payload: false,
      });
    }, 200);
  };

  const start = (movesInp) => {
    if (!movesInp[0]) {
      let urlEquation;
      if (
        window.location.pathname.includes("/challenge") ||
        props.challengeLink
      ) {
        setPopup("");
        const encryptedUrlEquation =
          window.location.pathname.split("/challenge/")[1] ||
          props.challengeLink;
        console.log(encryptedUrlEquation, "encrypted equation");

        setChallengeLink(encryptedUrlEquation);
        store.dispatch({
          type: "challengeLink",
          payload: encryptedUrlEquation,
        });
        window.history.pushState("", "", "/challenge");

        urlEquation = decodeURIComponent(
          escape(
            window.atob(
              encryptedUrlEquation?.replace(/_/g, "/").replace(/-/g, "+")
            )
          )
        );

        if (urlEquation && checkNoOperatorsInExpression(urlEquation)) {
          store.dispatch({
            type: "numbersOnlyMode",
            payload: true,
          });
          setNumbersOnlyMode(true);
        } else {
          setNumbersOnlyMode(false);
          store.dispatch({
            type: "numbersOnlyMode",
            payload: false,
          });
        }
        if (difficulty !== urlEquation.length) {
          store.dispatch({
            type: "equationLength",
            payload: urlEquation.length,
          });
          setDifficulty(urlEquation.length);
        }
        setEquation(urlEquation);
        store.dispatch({
          type: "saveEquation",
          payload: urlEquation,
        });
      } else {
        if (numbersOnlyMode) {
          createNumber();
        } else {
          createEquation();
        }
      }

      setCurrentLine(0);
      populateField(urlEquation ? urlEquation.length : difficulty);
    }
  };

  const createNumber = () => {
    const newNumber = new GenerateNumber(difficulty);

    if (!newNumber.equation) {
      createNumber();
    } else {
      setEquation(newNumber.equation);
      store.dispatch({
        type: "saveEquation",
        payload: newNumber,
      });
    }
  };
  const makeSigns = (equation) => {
    const signs = equation
      .toString()
      .split("")
      ?.filter((chat) => ["+", "-", "*", "/"].includes(chat));
    return signs.every((sign) => arithmeticSigns.includes(sign));
  };

  const createEquation = () => {
    const gameStatus = JSON.parse(
      localStorage.getItem(`Guess-Status-${difficulty}`)
    );
    if (gameStatus && practiceMode === false) {
      setEquation(gameStatus.solution);
    } else {
      let EquationList = [];
      switch (difficulty) {
        case 5:
          EquationList = Equations5;
          break;
        case 6:
          EquationList = Equation6;
          break;
        case 8:
          EquationList = Equation8;
          break;
        default:
          EquationList = Equations5;
      }
      if (practiceMode === true) {
        EquationList = EquationList?.filter((equation) => makeSigns(equation));
      }
      const shuffle = (array) => {
        let shuffledArray = [];
        for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
        }
        shuffledArray = array;
        let randomIndex = Math.floor(Math.random() * shuffledArray.length);
        let newEquation = { equation: shuffledArray[randomIndex] };
        if (equation === newEquation.equation) {
          newEquation = shuffle(array);
        }
        return newEquation;
      };
      const newEquation = shuffle(EquationList);

      // localStorage.setItem("goal-equation", JSON.stringify(newEquation.equation));
      console.log(
        "previousEquation:",
        equation,
        "NewEquation:",
        newEquation.equation,
        "Result:",
        eval(newEquation.equation)
      );
      setEquation(newEquation.equation);
      store.dispatch({
        type: "saveEquation",
        payload: newEquation,
      });
    }
  };

  const restart = () => {
    store.dispatch({
      type: "status",
      payload: "playing",
    });
    setStatus("playing");
    close();
    start([]);
  };
  const autoStart = () => {
    store.dispatch({
      type: "status",
      payload: "playing",
    });
    setStatus("playing");
    start([]);
  };

  const keyPress = useCallback((e) => {
    if (e.code === "Enter" && (status === "won" || status === "lost")) {
      restart();
    } else if (keys.includes(e.key) && popup === "") {
      registerKey(e.key);
    }
  });

  useEffect(() => {
    document.addEventListener("keydown", keyPress);
    return () => document.removeEventListener("keydown", keyPress);
  }, [keyPress]);

  useEffect(() => {
    // localStorage.removeItem("guess-next-goal-time");
    start(moves);
  }, []);

  useEffect(() => {
    restart();
  }, [numberSwitch, props.challengeLink]);
  return (
    <div className={`gameGrid mainColor`}>
      {popup !== "" ? (
        <Popup
          start={start}
          restart={restart}
          close={close}
          popup={popup}
          equation={equation}
          moves={moves}
          challengeLink={challengeLink}
        />
      ) : (
        ""
      )}
      {challengeLink ? (
        <div className="challengeInfo">
          <div>Challenge Mode</div>
        </div>
      ) : (
        // <InfoBar setNumberSwitch={setNumberSwitch} restart={restart} />?
        <div></div>
      )}
      <Error error={error} hidden={error ? false : true} />

      <GameField
        moves={moves}
        status={status}
        equation={equation}
        currentLine={currentLine}
        challengeLink={challengeLink}
        autoStart={autoStart}
        restart={restart}
        setEquation={setEquation}
      />
      <p
        className="text-center mb-0 mt-2"
        style={{ minHeight: "20px", fontWeight: "500", fontSize: ".9rem" }}
      >
        {["won", "lost"].includes(status) ? (
          <span className="miniGameMessage">
            {status === "won" ? "You Won! 🏆" : "You Lost!"}
          </span>
        ) : (
          ""
        )}
      </p>
      <Keyboard
        registerKey={registerKey}
        equation={equation}
        moves={moves}
        currentLine={currentLine}
      />
      {challengeLink ? (
        <div></div>
      ) : (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <NavBar />
        </div>
      )}
    </div>
  );
};

export default Game;

const Error = (props) => {
  return (
    <div hidden={props.hidden} className="errorPopup">
      {props.error}
    </div>
  );
};
