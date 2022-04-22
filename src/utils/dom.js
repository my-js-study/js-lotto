import { ERROR_MESSAGE } from '../constants.js';

export function $(selector, scope = document) {
  if (!selector) throw new Error(ERROR_MESSAGE.NO_SELECTOR);

  const result = scope.querySelector(selector);

  if (!result) throw new Error(ERROR_MESSAGE.NO_SELECTOR);

  return result;
}

export function $$(selector, scope = document) {
  if (!selector) throw new Error(ERROR_MESSAGE.NO_SELECTOR);

  const result = scope.querySelectorAll(selector);

  if (!result) throw new Error(ERROR_MESSAGE.NO_SELECTOR);

  return Array.from(result);
}

export function emit(target, eventName, detail) {
  const event = new CustomEvent(eventName, { detail });
  target.dispatchEvent(event);
}

export const setDisplay = (target, display) => {
  if (!target) throw new Error(ERROR_MESSAGE.NO_SELECTOR);

  target.style.display = display;
};
