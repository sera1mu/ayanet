import log4js from 'log4js';
import boot from './boot';

const logger = log4js.getLogger();

(async () => {
  await boot();
})().catch((err) => {
  logger.error(`Failed to boot: ${String(err)}`);
});
