import { generateExpression } from "math-expression-generator";
import store from "../store";
const signs = ["+", "-", "*", "/"];
const hasRepeatingDigitsRegex = (/([0-9]).*?\1/);

export default class GenerateNumber {
  constructor(length) {
    this.length = length;
    return { equation: this.createNumber() };
  }

  //determine the max length of the right side of the equation
  createNumber() {
    let number = Math.floor(Math.random() * Math.pow(10, this.length));
    while(hasRepeatingDigitsRegex.test(number) || number.toString().length !== this.length) {
      number = Math.floor(Math.random() * Math.pow(10, this.length));
    }
    console.log("Number: ", number.toString());
    return number.toString();
  }
}