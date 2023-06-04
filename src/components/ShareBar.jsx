import { Row, Col, Button } from "react-bootstrap";
const domain = "http://numberguess.org/";

const ShareBar = () => {
  return (
    <Row
      className="justify-content-center mx-auto shareBar pt-4 pb-3"
      style={{
        width: "100%",
        flexWrap: "wrap",
        color: "white",
        backgroundcolor: "inherit",
      }}
    >
      <Col className="p-1" xs="2" style={{ maxWidth: "120px" }}>
        <Button
          style={{ width: "100%" }}
          className="mt-2 share-stats-btn facebook-share"
          size="sm"
          href={"https://www.facebook.com/sharer/sharer.php?u=" + 
            domain + 
            "&quote=" +
              encodeURIComponent(
                "Try this Math Wordle challenge! " +
                domain
              )  
          }
          target="_blank"
        >
          <i
            style={{ fontSize: ".7rem" }}
            className="fab fa-facebook-f me-1"
          ></i>
          <span className="share-text">Share</span>
        </Button>
      </Col>

      <Col className="p-1" xs="2" style={{ maxWidth: "120px" }}>
        <Button
          style={{ width: "100%" }}
          className="mt-2 share-stats-btn twitter-share"
          size="sm"
          href={"https://twitter.com/intent/tweet?text=" + 
            encodeURIComponent(
              "Try this Math Wordle challenge! " +
              domain
            )
          }
          target="_blank"
        >
          <i className="fab fa-twitter me-1"></i>
          <span className="share-text">Tweet</span>
        </Button>
      </Col>

      <Col className="p-1" xs="2" style={{ maxWidth: "120px" }}>
        <Button
          style={{ width: "100%" }}
          className="mt-2 share-stats-btn messenger-share"
          size="sm"
          href={
            "https://www.facebook.com/dialog/share?app_id=12345&display=popup&href=" +
            encodeURIComponent(
              "Try this Math Wordle challenge! " +
              domain
            )
          }
          target="_blank"
        >
          <i className="fab fa-facebook-messenger me-1"></i>
          <span className="share-text">Share</span>
        </Button>
      </Col>

      <Col className="p-1" xs="2" style={{ maxWidth: "120px" }}>
        <Button
          style={{ width: "100%" }}
          className="mt-2 share-stats-btn whatsapp-share"
          size="sm"
          href={"whatsapp://send?text=" + encodeURIComponent(
            "Try this Math Wordle challenge! " +
            domain
          )}
          target="_blank"
        >
          <i className="fab fa-whatsapp me-1"></i>
          <span className="share-text">Share</span>
        </Button>
      </Col>

      <Col className="p-1" xs="2" style={{ maxWidth: "120px" }}>
        <Button
          style={{ width: "100%" }}
          className="mt-2 share-stats-btn reddit-share"
          size="sm"
          href={"https://www.reddit.com/submit?url=" + 
            domain +
            "&title=" + 
            encodeURIComponent(
              "Try this Math Wordle challenge! " +
              domain
            )
          }
          target="_blank"
        >
          <i className="fab fa-reddit-alien me-1"></i>
          <span className="share-text">Share</span>
        </Button>
      </Col>

      <Col className="p-1" xs="2" style={{ maxWidth: "120px" }}>
        <Button
          style={{ width: "100%" }}
          className="mt-2 share-stats-btn email-share"
          size="sm"
          href={"mailto:?subject=" + 
            encodeURIComponent("Number Guess") +
            "&body=" + 
              encodeURIComponent(
                "Try this Math Wordle challenge! " +
                domain
              )
          }
          target="_blank"
        >
          <i className="fas fa-envelope me-1"></i>
          <span className="share-text">Email</span>
        </Button>
      </Col>
    </Row>
  );
};

export default ShareBar;
