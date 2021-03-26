import { Client } from 'discord.js';
import { HelpCommand } from '../commands/HelpCommand';
import { PingCommand } from '../commands/PingCommand';
import { CommandStore } from '../structures/CommandStore';
import { Config } from '../structures/Config';

export const registerCommands = function registerCommandsToCommandStore(
  store: CommandStore,
  client: Client,
  config: Config
): CommandStore {
  store.addCommand(new PingCommand(client), new HelpCommand(store, config));
  return store;
};
