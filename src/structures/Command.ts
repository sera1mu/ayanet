import { Message } from 'discord.js';

export interface CommandOptions {
  /**
   * Command name
   */
  readonly name: string;

  /**
   * Command aliases
   */
  readonly aliases: string[];

  /**
   * Command description
   * @example Repeats specified message
   */
  readonly description: string;

  /**
   * Command usage (**Don't add prefix. The command will adds it automatically.**)
   * @example repeat [message] [COUNT]
   */
  readonly usage: string;

  /**
   * Whether to allow only administrators to use the command.
   * **(NOT IMPLEMENTED)**
   */
  readonly onlyAdmin: boolean;
}

/**
 * Command class
 */
export class Command implements CommandOptions {
  readonly name: string;

  readonly aliases: string[] = [];

  readonly description: string;

  readonly usage: string;

  readonly onlyAdmin: boolean;

  /**
   * @param { CommandOptions } options
   */
  constructor(options: CommandOptions) {
    ({
      name: this.name,
      aliases: this.aliases,
      description: this.description,
      usage: this.usage,
      onlyAdmin: this.onlyAdmin,
    } = options);
  }

  /**
   * Run the command
   * @param message Message event
   * @param params Command params
   */
  run?(
    message: Message,
    params: string[],
    commands: Record<string, this>
  ): Promise<void>;
}
