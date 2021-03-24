import { Client, ClientOptions } from 'discord.js';
import { CommandStore } from './CommandStore';

export class AyanetClient extends Client {
  commandStore: CommandStore;

  constructor(options?: ClientOptions) {
    super(options);
    this.commandStore = new CommandStore();
  }
}
