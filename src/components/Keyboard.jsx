import { useState, useEffect } from "react";
import { Row } from "react-bootstrap";
import store from "../store";

const Keyboard = (props) => {
  const [checked, setChecked] = useState({});

  const [numbersOnlyMode, setNumbersOnlyMode] = useState(false);

  store.subscribe(() => {
    if (numbersOnlyMode !== store.getState().numbersOnlyMode) {
      setNumbersOnlyMode(store.getState().numbersOnlyMode);
    }
  });

  const keyCheck = () => {
    let colors = {};
    props.moves.forEach((line, index) => {
      if (index < props.currentLine) {
        line.forEach((move, index) => {
          // eslint-disable-next-line default-case
          switch (true) {
            case props.equation.includes(move) === false:
              colors[move] = "gray_cell";
              break;
            case props.equation.includes(move) &&
              props.equation[index] === move:
              colors[move] = "green_cell";
              break;
            case props.equation.includes(move) && props.equation[index] != move:
              if (!colors[move]) {
                colors[move] = "orange_cell";
              }
          }
        });
      }
    });
    setChecked(colors);
  };

  useEffect(() => {
    keyCheck();
  }, [props.currentLine]);

  const appendDisabledClass = () => (numbersOnlyMode ? "fa-disabled" : "");

  return (
    <div
      className="text-center mx-auto pb-4"
      style={{ maxWidth: "600px", minWidth: "252px", padding: "0 12px" }}
    >
      <Row className="mx-auto" style={{ width: "100%" }}>
        <div
          onClick={() => props.registerKey("1")}
          className={"key numberkey " + (checked["1"] ? checked["1"] : "")}
        >
          1
        </div>
        <div
          onClick={() => props.registerKey("2")}
          className={"key numberkey " + (checked["2"] ? checked["2"] : "")}
        >
          2
        </div>
        <div
          onClick={() => props.registerKey("3")}
          className={"key numberkey " + (checked["3"] ? checked["3"] : "")}
        >
          3
        </div>
        <div
          onClick={() => props.registerKey("4")}
          className={"key numberkey " + (checked["4"] ? checked["4"] : "")}
        >
          4
        </div>
        <div
          onClick={() => props.registerKey("5")}
          className={"key numberkey " + (checked["5"] ? checked["5"] : "")}
        >
          5
        </div>
        <div
          onClick={() => props.registerKey("6")}
          className={"key numberkey " + (checked["6"] ? checked["6"] : "")}
        >
          6
        </div>
        <div
          onClick={() => props.registerKey("7")}
          className={"key numberkey " + (checked["7"] ? checked["7"] : "")}
        >
          7
        </div>
        <div
          onClick={() => props.registerKey("8")}
          className={"key numberkey " + (checked["8"] ? checked["8"] : "")}
        >
          8
        </div>
        <div
          onClick={() => props.registerKey("9")}
          className={"key numberkey " + (checked["9"] ? checked["9"] : "")}
        >
          9
        </div>
        <div
          onClick={() => props.registerKey("0")}
          className={"key numberkey " + (checked["0"] ? checked["0"] : "")}
        >
          0
        </div>
      </Row>
      <Row className="mx-auto" style={{ width: "90%" }}>
        <div
          onClick={() =>
            props.registerKey(
              store.getState().swapEnterBckspc ? "Enter" : "Backspace"
            )
          }
          className="widekey key"
        >
          {store.getState().swapEnterBckspc ? "Enter" : "Delete"}
        </div>
        <div
          {...(!numbersOnlyMode && { onClick: () => props.registerKey("+") })}
          className={
            "mathkey key " +
            (checked["+"] ? checked["+"] : "") +
            appendDisabledClass()
          }
        >
          <i className="fas fa-plus"></i>
        </div>
        <div
          {...(!numbersOnlyMode && { onClick: () => props.registerKey("-") })}
          className={
            "mathkey key " +
            (checked["-"] ? checked["-"] : "") +
            appendDisabledClass()
          }
        >
          <i className="fas fa-minus"></i>
        </div>
        <div
          {...(!numbersOnlyMode && { onClick: () => props.registerKey("*") })}
          className={
            "mathkey key " +
            (checked["*"] ? checked["*"] : "") +
            appendDisabledClass()
          }
        >
          <i className="fas fa-times"></i>
        </div>
        <div
          {...(!numbersOnlyMode && { onClick: () => props.registerKey("/") })}
          className={
            "mathkey key " +
            (checked["/"] ? checked["/"] : "") +
            appendDisabledClass()
          }
        >
          <i className="fas fa-divide"></i>
        </div>
        {/* <div
          {...(!numbersOnlyMode && { onClick: () => props.registerKey("=") })}
          className={"mathkey key " + (checked["="] ? checked["="] : "") + appendDisabledClass()}
        >
          <i className="fas fa-equals"></i>
        </div> */}
        <div
          onClick={() =>
            props.registerKey(
              store.getState().swapEnterBckspc ? "Backspace" : "Enter"
            )
          }
          className="widekey key"
        >
          {store.getState().swapEnterBckspc ? "Delete" : "Enter"}
        </div>
      </Row>

      <Row></Row>
    </div>
  );
};

export default Keyboard;
