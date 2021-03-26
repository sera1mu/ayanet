import { Client } from 'discord.js';
import { PingCommand } from '../commands/PingCommand';
import { CommandStore } from '../structures/CommandStore';

export const registerCommands = function registerCommandsToCommandStore(
  store: CommandStore,
  client: Client
): CommandStore {
  store.addCommand(new PingCommand(client));
  return store;
};
