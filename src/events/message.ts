import { Message } from 'discord.js';
import { getLogger } from 'log4js';
import { Config } from '../structures/Config';
import { CommandStore } from '../structures/CommandStore';

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
  logger.level = config.logLevel;
  // Ignore when the message author was bot
  if (!message.author.bot && message.content.startsWith(config.prefix)) {
    const parsedMessage = message.content.replace(config.prefix, '').split(' ');
    try {
      const command = store.getCommand(parsedMessage[0]);
      if (typeof command.run !== 'undefined') {
        await command.run(
          store.getAllCommands(),
          message,
          parsedMessage.slice(1)
        );
      }
    } catch (err) {
      logger.error(err);
    }
  }
};
