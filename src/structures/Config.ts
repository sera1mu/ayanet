import fs from 'fs';
import path from 'path';
import toml from 'toml';

interface IConfig {
  /**
   * The bot token
   */
  token: string;

  /**
   * The logger level
   */
  logLevel: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isConfig = (value: any): value is IConfig =>
  typeof value.token === 'string';

export default class Config implements IConfig {
  /**
   * The file path of the config
   */
  filePath: string;

  token: string;

  logLevel: boolean;

  constructor(filePath: string) {
    this.filePath = path.join(process.cwd(), filePath);
    ({ token: this.token, logLevel: this.logLevel } = Config.parseConfig(
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
