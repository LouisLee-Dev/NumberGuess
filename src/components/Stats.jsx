import { useState, useEffect } from "react";
import { Row, Col, Button, ProgressBar } from "react-bootstrap";
import store from "../store";
import processStats from "./ProcessStats";
const domain = "http://numberguess.org/";

const Stats = () => {
  const [stats, setStats] = useState();
  const [showShareBtns, setShowShareBtns] = useState(false);

  const close = () => {
    store.dispatch({
      type: "section",
      payload: "game",
    });
  };

  useEffect(() => {
    setStats(processStats());
  }, []);

  return (
    <div
      className="text-center mx-auto"
      style={{
        minHeight: "500px",
        maxWidth: "600px",
        minWidth: "252px",
        padding: "0 12px",
      }}
    >
      <Row>
        <Col
          xs="12"
          style={{
            position: "relative",
            borderRadius: "10px",
            backgroundColor: "#edf0f6",
          }}
        >
          <h4 className="pt-1" style={{ color: "#595959" }}>
            Statistics
          </h4>
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

      <Row className="px-3 stats">
        <Col className="mx-auto" xs="12">
          <Row className="justify-content-center statTotal">
            <Col>
              <h1 style={{ fontSize: "3rem" }}>{stats?.played}</h1>
              <p className="stats-p-small">🕹️ Games Played</p>
            </Col>
            <Col>
              <h1 style={{ fontSize: "3rem" }}>{stats?.won}</h1>
              <p className="stats-p-small">🏆 Games Won</p>
            </Col>
            <Col>
              <h1 style={{ fontSize: "3rem" }}>{stats?.pctWon}</h1>
              <p className="stats-p-small">📈 % of Wins</p>
            </Col>
            <Col>
              <h1 style={{ fontSize: "3rem" }}>{stats?.streak}</h1>
              <p className="stats-p-small">⚡️ Max Streak</p>
            </Col>
          </Row>
        </Col>
        {showShareBtns ? (
          <Row>
            <Col sm="3" xs="6">
              <Button
                className="mt-2 share-stats-btn twitter-share"
                style={{ width: "100%" }}
                size="sm"
                href={
                  "https://twitter.com/intent/tweet?text=I have " +
                  encodeURIComponent(stats?.pctWon + "% of wins on " + domain)
                }
                target="_blank"
              >
                Twitter
              </Button>
            </Col>
            <Col sm="3" xs="6">
              <Button
                className="mt-2 share-stats-btn facebook-share"
                style={{ width: "100%" }}
                size="sm"
                href={
                  "https://www.facebook.com/sharer/sharer.php?u=" +
                  domain +
                  "&quote= I have " +
                  stats?.pctWon +
                  "& of wins!"
                }
                target="_blank"
              >
                Facebook
              </Button>
            </Col>
            <Col sm="3" xs="6">
              <Button
                className="mt-2 share-stats-btn whatsapp-share"
                style={{ width: "100%" }}
                size="sm"
                href={
                  "whatsapp://send?text=I have" +
                  stats?.pctWon +
                  "% of wins on " +
                  domain
                }
                target="_blank"
              >
                WhatsApp
              </Button>
            </Col>
            <Col sm="3" xs="6">
              <Button
                className="mt-2 share-stats-btn reddit-share"
                style={{ width: "100%" }}
                size="sm"
                href={
                  "http://www.reddit.com/submit?url=" +
                  domain +
                  "&title=" +
                  encodeURIComponent("I have " + stats?.pctWon + "% of wins!")
                }
                target="_blank"
              >
                Reddit
              </Button>
            </Col>
          </Row>
        ) : (
          <Button
            className="share-stats-button"
            onClick={() => setShowShareBtns(true)}
            size="sm"
            style={{ borderRadius: "5px" }}
          >
            Share your stats
          </Button>
        )}

        <Col className="mx-auto mt-4" sm="10" xs="12">
          <h5 className="mt-0 mb-0">Best tries distribution</h5>
        </Col>
        <Col className="mx-auto" xs="12">
          <table className="statsTable" style={{ width: "100%" }}>
            <tbody>
              {stats?.byLine
                ? Object.keys(stats?.byLine).map((key) => {
                    return (
                      <tr key={key}>
                        <td className="number">{"#" + key}</td>
                        <td>
                          <ProgressBar
                            className="text-end"
                            now={stats?.byLine[key].pctWon}
                            label={`${stats?.byLine[key].pctWon}%`}
                          />
                        </td>
                        <td className="amount">{stats?.byLine[key].won}</td>
                      </tr>
                    );
                  })
                : null}
            </tbody>
          </table>
        </Col>
      </Row>
    </div>
  );
};

export default Stats;
