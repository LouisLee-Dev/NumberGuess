import { checkNoOperatorsInExpression } from "../utils/utilityFunctions";

const signs = ["+", "-", "*", "/"];

export default class FromEquationToLink {
  constructor(input, numbersOnlyMode) {
    this.input = input.replace(/ /g, "");
    this.inputArr = this.input.split("");
    this.numbersOnlyMode = numbersOnlyMode;

    return this.lengthValidation(); // initiate validation
  }

  //Check validity of the length of the equation
  lengthValidation() {
    if (this.inputArr.length > 10) {
      return { error: "Too long" };
    } else if (this.inputArr.length < 5) {
      return { error: "Too short" };
    } else {
      return this.numbersOnlyMode
        ? this.validateNumber()
        : this.signsValidation();
    }
  }

  validateNumber() {
    return checkNoOperatorsInExpression(this.inputArr)
      ? this.generateLink()
      : { error: "Number cannot contain operators" };
  }

  //Check initial validity of the equation
  signsValidation() {
    let checkList = {
      mathSign: false, // input must include at least of the arithmetic signs
      noMultiSigns: true, //multiple signs in a row
      firstLastChar: false, //first and last characters must be numbers
    };
    if (
      !signs.includes(this.inputArr[0]) &&
      !signs.includes(this.inputArr[this.inputArr.length - 1])
    ) {
      checkList.firstLastChar = true;
    }
    this.inputArr.forEach((char, index) => {
      if (signs.includes(char)) {
        checkList.mathSign = true;
      }
      if (signs.includes(char) && signs.includes(this.inputArr[index - 1])) {
        checkList.noMultiSigns = false;
      }
    });
    switch (true) {
      case checkList.mathSign === false:
        return { error: "No arithmetic sign was included" };
      case checkList.noMultiSigns === false:
        return { error: "Two arithmetic signs in a row" };
      case checkList.firstLastChar === false:
        return { error: "Invalid equation" };
      default:
        return this.restructureInput();
    }
  }

  restructureInput() {
    // 1. restructure array of strings into a single string
    const inputToStr = this.inputArr.reduce((combo, char) => combo + char, "");
    let equationParts = [];
    // 2. divide equation in arrays. Each array value = side of the equation
    inputToStr
      .split("=")
      .forEach((part) =>
        equationParts.push(part.split(/([*\/()]|\b\s*[-+])/g))
      );
    // Check if any operand of the equation starts with 0
    if (
      equationParts.some((eqPart) => eqPart.some((opr) => opr.startsWith("0")))
    ) {
      return { error: "Some numbers start with 0." };
    }
    //3. calculate every side of the equation
    equationParts = equationParts.map((mathExpression) => {
      return this.calculateParts(mathExpression);
    });
    //4. validate equation => are all sides equal?
    return this.validateEquation(equationParts);
  }

  //   calcualte given expression
  calculateParts(mathExpression) {
    let a = "";
    let b = "";
    let sign = "";
    mathExpression.forEach((char) => {
      if (a === "") {
        a = parseInt(char);
      } else {
        if (signs.includes(char)) {
          sign = char;
        } else {
          b = parseInt(char);
          a = this.calculate(a, b, sign);
          b = 0;
          sign = "";
        }
      }
    });
    // eslint-disable-next-line no-eval
    return eval(mathExpression.join(""));
  }

  // math operations
  calculate = (a, b, sign) => {
    switch (sign) {
      case "+":
        return a + b;
      case "-":
        return a - b;
      case "*":
        return a * b;
      case "/":
        return a / b;
      default:
        return 0;
    }
  };

  // check whether sides of the equation are equal
  validateEquation(equationParts) {
    const validated = equationParts.every(
      (element) => element === equationParts[0]
    );
    return validated ? this.generateLink() : { error: "Sides are not equal" };
  }

  generateLink() {
    let t = this.input;
    const link =
      "http://numberguess.org/challenge:" +
      (unescape(encodeURIComponent(t)),
      window
        .btoa(t)
        .replace(/\//g, "_")
        .replace(/\+/g, "-")
        .replace(/=*$/, ""));
    return { link: link };
  }
}
