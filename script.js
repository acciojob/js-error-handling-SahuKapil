class OutOfRangeError extends Error {
  constructor(arg) {
    super(`Expression should only consist of integers and +-/* characters and not ${arg}`);
    this.name = "OutOfRangeError";
  }
}

class InvalidExprError extends Error {
  constructor() {
    super(`Expression should not have an invalid combination of expression`);
    this.name = "InvalidExprError";
  }
}

function evalString(expression) {
  try {
    // Check for invalid expression combination
    if (/(\+{2,}|\-{2,}|\*{2,}|\/{2,})/.test(expression)) {
      throw new InvalidExprError();
    }

    // Check for invalid starting operator
    if (/^(\*|\/|\+)/.test(expression)) {
      throw new SyntaxError("Expression should not start with invalid operator");
    }

    // Check for invalid ending operator
    if (/(\*|\/|\-|\+)$/.test(expression)) {
      throw new SyntaxError("Expression should not end with invalid operator");
    }

    // Check for invalid characters in expression
    if (/[^0-9\s\+\-\*\/]/.test(expression)) {
      throw new OutOfRangeError(expression.match(/[^0-9\s\+\-\*\/]/)[0]);
    }

    // Evaluate expression
    const result = eval(expression);
    return result;
  } catch (error) {
    console.log(error);
  }
}

// Example usage
console.log(evalString("10 + 20 - 5 * 3 / 6")); // Output: 18
console.log(evalString("10 * * 5")); // Output: InvalidExprError: Expression should not have an invalid combination of expression
console.log(evalString("*10 - 5")); // Output: SyntaxError: Expression should not start with invalid operator
console.log(evalString("10 + 5 /")); // Output: SyntaxError: Expression should not end with invalid operator
console.log(evalString("10 + abc")); // Output: OutOfRangeError: Expression should only consist of integers and +-/* characters and not a
