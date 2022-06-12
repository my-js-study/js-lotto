import { emit } from '../utils/dom.js';

export default class View {
  constructor(element) {
    this.element = element;

    this.originalDisplay = this.element.style.display || '';
  }

  hide() {
    this.element.style.display = 'none';
    return this;
  }

  show() {
    this.element.style.display = this.originalDisplay;
    return this;
  }

  emit(eventName, data = {}) {
    emit(this.element, eventName, data);
    return this;
  }

  addEventListener(eventName, handler) {
    this.element.addEventListener(eventName, handler);
  }
}
