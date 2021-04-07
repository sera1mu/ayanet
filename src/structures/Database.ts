import { Message } from 'discord.js';
import { getLogger, Logger } from 'log4js';
import { createPool, Pool } from 'mariadb';
import { format } from 'sqlstring';
import { generateDatetime } from '../util/misc';
import { Config, DatabaseConfig } from './Config';

/**
 * Database connector
 */
export class Database implements DatabaseConfig {
  host: string;

  port?: number;

  database: string;

  prefix: string;

  user: string;

  password: string;

  /**
   * Database connection pool
   */
  pool: Pool;

  /**
   * Database logger
   */
  logger: Logger;

  /**
   * @constructor
   * @param config Configuration
   */
  constructor(config: Config) {
    ({
      host: this.host,
      port: this.port,
      database: this.database,
      prefix: this.prefix,
      user: this.user,
      password: this.password,
    } = config.database);

    this.logger = getLogger('database');
    this.logger.level = config.logLevels.database;

    // Create connection
    try {
      this.pool = createPool({
        host: this.host,
        port: this.port,
        database: this.database,
        user: this.user,
        password: this.password,
      });
      this.logger.info('The database has been connected.');
    } catch (err) {
      this.logger.error(`Failed to connect to the database: ${String(err)}`);
      throw new Error(`Failed to connect to the database: ${String(err)}`);
    }
  }

  /**
   * Initialize the database
   */
  async init(): Promise<void> {
    const queries = [
      'CREATE TABLE IF NOT EXISTS channels( id VARCHAR(10) NOT NULL PRIMARY KEY, description VARCHAR(50), created_at DATETIME NOT NULL, always BOOLEAN NOT NULL, author_id VARCHAR(18) NOT NULL, private BOOLEAN NOT NULL)',
      'CREATE TABLE IF NOT EXISTS connected_hooks( webhook_url VARCHAR(200) NOT NULL PRIMARY KEY, connected_at DATETIME NOT NULL, guild_id VARCHAR(18) NOT NULL, connected_channel_id VARCHAR(18) NOT NULL, global_channel_id VARCHAR(10) NOT NULL, INDEX connected_hooks_index(global_channel_id), FOREIGN key channels(id))',
      'CREATE TABLE IF NOT EXISTS messages( id VARCHAR(18) NOT NULL PRIMARY KEY, added_at DATETIME NOT NULL, author_id VARCHAR(18) NOT NULL, content JSON NOT NULL, CHECK(JSON_VALID(content))); ',
    ];

    // Run queries
    for await (const query of queries) {
      try {
        await this.runQuery(query);
      } catch (err) {
        const message = `Failed to initialize database: ${String(err)}`;
        this.logger.error(message);
        throw new Error(message);
      }
    }

    this.logger.info('The database has been initialized.');
  }

  /**
   * Create new global chat channel
   * @param id Channel ID (Maximum length: 10)
   * @param description Channel description (Maximum length: 50)
   * @param always Whether or not always active(Can't close)
   * @param authorId Channel author's ID
   * @param private Whether or not visible in public channels list
   */
  async createNewChannel(
    id: string,
    always: boolean,
    authorId: string,
    isPrivate: boolean,
    description?: string
  ): Promise<void> {
    const query = 'INSERT INTO `channels` VALUES (?, ?, ?, ?, ?, ?)';
    const createdAt = generateDatetime(new Date());

    try {
      // Run query
      await this.runQuery(query, [
        id,
        description,
        createdAt,
        always,
        authorId,
        isPrivate,
      ]);
      this.logger.info(`User=${authorId}: ${id} channel has been created.`);
    } catch (err) {
      const message = `Failed to create ${id} channel: ${String(err)}`;
      this.logger.error(`User=${authorId}: ${message}`);
      throw new Error(message);
    }
  }

  /**
   * Add new connected hook to conencted_hooks table
   * @param webhookUrl Webhook URL
   * @param connectedBy Connected user ID
   * @param guildId Guild ID
   * @param connectedChannelId Connected channel ID (Discord)
   * @param globalChannelId Global channel ID (Ayanet)
   */
  async addNewConnectedHook(
    webhookUrl: string,
    connectedBy: string,
    guildId: string,
    connectedChannelId: string,
    globalChannelId: string
  ): Promise<void> {
    const query = 'INSERT INTO channels VALUES (?, ?, ?, ?, ?, ?)';
    const connectedAt = generateDatetime(new Date());

    try {
      // Run query
      await this.runQuery(query, [
        webhookUrl,
        connectedAt,
        connectedBy,
        guildId,
        connectedChannelId,
        globalChannelId,
      ]);
      this.logger.info(`Webhook=${webhookUrl}: Added new connected hook.`);
    } catch (err) {
      const message = `Webhook=${webhookUrl}: Failed to add new connnected hook.`;
      this.logger.error(message);
      throw new Error(message);
    }
  }

  /**
   * Add new message to messages table
   * @param channelId Channel ID (Ayanet)
   * @param message Adding message
   */
  async addNewMessage(channelId: string, message: Message): Promise<void> {
    const query = 'INSERT INTO channels VALUES (?, ?, ?, ?, ?);';
    const addedAt = generateDatetime(message.createdAt);
    const content = JSON.stringify(message.toJSON());

    try {
      // Run query
      await this.runQuery(query, [
        message.id,
        channelId,
        addedAt,
        message.author.id,
        content,
      ]);
    } catch (err) {
      const logMessage = `User=${message.author.id} Channel=${channelId} Message=${message.id}: Added message.`;
      this.logger.error(logMessage);
      throw new Error(logMessage);
    }
  }

  /**
   * Close all database connection
   */
  async close(): Promise<void> {
    try {
      this.logger.info('Closing all database connection...');
      await this.pool.end();
      this.logger.info('Done! The database has been disconnected.');
    } catch (err) {
      const message = `Failed to disconnect from the database: ${String(err)}`;
      this.logger.error(message);
      throw new Error(message);
    }
  }

  /**
   * Run query safely
   * @param query Query
   * @param params Query params
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async runQuery(query: string, params?: any[]): Promise<void> {
    try {
      await this.pool.query(Database.prepareQuery(query, params));
    } catch (err) {
      throw new Error(`Failed to run the query: ${String(err)}`);
    }
  }

  /**
   * Prepare query
   * @param query Query
   * @param params Query params
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static prepareQuery(query: string, params?: any[]): string {
    return format(query, params);
  }
}
