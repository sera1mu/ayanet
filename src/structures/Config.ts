import fs from 'fs';
import path from 'path';
import toml from 'toml';

interface IConfig {
  /**
   * The bot token
   */
  token: string;
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

  constructor(filePath: string) {
    this.filePath = path.join(process.cwd(), filePath);
    this.token = Config.parseConfig(
      fs.readFileSync(this.filePath, { encoding: 'utf-8' })
    ).token;
  }

  private static parseConfig(config: string): IConfig {
    const parsedConfig = toml.parse(config);
    if (!isConfig(parsedConfig)) {
      throw new Error('The config is incorrect.');
    }
    return parsedConfig;
  }
}
