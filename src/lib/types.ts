import type { WatchEventType, Stats } from 'node:fs';
import type { Watcher } from './watcher.js';

export interface WatcherConfig {
  watcher: {
    type: string;
    eventSources: Record<string, string>;
  };
  [key: string]: Record<string, any>;
}

export interface ChangeInfo {
  event: WatchEventType;
  /**
   * file stat if path exists
   */
  stat?: Stats;
  path: string;
}

declare module 'egg' {
  export interface EggWatcherAgent {
    watcher: Watcher;
  }
  export interface Agent extends EggWatcherAgent {}

  export interface EggWatcherApplication {
    watcher: Watcher;
  }
  export interface Application extends EggWatcherApplication {}

  export interface EggWatcherAppConfig extends WatcherConfig {}

  export interface EggAppConfig extends EggWatcherAppConfig {}
}
