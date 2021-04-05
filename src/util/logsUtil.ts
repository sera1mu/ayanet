/**
 * Generate detailed log for message event
 * @param guildId Guild ID
 * @param channelId Channel ID
 * @param userId Message author ID
 * @returns Guild={guildId} Channel={channelId} User={userId}: {message}
 */
export const generateMessageEventLog = function generateMessageEventDetailedLog(
  guildId: string,
  channelId: string,
  userId: string,
  content: string
): string {
  return `Guild=${guildId} Channel=${channelId} User=${userId}: ${content}`;
};
