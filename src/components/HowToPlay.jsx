import { Row, Col } from "react-bootstrap";
import store from "../store";

const HowToPlay = (props) => {
  const close = () => {
    store.dispatch({
      type: "section",
      payload: "game",
    });
  };

  return (
    <div
      className="text-center mx-auto"
      style={{ maxWidth: "600px", minWidth: "252px", padding: "0 12px" }}
    >
      <Row>
        <Col
          xs="12"
          className="menuColor mb-3"
          style={{
            position: "relative",
            borderRadius: "10px",
            backgroundColor: "#edf0f6"
          }}
        >
          <h4 className="pt-1">How to play</h4>
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
        <Col className="mx-auto" sm="10" xs="12">
          <p className="text-center mb-2">
            Simply guess the hidden number or math puzzle within 6 tries, 
            each try will reveal a coloured tile hint to see how close your guesses are.
          </p>
          <p className="text-center mb-2">
            Firstly, select the mode: 
            <span className="fw-bold"> 'Number Only'  </span> 
            or
            <span className="fw-bold"> 'Math Equation'</span>
          </p>
          <p className="text-center">
            Then to play, start by guessing any number or mathematical equation, for example Math Equation mode:
          </p>
        </Col>
        <Col className="mx-auto mb-3" md="10" sm="7" xs="10">
          <Row className='justify-content-center'>
            <DemoCell value={5} />
            <DemoCell value={9} />
            <DemoCell value={"-"} />
            <DemoCell className="orange_cell" value={4} />
            <DemoCell className="green_cell" value={3} />
            <DemoCell className="green_cell" value={"="} />
            <DemoCell className="orange_cell" value={1} />
            <DemoCell value={6} />
          </Row>
        </Col>

        <Col
          sm="10"
          xs="12"
          className="menuSectionBg mx-auto mt-2"
          style={{
            position: "relative",
            borderRadius: "10px",
            padding: "0 20px",
          }}
        >
          <Row className="mt-2 flex-nowrap justify-content-center">
            <DemoCell
              style={{ 
                width: "22px",
                height: "22px",
                fontSize: "1rem" 
              }}
              value={5}
            />
              ,

            <DemoCell
              style={{ 
                width: "22px",
                height: "22px",
                fontSize: "1rem" 
              }}
              value={9}
            />
              ,

            <DemoCell
              style={{ 
                width: "22px",
                height: "22px",
                fontSize: "1rem" 
              }}
              value={"-"}
            />
              ,

            <DemoCell
              style={{
                width: "22px",
                height: "22px",
                fontSize: "1rem",
                marginLeft: "5px",
              }}
              value={6}
            />
          </Row>
          <div className='mb-3'>are not in the target equation at all</div>

          <Row style={{}} className="mt-1 pt-0 flex-nowrap justify-content-center">
            <DemoCell
              className="mt-0 mb-0 orange_cell"
              style={{ width: "22px", height: "22px", fontSize: "1rem" }}
              value={4}
            />
              ,
            <DemoCell
              className="mt-0 mb-0 orange_cell"
              style={{
                width: "22px",
                height: "22px",
                fontSize: "1rem",
                marginLeft: "5px",
              }}
              value={1}
            />
          </Row>
          <div className='mb-2'>are in the equation, but in the wrong place</div>

          <Row style={{}} className="mt-1 pt-0 flex-nowrap justify-content-center">
            <DemoCell
              className="mt-0 mb-0 green_cell"
              style={{
                width: "22px",
                height: "22px",
                fontSize: "1rem",
                marginLeft: "5px",
              }}
              value={3}
            />
            ,
            <DemoCell
              className="mt-0 mb-0 green_cell"
              style={{
                width: "22px",
                height: "22px",
                fontSize: "1rem",
                marginLeft: "5px",
              }}
              value={"="}
            />
          </Row>
          <div className='mb-2'>is in the equation and in the correct place</div>
        </Col>

        <Col
          sm="11"
          xs="12"
          className="mx-auto mt-2 px-0"
          style={{
            position: "relative",
            borderRadius: "10px",
            padding: "0",
          }}
        >
          <p className="text-center">
            Guess the target equation (all rows are green) to 🏆 win the game.
          </p>
          <p className="text-center mb-1" style={{ fontWeight: "500" }}>
            Game Rules:
          </p>
        </Col>

        <Col
          sm="11"
          xs="12"
          className="menuSectionBg mx-auto mb-5"
          style={{
            position: "relative",
            borderRadius: "10px",
          }}
        >
          <ul className="text-center pt-2 ps-0 pe-3">
            <ol>• The guess is accepted only with the correct numbers or equation</ol>
            <ol>• Each guess must contain one “=”</ol>
            <ol>
            • You can only use 1 2 3 4 5 6 7 8 9 0 numbers and/or + - * / = signs
            </ol>
            <ol>• The equation must have an integer to the right of the "="</ol>
            <ol>
            • Guesses are not commutative (1+2=3 and 2+1=3 are different
              answers)
            </ol>
          </ul>
        </Col>
      </Row>
    </div>
  );
};

const DemoCell = (props) => {
  return (
    <div style={props.style} className={"demoCell " + props.className}>
      {props.value ? props.value : ""}
    </div>
  );
};

export default HowToPlay;
