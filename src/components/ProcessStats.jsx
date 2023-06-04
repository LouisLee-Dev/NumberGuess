import store from "../store";
export default function processStats() {
  const numbersOnlyMode = store.getState().numbersOnlyMode;
  const practiceMode = store.getState().numbersOnlyMode;

  const data = localStorage.numberGame
    ? JSON.parse(localStorage.numberGame)
    : [];
  // stats template
  let newStats = {
    loaded: false,
    won: 0,
    played: 0,
    pctWon: 0,
    streak: 0,
    byLine: {
      1: {
        won: 0,
        pctWon: 0,
      },
      2: {
        won: 0,
        pctWon: 0,
      },
      3: {
        won: 0,
        pctWon: 0,
      },
      4: {
        won: 0,
        pctWon: 0,
      },
      5: {
        won: 0,
        pctWon: 0,
      },
      6: {
        won: 0,
        pctWon: 0,
      },
    },
  };

  // Total games
  newStats.played = data.length;
  let streak = 0;
  // Calculate :
  // Wins by line
  // Games Won
  // Max Streak
  if (numbersOnlyMode === false && practiceMode === false) {
    data.forEach((game) => {
      if (game.won) {
        newStats.byLine[game.line].won++;
        newStats.won++;
        streak++;
        newStats.streak = newStats.streak < streak ? streak : newStats.streak;
      } else {
        streak = 0;
      }
    });
    // Calculate % of wins by line
    Object.keys(newStats.byLine).forEach((key) => {
      const pctWonbyLine = +Math.ceil(
        (newStats.byLine[key].won / newStats.won) * 100
      ).toFixed(0);
      newStats.byLine[key].pctWon = pctWonbyLine ? pctWonbyLine : 0;
    });
    // Calculate total % of wins
    const totalPctWon = +Math.ceil(
      (newStats.won / newStats.played) * 100
    ).toFixed(0);
    newStats.pctWon = totalPctWon ? totalPctWon : 0;
    newStats.loaded = true;
  }

  return newStats;
}
