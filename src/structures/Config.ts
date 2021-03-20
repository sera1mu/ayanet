import fs from 'fs';
import path from 'path';
import toml from 'toml';

type LogLevel = 'trace' | 'debug' | 'info' | 'warn' | 'error' | 'fatal';

interface IConfig {
  /**
   * The bot token
   */
  token: string;

  /**
   * The logger level
   */
  logLevel: LogLevel;

  /**
   * The bot pre
   */
  prefix: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isConfig = (value: any): value is IConfig =>
  typeof value.token === 'string' &&
  typeof value.logLevel === 'string' &&
  typeof value.prefix === 'string';

/**
 * The configuration class
 */
export default class Config implements IConfig {
  /**
   * The file path of the config
   */
  filePath: string;

  token: string;

  logLevel: LogLevel;

  prefix: string;

  constructor(filePath: string) {
    this.filePath = path.join(process.cwd(), filePath);
    ({
      token: this.token,
      logLevel: this.logLevel,
      prefix: this.prefix,
    } = Config.parseConfig(
      fs.readFileSync(this.filePath, { encoding: 'utf-8' })
    ));
  }

  private static parseConfig(config: string): IConfig {
    const parsedConfig = toml.parse(config);
    if (!isConfig(parsedConfig)) {
      throw new Error('The config is incorrect.');
    }
    return parsedConfig;
  }
}
