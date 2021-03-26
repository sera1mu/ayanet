import { Message } from 'discord.js';

/**
 * Generate detailed log for message event
 * @returns { string } Guild={guildId} Channel={channelId} User={userId}: {message}
 */
export const generateMessageEventLog = function generateMessageEventDetailedLog(
  message: Message,
  content: string
): string {
  return `Guild=${message.guild?.id || 'unknown'} Channel=${
    message.channel.id || 'unknown'
  } User=${message.author.id}: ${content}`;
};
