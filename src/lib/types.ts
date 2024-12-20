import type { WatchEventType, Stats } from 'node:fs';
import type { EggApplicationCore, EggAppConfig } from 'egg';
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

export interface EggWatcherApplicationCore extends EggApplicationCore {
  watcher: Watcher;
}

export type EggWatcherAppConfig = EggAppConfig & WatcherConfig;
