export const firstDerivativeFirstOrderForward = (
  f: number[],
  h: number
): number[] => {
  const n = f.length;
  const df: number[] = new Array(n);

  for (let i = 0; i < n - 1; i++) {
    df[i] = (f[i + 1] - f[i]) / h;
  }

  return df;
};
export const firstDerivativeFirstOrderBackward = (
  f: number[],
  h: number
): number[] => {
  const n = f.length;
  const df: number[] = new Array(n);

  for (let i = 1; i < n; i++) {
    df[i] = (f[i] - f[i - 1]) / h;
  }

  return df;
};

// Вычисление первой производной (второй порядок точности)
export const firstDerivativeSecondOrder = (
  f: number[],
  h: number
): number[] => {
  const n = f.length;
  const df: number[] = new Array(n);

  // Центральные разности для всех внутренних узлов
  df[0] = (-3 * f[0] + 4 * f[1] - f[2]) / (2 * h); // Левая граница
  for (let i = 1; i < n - 1; i++) {
    df[i] = (f[i + 1] - f[i - 1]) / (2 * h);
  }
  df[n - 1] = (f[n - 3] - 4 * f[n - 2] + 3 * f[n - 1]) / (2 * h); // Правая граница

  return df;
};

// Вычисление второй производной (второй порядок точности)
export const secondDerivativeSecondOrder = (
  f: number[],
  h: number
): (number | null)[] => {
  const n = f.length;
  const d2f: (number | null)[] = new Array(n).fill(null);

  for (let i = 1; i < n - 1; i++) {
    d2f[i] = (f[i + 1] - 2 * f[i] + f[i - 1]) / (h * h);
  }

  return d2f;
};

export const derivativeAtPoints = (
  f: (x: number) => number,
  points: number[],
  n: number,
  h: number = 0.0001,
  type?: number
): (number | null)[] => {
  const derivatives: (number | null)[] = [];

  for (const x of points) {
    const derivative = nthDerivative(f, x, n, h);
    derivatives.push(derivative);
  }

  if (type === 1) {
    derivatives[derivatives.length - 1] = null;
  } else if (type === 2) {
    derivatives[0] = null;
  } else if (type === 3) {
    derivatives[0] = null;
    derivatives[derivatives.length - 1] = null;
  }

  return derivatives;
};
export const nthDerivative = (
  f: (x: number) => number,
  x: number,
  n: number,
  h: number = 0.0001
): number => {
  if (n <= 0) {
    throw new Error("Order of derivative must be positive");
  }
  if (n === 1) {
    // Первая производная
    return (f(x + h) - f(x - h)) / (2 * h);
  } else {
    // Рекурсивное вычисление n-й производной
    return (
      (nthDerivative(f, x + h, n - 1, h) - nthDerivative(f, x - h, n - 1, h)) /
      (2 * h)
    );
  }
};

export const compareSolutions = (
  numSolutions: (number | null)[],
  exactSolutions: (number | null)[]
): (number | null)[] => {
  const error = [];

  for (let i = 0; i < numSolutions.length; i++) {
    const numSolution = numSolutions[i];
    const exactSolution = exactSolutions[i];
    if (numSolution !== null && exactSolution !== null) {
      const value = Math.abs(numSolution - exactSolution);
      if (value.toString() === "NaN") {
        error.push(null);
      } else {
        error.push(value);
      }
    } else {
      error.push(null);
    }
  }

  return error;
};

export const theoreticalErrorFirstDerivativeFirstOrder = (
  f: (x: number) => number,
  points: number[],
  h: number,
  type?: number
): (number | null)[] => {
  const theoreticalError = [];
  const secondDerivativesValue = derivativeAtPoints(f, points, 2, h, type);

  for (const x of secondDerivativesValue) {
    if (x === null) {
      theoreticalError.push(null);
    } else {
      theoreticalError.push(Math.abs((x / 2) * h));
    }
  }

  return theoreticalError;
};

export const theoreticalErrorFirstDerivativeSecondOrder = (
  f: (x: number) => number,
  points: number[],
  h: number
): (number | null)[] => {
  const theoreticalError = [];
  const thirdDerivativesValue = derivativeAtPoints(f, points, 3, h);

  for (const x of thirdDerivativesValue) {
    if (x === null) {
      theoreticalError.push(null);
    } else {
      theoreticalError.push(Math.abs((x / 6) * h ** 2));
    }
  }
  if (
    thirdDerivativesValue[0] !== null &&
    thirdDerivativesValue[thirdDerivativesValue.length - 1] !== null
  ) {
    theoreticalError[0] = Math.abs((thirdDerivativesValue[0] / 3) * h ** 2);
    theoreticalError[theoreticalError.length - 1] = Math.abs(
      ((thirdDerivativesValue[thirdDerivativesValue.length - 1] ?? 0) / 3) *
        h ** 2
    );
  }

  return theoreticalError;
};

export const theoreticalErrorSecondDerivativeSecondOrder = (
  f: (x: number) => number,
  points: number[],
  h: number
): (number | null)[] => {
  const theoreticalError = [];
  const fourthDerivativesValue = derivativeAtPoints(f, points, 4, h, 3);

  for (const x of fourthDerivativesValue) {
    if (x === null) {
      theoreticalError.push(null);
    } else {
      theoreticalError.push(Math.abs((x / 12) * h ** 2));
    }
  }

  return theoreticalError;
};
