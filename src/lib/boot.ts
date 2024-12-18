import type { Application, Agent, ILifecycleBoot } from 'egg';
import { Watcher } from './watcher.js';

export class Boot implements ILifecycleBoot {
  #app: Application | Agent;
  #watcher: Watcher;

  constructor(appOrAgent: Application | Agent) {
    this.#app = appOrAgent;
    this.#watcher = this.#app.watcher = this.#app.cluster(Watcher, {})
      .delegate('watch', 'subscribe')
      .create(appOrAgent.config)
      .on('info', (msg: string, ...args: any[]) => this.#app.coreLogger.info(msg, ...args))
      .on('warn', (msg: string, ...args: any[]) => this.#app.coreLogger.warn(msg, ...args))
      .on('error', (msg: string, ...args: any[]) => this.#app.coreLogger.error(msg, ...args));
  }

  async didLoad(): Promise<void> {
    await this.#watcher.ready();
    this.#app.coreLogger.info('[@eggjs/watcher:%s] watcher start success', this.#app.type);
  }
}
