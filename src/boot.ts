/* eslint-disable no-console */

import { Client } from 'discord.js';
import { getLogger } from 'log4js';
import { Config } from './structures/Config';
import { VERSION } from './util/constants';
import { onReady } from './events/ready';
import { onMessage } from './events/message';
import { CommandStore } from './structures/CommandStore';

/**
 * Boot system
 * @returns { Discord.Client } Logged client
 */
export const boot = async function bootSystem(config: Config): Promise<Client> {
  process.title = 'Ayanet';

  // Show ASCII art
  console.log('                                 _   ');
  console.log('     /\\                         | |  ');
  console.log('    /  \\  _   _  __ _ _ __   ___| |_ ');
  console.log("   / /\\ \\| | | |/ _` | '_ \\ / _ \\ __|");
  console.log('  / ____ \\ |_| | (_| | | | |  __/ |_ ');
  console.log(' /_/    \\_\\__, |\\__,_|_| |_|\\___|\\__|');
  console.log('          __/ |                     ');
  console.log(`          |___/                      v${VERSION}\n`);

  const logger = getLogger('boot');
  logger.level = config.logLevel;

  logger.info('Starting server...');

  const client = new Client();
  const store = new CommandStore();

  // Events
  client.on('ready', () => onReady(client, logger));
  client.on('message', (message) => {
    onMessage(store, config, message).catch((err) => logger.error(err));
  });

  // Login client
  await client.login(config.token);

  return client;
};
