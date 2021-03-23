import { Client } from 'discord.js';
import { Logger } from 'log4js';
import { VERSION } from '../util/constants';

/**
 * Client ready event
 */
export const onReady = function clientOnReadyEvent(
  client: Client,
  logger: Logger
): void {
  // Set status
  (async () => {
    await client.user?.setPresence({
      activity: {
        type: 'PLAYING',
        name: `v${VERSION}`,
      },
    });
  })()
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
