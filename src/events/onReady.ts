import { Client } from 'discord.js';
import { Logger } from 'log4js';
import { Config } from '../structures/Config';
import { VERSION } from '../util/constants';

/**
 * Client ready event
 */
export const onReady = function clientOnReadyEvent(
  client: Client,
  config: Config,
  logger: Logger
): void {
  // Set status
  client.user
    ?.setPresence({
      activity: {
        type: 'PLAYING',
        name: `${config.prefix}help | v${VERSION}`,
      },
    })
    .then(() => {
      logger.info('Done!');
      logger.info(
        `Logged in as @${client.user?.tag || 'unknown'} (${
          client.user?.id || 'unknown'
        })`
      );
    })
    .catch((err) => {
      throw new Error(err);
    });
};
