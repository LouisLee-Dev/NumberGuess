import { useState } from "react";
import HowToPlay from "./HowToPlay";
import Settings from "./Settings";
import Stats from "./Stats";
import store from "../store";
import Game from "./Game";

const MainField = (props) => {
  const [section, setSection] = useState("game");
  const numbersOnlyMode = store.getState().numbersOnlyMode;

  store.subscribe(() => {
    if (section !== store.getState().section) {
      setSection(store.getState().section);
    }
  });
  return (
    <div className="mainColor" style={{ height: "auto" }}>
      {section === "game" ? (
        <div>
          <Game challengeLink={props.challengeLink} />
        </div>
      ) : (
        ""
      )}

      {/* {section === "info" ? (
        numbersOnlyMode ? (
          <InfoModal show={true} handleClose={handleModalClose} />
        ) : (
          <InfoModal show={true} handleClose={handleModalClose} />
        )
      ) : (
        ""
      )} */}
      {section === "settings" ? <Settings /> : ""}
      {section === "stats" ? <Stats /> : ""}
    </div>
  );
};

export default MainField;
