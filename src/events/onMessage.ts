import { Message } from 'discord.js';
import { getLogger } from 'log4js';
import { Config } from '../structures/Config';
import { CommandStore } from '../structures/CommandStore';
import { generateMessageEventLog } from '../util/logsUtil';

const logger = getLogger('message');

/**
 * Client message created event.
 * This handles commands.
 */
export const onMessage = async function clientOnMessageCreatedEvent(
  store: CommandStore,
  config: Config,
  message: Message
): Promise<void> {
  logger.level = config.logLevels.message;
  // Ignore when the message author was bot
  if (!message.author.bot && message.content.startsWith(config.prefix)) {
    const parsedMessage = message.content.replace(config.prefix, '').split(' ');
    try {
      const command = store.getCommand(parsedMessage[0]);
      if (typeof command.run !== 'undefined') {
        await command.run(message, parsedMessage.slice(1));
        logger.info(
          generateMessageEventLog(
            message,
            `The ${parsedMessage[0]} command has been executed.`
          )
        );
      }
    } catch (err) {
      logger.error(generateMessageEventLog(message, String(err)));
    }
  }
};
