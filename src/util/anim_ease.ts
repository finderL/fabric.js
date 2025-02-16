import { twoMathPi, halfPI } from "../constants";

type TEasingFunction = (
  currentTime: number,
  startValue: number,
  byValue: number,
  duration: number) => number;

/**
 * Easing functions
 * See <a href="http://gizma.com/easing/">Easing Equations by Robert Penner</a>
 * @namespace fabric.util.ease
 */

const normalize = (a: number, c: number, p: number, s: number) => {
  if (a < Math.abs(c)) {
    a = c;
    s = p / 4;
  }
  else {
    //handle the 0/0 case:
    if (c === 0 && a === 0) {
      s = p / twoMathPi * Math.asin(1);
    }
    else {
      s = p / twoMathPi * Math.asin(c / a);
    }
  }
  return { a, c, p, s };
}

const elastic = (a: number, s: number, p: number, t: number, d: number): number => a *
    Math.pow(2, 10 * (t -= 1)) *
    Math.sin((t * d - s) * twoMathPi / p);

/**
 * Cubic easing out
 * @memberOf fabric.util.ease
 */
export const easeOutCubic:TEasingFunction = (t, b, c, d) => c * ((t /= d - 1) * t ** 2 + 1) + b;

/**
 * Cubic easing in and out
 * @memberOf fabric.util.ease
 */
export const easeInOutCubic:TEasingFunction = (t, b, c, d) => {
  t /= d / 2;
  if (t < 1) {
    return c / 2 * t ** 3 + b;
  }
  return c / 2 * ((t -= 2) * t ** 2 + 2) + b;
}

/**
 * Quartic easing in
 * @memberOf fabric.util.ease
 */
export const easeInQuart:TEasingFunction = (t, b, c, d) => c * (t /= d) * t ** 3 + b;

/**
 * Quartic easing out
 * @memberOf fabric.util.ease
 */
export const easeOutQuart:TEasingFunction = (t, b, c, d) => -c * ((t = t / d - 1) * t ** 3 - 1) + b;

/**
 * Quartic easing in and out
 * @memberOf fabric.util.ease
 */
export const easeInOutQuart:TEasingFunction = (t, b, c, d) => {
  t /= d / 2;
  if (t < 1) {
    return c / 2 * t ** 4 + b;
  }
  return -c / 2 * ((t -= 2) * t ** 3 - 2) + b;
}

/**
 * Quintic easing in
 * @memberOf fabric.util.ease
 */
export const easeInQuint:TEasingFunction = (t, b, c, d) => c * (t /= d) * t ** 4 + b;

/**
 * Quintic easing out
 * @memberOf fabric.util.ease
 */
export const easeOutQuint:TEasingFunction = (t, b, c, d) => c * ((t /= d - 1) * t ** 4 + 1) + b;

/**
 * Quintic easing in and out
 * @memberOf fabric.util.ease
 */
export const easeInOutQuint:TEasingFunction = (t, b, c, d) => {
  t /= d / 2;
  if (t < 1) {
    return c / 2 * t ** 5 + b;
  }
  return c / 2 * ((t -= 2) * t ** 4 + 2) + b;
}

/**
 * Sinusoidal easing in
 * @memberOf fabric.util.ease
 */
export const easeInSine:TEasingFunction = (t, b, c, d) => -c * Math.cos(t / d * halfPI) + c + b;

/**
 * Sinusoidal easing out
 * @memberOf fabric.util.ease
 */
export const easeOutSine:TEasingFunction = (t, b, c, d) => c * Math.sin(t / d * halfPI) + b;

/**
 * Sinusoidal easing in and out
 * @memberOf fabric.util.ease
 */
export const easeInOutSine:TEasingFunction = (t, b, c, d) => -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;

/**
 * Exponential easing in
 * @memberOf fabric.util.ease
 */
export const easeInExpo:TEasingFunction = (t, b, c, d) => (t === 0) ? b : c * 2 ** (10 * (t / d - 1)) + b;

/**
 * Exponential easing out
 * @memberOf fabric.util.ease
 */
export const easeOutExpo:TEasingFunction = (t, b, c, d) => (t === d) ? b + c : c * -(2 ** (-10 * t / d) + 1) + b;

/**
 * Exponential easing in and out
 * @memberOf fabric.util.ease
 */
export const easeInOutExpo:TEasingFunction = (t, b, c, d) => {
  if (t === 0) {
    return b;
  }
  if (t === d) {
    return b + c;
  }
  t /= d / 2;
  if (t < 1) {
    return c / 2 * 2 ** (10 * (t - 1)) + b;
  }
  return c / 2 * -(2 ** (-10 * --t) + 2) + b;
}

/**
 * Circular easing in
 * @memberOf fabric.util.ease
 */
export const easeInCirc:TEasingFunction = (t, b, c, d) => -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;

/**
 * Circular easing out
 * @memberOf fabric.util.ease
 */
export const easeOutCirc:TEasingFunction = (t, b, c, d) => c * Math.sqrt(1 - (t = t / d - 1) * t) + b;

/**
 * Circular easing in and out
 * @memberOf fabric.util.ease
 */
export const easeInOutCirc:TEasingFunction = (t, b, c, d) => {
  t /= d / 2;
  if (t < 1) {
    return -c / 2 * (Math.sqrt(1 - t ** 2) - 1) + b;
  }
  return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
}

/**
 * Elastic easing in
 * @memberOf fabric.util.ease
 */
export const easeInElastic:TEasingFunction = (t, b, c, d) => {
  const s = 1.70158, a = c;
  let p = 0;
  if (t === 0) {
    return b;
  }
  t /= d;
  if (t === 1) {
    return b + c;
  }
  if (!p) {
    p = d * 0.3;
  }
  const { a: normA, s: normS, p: normP } = normalize(a, c, p, s);
  return -elastic(normA, normS, normP, t, d) + b;
}

/**
 * Elastic easing out
 * @memberOf fabric.util.ease
 */
export const easeOutElastic:TEasingFunction = (t, b, c, d) => {
  const s = 1.70158, a = c;
  let p = 0;
  if (t === 0) {
    return b;
  }
  t /= d;
  if (t === 1) {
    return b + c;
  }
  if (!p) {
    p = d * 0.3;
  }
  const { a: normA, s: normS, p: normP, c: normC } = normalize(a, c, p, s);
  return normA * 2 ** (-10 * t) * Math.sin((t * d - normS) * (twoMathPi) / normP ) + normC + b;
}

/**
 * Elastic easing in and out
 * @memberOf fabric.util.ease
 */
export const easeInOutElastic:TEasingFunction = (t, b, c, d) => {
  const s = 1.70158, a = c;
  let p = 0;
  if (t === 0) {
    return b;
  }
  t /= d / 2;
  if (t === 2) {
    return b + c;
  }
  if (!p) {
    p = d * (0.3 * 1.5);
  }
  const { a: normA, s: normS, p: normP, c: normC } = normalize(a, c, p, s);
  if (t < 1) {
    return -0.5 * elastic(normA, normS, normP, t, d) + b;
  }
  return normA * Math.pow(2, -10 * (t -= 1)) *
    Math.sin((t * d - normS) * (twoMathPi) / normP ) * 0.5 + normC + b;
}

/**
 * Backwards easing in
 * @memberOf fabric.util.ease
 */
export const easeInBack:TEasingFunction = (t, b, c, d, s = 1.70158) => c * (t /= d) * t * ((s + 1) * t - s) + b;

/**
 * Backwards easing out
 * @memberOf fabric.util.ease
 */
export const easeOutBack:TEasingFunction = (t, b, c, d, s = 1.70158) => c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;

/**
 * Backwards easing in and out
 * @memberOf fabric.util.ease
 */
export const easeInOutBack:TEasingFunction = (t, b, c, d, s = 1.70158) => {
  t /= d / 2;
  if (t < 1) {
    return c / 2 * (t * t * (((s *= (1.525)) + 1) * t - s)) + b;
  }
  return c / 2 * ((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2) + b;
}

/**
 * Bouncing easing out
 * @memberOf fabric.util.ease
 */
export const easeOutBounce:TEasingFunction = (t, b, c, d) => {
  if ((t /= d) < (1 / 2.75)) {
    return c * (7.5625 * t * t) + b;
  }
  else if (t < (2 / 2.75)) {
    return c * (7.5625 * (t -= (1.5 / 2.75)) * t + 0.75) + b;
  }
  else if (t < (2.5 / 2.75)) {
    return c * (7.5625 * (t -= (2.25 / 2.75)) * t + 0.9375) + b;
  }
  else {
    return c * (7.5625 * (t -= (2.625 / 2.75)) * t + 0.984375) + b;
  }
}

/**
 * Bouncing easing in
 * @memberOf fabric.util.ease
 */
 export const easeInBounce:TEasingFunction = (t, b, c, d) => c - easeOutBounce(d - t, 0, c, d) + b;

/**
 * Bouncing easing in and out
 * @memberOf fabric.util.ease
 */
export const easeInOutBounce:TEasingFunction = (t, b, c, d) =>
  t < d / 2 ?
  easeInBounce(t * 2, 0, c, d) * 0.5 + b :
  easeOutBounce(t * 2 - d, 0, c, d) * 0.5 + c * 0.5 + b;


/**
 * Quadratic easing in
 * @memberOf fabric.util.ease
 */
export const easeInQuad:TEasingFunction = (t, b, c, d) => c * (t /= d) * t + b;

/**
 * Quadratic easing out
 * @memberOf fabric.util.ease
 */
export const easeOutQuad:TEasingFunction = (t, b, c, d) => -c * (t /= d) * (t - 2) + b;

/**
 * Quadratic easing in and out
 * @memberOf fabric.util.ease
 */
export const easeInOutQuad:TEasingFunction = (t, b, c, d) => {
  t /= (d / 2);
  if (t < 1) {
    return c / 2 * t ** 2 + b;
  }
  return -c / 2 * ((--t) * (t - 2) - 1) + b;
};

/**
 * Cubic easing in
 * @memberOf fabric.util.ease
 */
export const easeInCubic:TEasingFunction = (t, b, c, d) => c * (t /= d) * t * t + b;
