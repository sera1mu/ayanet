import { Command } from './Command';

/**
 * Store of commands
 */
export class CommandStore {
  private commands: Record<string, Command>;

  constructor() {
    this.commands = {};
  }

  /**
   * Get specified command
   * @param name
   * @returns { Command }
   */
  getCommand(name: string): Command {
    const command = this.commands[name];
    if (typeof command !== 'undefined') {
      return command;
    }
    throw new Error(`${name} is not registered command.`);
  }

  /**
   * Get all commands
   * @returns { Record<string, Command> }
   */
  getAllCommands(): Record<string, Command> {
    return this.commands;
  }

  /**
   * Add commands
   * @param { Command[] } commands
   */
  addCommand(...commands: Command[]): void {
    for (const command of commands) {
      this.commands[command.name] = command;
    }
  }

  /**
   * Remove specified commands
   * @param { string[] } commandNames
   */
  removeCommand(...commandNames: string[]): void {
    for (const name of commandNames) {
      delete this.commands[name];
    }
  }
}
