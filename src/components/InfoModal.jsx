import React from "react";
import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { Row, Col } from "react-bootstrap";
import store from "../store";

const InfoModal = ({ show, handleShow, handleClose }) => {
  const numbersOnlyMode = store.getState().numbersOnlyMode;

  return (
    <div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            <h4>How to play</h4>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {numbersOnlyMode ? (
            <div
              className="text-center mx-auto"
              style={{
                maxWidth: "600px",
                minWidth: "252px",
                padding: "0 12px",
              }}
            >
              <Row>
                <Col
                  xs="12"
                  className="menuColor mb-3"
                  style={{
                    position: "relative",
                    borderRadius: "10px",
                    backgroundColor: "#edf0f6",
                  }}
                ></Col>
                <Col className="mx-auto" sm="10" xs="12">
                  <p className="text-center mb-2">
                    Guess the numbers within 6 attempts. After each try, a
                    colored tile hint will be revealed to indicate how close
                    your guesses are.
                  </p>
                  <p className="text-center">Begin by guessing any number.</p>
                </Col>
                <Col className="mx-auto mb-3" md="10" sm="7" xs="10">
                  <Row className="justify-content-center">
                    <DemoCell value={3} />
                    <DemoCell className="orange_cell" value={4} />
                    <DemoCell className="green_cell" value={9} />
                    <DemoCell value={2} />
                    <DemoCell className="green_cell" value={7} />
                    <DemoCell className="orange_cell" value={6} />
                  </Row>
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
                  <ul className="pt-2 ps-0 pe-3">
                    <ol>• You can only use numbers (0-9)</ol>
                    <ol>• A number can appear more than once</ol>
                  </ul>
                </Col>
              </Row>
            </div>
          ) : (
            <div
              className="text-center mx-auto"
              style={{
                maxWidth: "600px",
                minWidth: "252px",
                padding: "0 12px",
              }}
            >
              <Row>
                <Col
                  xs="12"
                  className="menuColor mb-3"
                  style={{
                    position: "relative",
                    borderRadius: "10px",
                    backgroundColor: "#edf0f6",
                  }}
                ></Col>
                <Col className="mx-auto" sm="10" xs="12">
                  <p className="text-center mb-2">
                    Guess the hidden math calculation that equals the displayed
                    answer within 6 attempts. After each try, a colored tile
                    hint will be revealed to indicate how close your guesses
                    are.
                  </p>
                  <p className="text-center">
                    Begin by guessing any mathematical equation.
                  </p>
                </Col>
                <Col className="mx-auto mb-3" md="10" sm="7" xs="10">
                  <Row className="justify-content-center">
                    <DemoCell value={3} />
                    <DemoCell className="orange_cell" value={4} />
                    <DemoCell className="orange_cell" value={"+"} />
                    <DemoCell value={2} />
                    <DemoCell className="green_cell" value={7} />
                  </Row>
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
                  <ul className="pt-2 ps-0 pe-3">
                    <ol>
                      • You can only use numbers (0-9) and arithmetic signs (+ -
                      * /)
                    </ol>
                    <ol>
                      • A Number and the arithmetic signs can appear more than
                      once
                    </ol>
                    <ol>
                      • The answer hint and number of arithmetic signs used will
                      be displayed
                    </ol>
                  </ul>
                </Col>
              </Row>
            </div>
          )}
        </Modal.Body>
      </Modal>
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
export default InfoModal;
