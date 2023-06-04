export default function reducer(
  state = {
    darkMode: false,
    colorBlindMode: false,
    swapEnterBckspc: false,
    dailyChallengeMode: true,
    numbersOnlyMode: false,
    practiceMode: false,
    challengeLink: null,
    equationLength: 5,
    arithmeticSigns: ["+", "-"],
    arithematicSignsToUseInternally: ["+", "-"],
    section: "game",
    status: "playing",
    customEquation: false,
    equation: "",
    flip: -1,
    moves: {
      moves: [],
      currentLine: 0,
    },
  },
  action
) {
  switch (action.type) {
    case "login":
      return {
        ...state,
        token: action.payload.token,
        userId: action.payload.userId,
        role: action.payload.role,
      };

    case "darkMode":
      return {
        ...state,
        darkMode: action.payload,
      };
    case "colorBlindMode":
      return {
        ...state,
        colorBlindMode: action.payload,
      };
    case "challengeLink":
      return {
        ...state,
        challengeLink: action.payload,
      };
    case "swapEnterBckspc":
      return {
        ...state,
        swapEnterBckspc: action.payload,
      };
    case "numbersOnlyMode":
      return {
        ...state,
        numbersOnlyMode: action.payload,
      };

    case "dailyChallengeMode":
      return {
        ...state,
        dailyChallengeMode: action.payload,
      };
    case "practiceMode":
      return {
        ...state,
        practiceMode: action.payload,
      };
    case "equationLength":
      return {
        ...state,
        equationLength: action.payload,
      };
    case "arithmeticSigns":
      return {
        ...state,
        arithmeticSigns: action.payload,
      };
    case "arithematicSignsToUseInternally":
      return {
        ...state,
        arithematicSignsToUseInternally: action.payload,
      };
    case "section":
      return {
        ...state,
        section: action.payload,
      };
    case "customEquation":
      return {
        ...state,
        customEquation: action.payload,
      };
    case "saveMoves":
      return {
        ...state,
        moves: {
          moves: action.payload.moves,
          currentLine: action.payload.currentLine,
        },
      };
    case "saveEquation":
      return {
        ...state,
        equation: action.payload.equation,
      };
    case "flip":
      return {
        ...state,
        flip: action.payload,
      };
    case "status":
      return {
        ...state,
        status: action.payload,
      };
    default:
      return state;
  }
}
