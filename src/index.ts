import { getLogger } from 'log4js';
import { boot } from './boot';
import { Config } from './structures/Config';

if (typeof process.env.CONFIG_PATH === 'undefined') {
  throw new Error('Not specified CONFIG_PATH in environment variables.');
}
// Load config
const config = new Config(process.env.CONFIG_PATH);

const logger = getLogger();
logger.level = config.logLevel;

boot(config).catch((err) => {
  logger.error(`Failed to boot: ${String(err)}`);
});
