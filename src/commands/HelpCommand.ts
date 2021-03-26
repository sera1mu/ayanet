import { Message, MessageEmbed } from 'discord.js';
import { Command } from '../structures/Command';
import { CommandStore } from '../structures/CommandStore';
import { Config } from '../structures/Config';
import { VERSION } from '../util/constants';

export class HelpCommand extends Command {
  private commandStore: CommandStore;

  private config: Config;

  constructor(commandStore: CommandStore, config: Config) {
    super({
      name: 'help',
      description: 'ヘルプをDMに送信します。',
      usage: 'help',
      onlyAdmin: false,
    });
    this.commandStore = commandStore;
    this.config = config;
  }

  async run(message: Message): Promise<void> {
    const commands = this.commandStore.getAllCommands();
    const helpMessage = new MessageEmbed().setTitle(
      `Ayanet v${VERSION} - Help`
    );

    for (const [name, command] of Object.entries(commands)) {
      helpMessage.addField(`${this.config.prefix}${name}`, command.description);
    }

    await message.author.send(helpMessage);

    await message.channel.send(
      ':inbox_tray: ヘルプをあなたのDMに送信しました。'
    );
  }
}
