import { generateExpression } from "math-expression-generator";
import store from "../store";

const signs = ["+", "-", "*", "/"];
export default class GenerateEquation {
  constructor(length) {
    this.length = length;
    this.stack = 0;
    this.minLength = 1;
    return { equation: this.determineMaxLength() };
  }

  //determine the max length of the right side of the equation
  determineMaxLength() {
    let maxResultLength;
    if (Math.random() > 0.34) {
      switch (true) {
        case this.length === 5:
          maxResultLength = 1;
          break;
        case this.length === 6:
          maxResultLength = 1;
          break;
        case this.length === 7 || this.length === 8:
          maxResultLength = 2;
          break;
        case this.length === 9:
          maxResultLength = 3;
          break;
        case this.length > 9:
          this.minlength = 1;
          maxResultLength = 3;
          break;
        default:
          maxResultLength = 1;
      }

      return this.determineResultLength(maxResultLength);
    } else {
      return this.limitedSigns();
    }
  }

  // choose randomly length of the right side of the equation
  determineResultLength(maxResultLength) {
    const resultLength = Math.floor(
      Math.random() * (maxResultLength - this.minLength + 1) + this.minLength
    );
    return this.determineEndResult(resultLength, maxResultLength);
  }

  // determine the value of the right side of the equation within the max length of the right side
  determineEndResult(resultLength, maxResultLength) {
    const maxResult = (0.999999 * Math.pow(10, resultLength)).toFixed(0);
    const targetResult = Math.floor(Math.random() * (maxResult - 0 + 1));
    return this.generateEquation(targetResult, maxResultLength);
  }

  // generate an equation that outputs the desired end result;
  // if the output length is the same as the chosen difficulty, return the output;
  // otherwise repeat from the beginning
  generateEquation(targetResult, maxResultLength) {
    const equation = generateExpression({
      target: targetResult,
      length: Math.random() * (maxResultLength - 2 + 1) + 2,
    });

    if (v2ConditionsNotFulfilled(equation)) {
      this.stack++;
      return this.determineResultLength(maxResultLength);
    }

    let passed = true;
    equation.forEach((key) => {
      if (signs.includes(key)) {
        if (store.getState().arithmeticSigns.includes(key) === false) {
          passed = false;
        }
      }
    });
    if (!passed) {
      this.stack++;
      return this.determineResultLength(maxResultLength);
    } else {
      let equationToString = equation.reduce((combo, char) => combo + char, "");
      equationToString += "=" + targetResult.toString();

      if (equationToString.length !== this.length) {
        this.stack++;
        return this.determineResultLength(maxResultLength);
      } else {
        return equationToString;
      }
    }
  }

  limitedSigns() {
    let varLength;
    switch (true) {
      case this.length > 5 && this.length < 8:
        varLength = 1;
        break;
      case this.length > 7 && this.length < 10:
        varLength = 2;
        break;
      case this.length > 9:
        varLength = 3;
        break;
      default:
        varLength = 1;
    }

    let varA = Math.floor(
      Math.random() * (0.99999 * Math.pow(10, varLength) - 0 + 1) + 0
    );
    let varB = Math.floor(
      Math.random() * (0.99999 * Math.pow(10, varLength) - 0 + 1) + 0
    );
    let varC = Math.floor(
      Math.random() * (0.99999 * Math.pow(10, varLength) - 0 + 1) + 0
    );

    let sign =
      store.getState().arithmeticSigns[
        Math.floor(
          Math.random() * (store.getState().arithmeticSigns.length - 1 + 1) + 0
        )
      ];
    let sign2 =
      store.getState().arithmeticSigns[
        Math.floor(
          Math.random() * (store.getState().arithmeticSigns.length - 1 + 1) + 0
        )
      ];

    if (sign === "/" || sign2 === "/") {
      let alteredLength;
      // eslint-disable-next-line default-case
      switch (true) {
        case this.length === 5:
          alteredLength = 1;
          break;
        case this.length === 6:
          alteredLength = 2;
          break;
        case this.length === 7:
          alteredLength = 3;
          break;
        case this.length === 8:
          alteredLength = 3;
          break;
        case this.length === 9:
          alteredLength = 4;
          break;
        case this.length === 10:
          alteredLength = 4;
          break;
      }

      let varA = Math.floor(
        Math.random() * (0.99999 * Math.pow(10, alteredLength) - 0 + 1) + 0
      );
      let varB = Math.floor(Math.random() * (10 - 0 + 1) + 0);
      let varC = Math.floor(Math.random() * (10 - 0 + 1) + 0);
      return this.calc(varA, sign, varB, sign2, varC);
    } else {
      return this.calc(varA, sign, varB, sign2, varC);
    }
  }

  calc(a, sign, b, sign2, c) {
    let output = 0;
    let round = 1;
    // eslint-disable-next-line default-case
    switch (sign) {
      case "+":
        output = a + b;
        break;
      case "*":
        output = a * b;
        break;
      case "-":
        output = a - b;
        break;
      case "/":
        output = a / b;
        break;
    }

    let curLength =
      a.toString().length + 2 + b.toString().length + output.toString().length;
    switch (true) {
      case curLength < this.length && c:
        round++;
        return this.calc(output, sign2, c);

      case curLength > this.length:
        return this.limitedSigns();
      case curLength === this.length && output > 0 && output % 1 === 0:
        if (round === 1) {
          console.log(a, sign, b, "=", output);
          return a.toString() + sign + b.toString();
        } else {
          return a.toString() + sign + b.toString() + sign2 + c.toString();
        }
      default:
        return this.limitedSigns();
    }
  }
}

const v2ConditionsNotFulfilled = (equation) => {
  const containsZero = equation.includes(0);
  return containsZero;
};
