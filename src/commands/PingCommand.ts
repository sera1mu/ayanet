import { Client, Message } from 'discord.js';
import { Command } from '../structures/Command';

export class PingCommand extends Command {
  private client: Client;

  constructor(client: Client) {
    super({
      name: 'ping',
      description: 'BotのPing値を返します。',
      usage: 'help',
      onlyAdmin: false,
    });
    this.client = client;
  }

  async run(message: Message): Promise<void> {
    await message.channel.send(
      `ポン! \`${Math.round(this.client.ws.ping)}ms\``
    );
  }
}
