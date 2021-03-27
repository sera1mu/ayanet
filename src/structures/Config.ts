/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import fs from 'fs';
import path from 'path';
import toml from 'toml';

type LogLevel = 'trace' | 'debug' | 'info' | 'warn' | 'error' | 'fatal';

/**
 * Database configuration
 */
export interface DatabaseConfig {
  /**
   * Database hostname
   */
  host: string;

  /**
   * Database port (Default value: 3306)
   */
  port?: number;

  /**
   * Database name
   */
  database: string;

  /**
   * Database user
   */
  user: string;

  /**
   * Database password
   */
  password: string;
}

interface IConfig {
  /**
   * The bot token
   */
  token: string;

  /**
   * The bot prefix
   */
  prefix: string;

  /**
   * Logger levels
   */
  logLevels: Record<'default' | 'boot' | 'message' | 'database', LogLevel>;

  /**
   * Database configuration
   */
  database: DatabaseConfig;
}

const isLogLevel = (value: string): value is LogLevel =>
  value === 'trace' ||
  value === 'debug' ||
  value === 'info' ||
  value === 'warn' ||
  value === 'error' ||
  value === 'fatal';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isConfig = (value: any): value is IConfig =>
  typeof value.token === 'string' &&
  typeof value.prefix === 'string' &&
  isLogLevel(value.logLevels.default) &&
  isLogLevel(value.logLevels.boot) &&
  isLogLevel(value.logLevels.message);

/**
 * The configuration class
 */
export class Config implements IConfig {
  /**
   * The file path of the config
   */
  filePath: string;

  token: string;

  prefix: string;

  logLevels: Record<'default' | 'boot' | 'message' | 'database', LogLevel>;

  database: DatabaseConfig;

  constructor(filePath: string) {
    this.filePath = path.join(process.cwd(), filePath);
    ({
      token: this.token,
      prefix: this.prefix,
      logLevels: this.logLevels,
      database: this.database,
    } = Config.parseConfig(
      fs.readFileSync(this.filePath, { encoding: 'utf-8' })
    ));
  }

  private static parseConfig(config: string): IConfig {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const parsedConfig = toml.parse(config);
    if (!isConfig(parsedConfig)) {
      throw new Error('The config is incorrect.');
    }
    return parsedConfig;
  }
}
