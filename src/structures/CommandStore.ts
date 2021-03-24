import { Command } from './Command';

export class CommandStore {
  private commands: Record<string, Command>;

  constructor() {
    this.commands = {};
  }

  getCommand(name: string): Command {
    return this.commands[name];
  }

  addCommand(...commands: Command[]): void {
    for (const command of commands) {
      this.commands[command.name] = command;
    }
  }

  removeCommand(...commandNames: string[]): void {
    for (const name of commandNames) {
      delete this.commands[name];
    }
  }
}
