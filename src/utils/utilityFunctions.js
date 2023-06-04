export const isChallengePage = () => window.location.pathname.includes("/challenge:");

export const isString = (arg) => typeof arg === "string" || arg instanceof String;

export const signs = ["+", "-", "*", "/"];

export const checkNoOperatorsInExpression = (exp) => {

    if(Array.isArray(exp) && exp.some((char) => signs.includes(char))) {
        return false;
    } else if(isString(exp) && exp.split("").some((char) => signs.includes(char))) {
        return false;
    }
    return true;
}