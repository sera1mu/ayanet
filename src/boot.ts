/* eslint-disable no-console */

import Discord from 'discord.js';
import log4js from 'log4js';
import Config from './structures/Config';
import { VERSION } from './util/constants';

export default function boot(): Discord.Client {
  process.title = 'Ayanet';

  console.log('                                 _   ');
  console.log('     /\\                         | |  ');
  console.log('    /  \\  _   _  __ _ _ __   ___| |_ ');
  console.log("   / /\\ \\| | | |/ _` | '_ \\ / _ \\ __|");
  console.log('  / ____ \\ |_| | (_| | | | |  __/ |_ ');
  console.log(' /_/    \\_\\__, |\\__,_|_| |_|\\___|\\__|');
  console.log('          __/ |                     ');
  console.log(`          |___/                      v${VERSION}\n`);

  const config = new Config(process.env.CONFIG_PATH);

  const logger = log4js.getLogger('boot');
  logger.level = config.logLevel;

  logger.info('Starting server...');

  const client = new Discord.Client();
  client.login(config.token);

  client.on('ready', () => {
    client.user?.setPresence({
      activity: {
        type: 'PLAYING',
        name: `v${VERSION}`,
      },
    });
    logger.info('Done!');
    logger.info(`Logged in as @${client.user?.tag} (${client.user?.id})`);
  });

  return client;
}
