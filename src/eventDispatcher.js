export class EventDispatcher {
  constructor() {
    this.handlers = new Map();
  }

  on(event, handler) {
    if (!this.handlers.has(event)) {
      this.handlers.set(event, []);
    }
    this.handlers.get(event).push(handler);
  }

  async dispatch(event, payload) {
    const list = this.handlers.get(event) || [];
    const results = [];
    for (const handler of list) {
      results.push(await handler(payload));
    }
    return results;
  }
}
