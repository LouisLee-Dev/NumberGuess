import { useState, useEffect } from "react";
import { Row, Col, Form } from "react-bootstrap";
import store from "../store";

const Settings = () => {
  const numbersOnlyMode = store.getState().numbersOnlyMode;
  const practiceMode = store.getState().practiceMode;

  const [settings, setSettings] = useState({
    equationLength: 5,
    arithmeticSigns: ["+", "-", "/", "*"],
    darkMode: false,
    colorBlindMode: false,
    swapEnterBckspc: false,
    numbersOnlyMode: false,
  });
  //Return to the game
  const close = () => {
    store.dispatch({
      type: "section",
      payload: "game",
    });
  };

  //Change app state based on changing settings
  const toggleState = (state, value) => {
    store.dispatch({
      type: state,
      payload: value,
    });
  };

  //Change app settings
  const updateSettings = () => {
    setSettings({
      equationLength: store.getState().equationLength,
      arithmeticSigns: store.getState().arithmeticSigns,
      darkMode: store.getState().darkMode,
      colorBlindMode: store.getState().colorBlindMode,
      swapEnterBckspc: store.getState().swapEnterBckspc,
      numbersOnlyMode: store.getState().numbersOnlyMode,
    });
  };

  //Listen to changes
  store.subscribe(() => {
    updateSettings();
  });

  //Prepare settigns onload
  useEffect(() => {
    updateSettings();
  }, []);

  return (
    <div
      className="text-center mx-auto"
      style={{ maxWidth: "600px", minWidth: "252px", padding: "0 12px" }}
    >
      <Row>
        <Col
          xs="12"
          className="menuColor"
          style={{
            position: "relative",
            borderRadius: "10px",
            backgroundColor: "#edf0f6",
          }}
        >
          <h4 className="pt-1">Settings</h4>
          <span
            style={{
              position: "absolute",
              fontSize: "1.2rem",
              width: "40px",
              top: "9px",
              right: "20px",
            }}
            className="fas closeBtn"
            onClick={close}
          >
            OK
          </span>
        </Col>
      </Row>
      <Row className="px-3">
        {numbersOnlyMode ? (
          <div>
            <Col className="mx-auto" sm="10" xs="12">
              <h5 className="mt-2 mb-0">Number Length</h5>
            </Col>
            <Col className="mx-auto" md="10" sm="7" xs="8">
              <Row className="justify-content-center equation">
                <Cell
                  type="changeEquation"
                  value={5}
                  className={
                    settings.equationLength === 5 ? "activeSettingsCell" : ""
                  }
                />
                <Cell
                  type="changeEquation"
                  value={6}
                  className={
                    settings.equationLength === 6 ? "activeSettingsCell" : ""
                  }
                />
                <Cell
                  type="changeEquation"
                  value={7}
                  className={
                    settings.equationLength === 7 ? "activeSettingsCell" : ""
                  }
                />
                <Cell
                  type="changeEquation"
                  value={8}
                  className={
                    settings.equationLength === 8 ? "activeSettingsCell" : ""
                  }
                />
                <Cell
                  type="changeEquation"
                  value={9}
                  className={
                    settings.equationLength === 9 ? "activeSettingsCell" : ""
                  }
                />
                <Cell
                  type="changeEquation"
                  value={10}
                  className={
                    settings.equationLength === 10 ? "activeSettingsCell" : ""
                  }
                />
              </Row>
            </Col>
          </div>
        ) : (
          <div>
            <Col className="mx-auto" sm="10" xs="12">
              <h5 className="mt-2 mb-0">Equation Length</h5>
            </Col>
            <Col className="mx-auto" md="10" sm="7" xs="8">
              <Row className="justify-content-center equation">
                <div className="equation-container">
                  <div className="equation-box">
                    <Cell
                      type="changeEquation"
                      value={5}
                      className={
                        settings.equationLength === 5
                          ? "activeSettingsCell"
                          : ""
                      }
                    />
                    <div>Easy</div>
                    <div className="text-equation-length">1 Operator</div>
                  </div>
                  <div className="equation-box">
                    <Cell
                      type="changeEquation"
                      value={6}
                      className={
                        settings.equationLength === 6
                          ? "activeSettingsCell"
                          : ""
                      }
                    />
                    <div>Medium</div>
                    <div className="text-equation-length">1-2 Operators</div>
                  </div>
                  <div className="equation-box">
                    <Cell
                      type="changeEquation"
                      value={8}
                      className={
                        settings.equationLength === 8
                          ? "activeSettingsCell"
                          : ""
                      }
                    />
                    <div>Hard</div>
                    <div className="text-equation-length">1-3 Operators</div>
                  </div>
                </div>
              </Row>
            </Col>
          </div>
        )}

        {practiceMode ? (
          <div>
            <hr className="mt-3 mb-2" style={{ height: "2px" }} />
            <Col
              className={`mx-auto ${
                settings.numbersOnlyMode && "arithematicSigns-disabled"
              }`}
              sm="10"
              xs="12"
            >
              <h5 className="mt-0 mb-0">Arithmetic Operators</h5>
              <p className="text-center mb-1">
                Choose the arithmetic signs in the target equation
              </p>
            </Col>
            <Col
              className={`mx-auto ${
                settings.numbersOnlyMode && "arithematicSigns-disabled"
              }`}
              md="10"
              sm="7"
              xs="8"
            >
              <Row className="justify-content-center">
                <Cell
                  settings={settings}
                  disabled={settings.numbersOnlyMode}
                  type="changeArithmeticSigns"
                  value={"+"}
                  style={{ fontWeight: "500" }}
                  className={
                    settings.arithmeticSigns.includes("+")
                      ? "activeSettingsCell"
                      : ""
                  }
                />
                <Cell
                  settings={settings}
                  disabled={settings.numbersOnlyMode}
                  type="changeArithmeticSigns"
                  value={"-"}
                  style={{ fontWeight: "500" }}
                  className={
                    settings.arithmeticSigns.includes("-")
                      ? "activeSettingsCell"
                      : ""
                  }
                />
                <Cell
                  settings={settings}
                  disabled={settings.numbersOnlyMode}
                  type="changeArithmeticSigns"
                  value={"*"}
                  style={{ fontWeight: "500" }}
                  className={
                    settings.arithmeticSigns.includes("*")
                      ? "activeSettingsCell"
                      : ""
                  }
                />
                <Cell
                  settings={settings}
                  disabled={settings.numbersOnlyMode}
                  type="changeArithmeticSigns"
                  value={"/"}
                  style={{ fontWeight: "500" }}
                  className={
                    settings.arithmeticSigns.includes("/")
                      ? "activeSettingsCell"
                      : ""
                  }
                />
              </Row>
            </Col>
          </div>
        ) : (
          <Col></Col>
        )}

        <hr className="mt-3 mb-2" style={{ height: "2px" }} />

        <Col
          className="mx-auto me-0 ms-0"
          style={{ width: "100%" }}
          md="10"
          sm="7"
          xs="8"
        >
          <Row className="p-0 me-0">
            <Col className="p-0" xs="8">
              <h5 className="text-start">Dark Mode</h5>
            </Col>
            <Col xs="4" className="p-0">
              <Form.Check
                style={{ fontSize: "1.3rem" }}
                type="switch"
                id="custom-switch"
                className="float-end settingsToggleBtn"
                checked={settings.darkMode}
                onChange={(event) =>
                  toggleState("darkMode", event.target.checked)
                }
              />
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

const Cell = (props) => {
  const changeEquationLength = (value) => {
    reloadEquation();
    store.dispatch({
      type: "equationLength",
      payload: value,
    });
  };

  const changeArithmeticSigns = (sign) => {
    reloadEquation();
    const newValue = props.settings.arithmeticSigns.includes(sign)
      ? props.settings.arithmeticSigns.filter((item) => item !== sign)
      : [...props.settings.arithmeticSigns, sign];
    if (newValue.length > 0) {
      store.dispatch({
        type: "arithmeticSigns",
        payload: newValue,
      });
    }
  };

  const reloadEquation = () => {
    store.dispatch({
      type: "flip",
      payload: -1,
    });

    store.dispatch({
      type: "status",
      payload: "playing",
    });

    store.dispatch({
      type: "saveMoves",
      payload: { moves: [], currentLine: 0 },
    });
  };

  const onClickHandler = () => {
    if (props.disabled) return;

    props.type === "changeEquation"
      ? changeEquationLength(+props.value)
      : changeArithmeticSigns(props.value.toString());
  };

  return (
    <div
      style={
        props.disabled ? { ...props.style, cursor: "not-allowed" } : props.style
      }
      className={"settingsCell " + props.className}
      onClick={onClickHandler}
    >
      {props.value ? props.value : ""}
    </div>
  );
};

export default Settings;
