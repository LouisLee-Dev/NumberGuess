import { signs, checkNoOperatorsInExpression } from "../utils/utilityFunctions";

export default class Validation {
  constructor(input, equation, numbersOnlyMode) {
    // console.log(input, equation);
    this.input = input.filter((key) => key !== ""); //remove cells without use input
    this.equation = equation;
    return {
      result: numbersOnlyMode
        ? this.numbersOnlyValidation()
        : this.lengthValidation(),
    }; // initiate validation
  }

  numbersOnlyValidation() {
    if (this.input.length === this.equation.length) {
      return checkNoOperatorsInExpression(this.input)
        ? "validated"
        : "Only numbers allowed";
    } else {
      return "Too short";
    }
  }

  //Check validity of the length of the equation
  lengthValidation() {
    if (this.input.length === this.equation.length) {
      return this.signsValidation();
    } else {
      return "Too short";
    }
  }

  //Check initial validity of the equation
  signsValidation() {
    let checkList = {
      mathSign: false, // input must include at least of the arithmetic signs
      noMultiSigns: true, //multiple signs in a row
      firstLastChar: false, //first and last characters must be numbers
    };
    if (
      !signs.includes(this.input[0]) &&
      !signs.includes(this.input[this.input.length - 1])
    ) {
      checkList.firstLastChar = true;
    }
    this.input.forEach((char, index) => {
      // if (char === "=") {
      //   checkList.equalSign = true;
      // }
      if (signs.includes(char)) {
        checkList.mathSign = true;
      }
      if (signs.includes(char) && signs.includes(this.input[index - 1])) {
        checkList.noMultiSigns = false;
      }
    });
    switch (true) {
      case checkList.mathSign === false:
        return "No arithmetic sign was included";
      case checkList.noMultiSigns === false:
        return "Two arithmetic signs in a row";
      case checkList.firstLastChar === false:
        return "Invalid equation";
      default:
        return this.validateEquationResult();
    }
  }

  restructureInput() {
    // 1. restructure array of strings into a single string
    const inputToStr = this.input.reduce((combo, char) => combo + char, "");
    let equationParts = [];
    // 2. divide equation in arrays. Each array value = side of the equation
    inputToStr
      .split("=")
      .forEach((part) =>
        equationParts.push(part.split(/([*\/()]|\b\s*[-+])/g))
      );
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
    return validated ? "validated" : "Sides are not equal";
  }
  validateEquationResult() {
    const currentEquation = this.input.join("");
    const currentEquationResult = eval(currentEquation);
    const solution = eval(this.equation);
    if (currentEquationResult !== solution) {
      return `Equation result should be ${solution}`;
    } else {
      return "validated";
    }
  }
}
