import store from "../store";

export default function RecordGameResult(won, line) {
  const numbersOnlyMode = store.getState().numbersOnlyMode;
  const practiceMode = store.getState().numbersOnlyMode;

  //Find or create game record
  const results = localStorage.numberGame
    ? JSON.parse(localStorage.numberGame)
    : [];
  // Update game record
  results.push({ won: won, line: line });
  // Save game record
  if (numbersOnlyMode === false && practiceMode === false) {
    localStorage.setItem("numberGame", JSON.stringify(results));
  }
}
