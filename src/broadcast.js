import { PassThrough, Writable } from 'stream';
import { generateSessionId } from './utils.js';

class Broadcast extends Writable {
  constructor() {
    super();
    this.subscribers = new Map();
  }

  subscribe() {
    const id = generateSessionId();
    const passthrough = new PassThrough();

    this.subscribers.set(id, passthrough);

    return { id, passthrough };
  }

  subscriberCount() {
    return this.subscribers.size;
  }

  unsubscribe(id) {
    this.subscribers.delete(id);
  }

  write(chunk, encoding, callback) {
    for (const passthrough of this.subscribers.values()) {
      passthrough.write(chunk);
    }
  }
}

export default Broadcast;
