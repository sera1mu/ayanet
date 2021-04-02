/**
 * Initialization SQL
 */
-- Create channel table
CREATE TABLE IF NOT EXISTS channels(
  id VARCHAR(10) NOT NULL PRIMARY KEY,
  description VARCHAR(50),
  created_at DATETIME NOT NULL,
  always BOOLEAN NOT NULL,
  author_id VARCHAR(18) NOT NULL,
  private BOOLEAN NOT NULL
);

-- Create connected_hooks table
CREATE TABLE IF NOT EXISTS connected_hooks(
  webhook_url VARCHAR(200) NOT NULL PRIMARY KEY,
  connected_at DATETIME NOT NULL,
  connected_by VARCHAR(18) NOT NULL,
  guild_id VARCHAR(18) NOT NULL,
  connected_channel_id VARCHAR(18) NOT NULL,
  global_channel_id VARCHAR(10) NOT NULL,
  INDEX connected_hooks_index(global_channel_id),
  FOREIGN key channels(id)
);

-- Create message table
CREATE TABLE IF NOT EXISTS messages(
  id VARCHAR(18) NOT NULL PRIMARY KEY,
  channel_id VARCHAR(10) NOT NULL,
  added_at DATETIME NOT NULL,
  author_id VARCHAR(18) NOT NULL,
  content JSON NOT NULL,
  CHECK(JSON_VALID(content)),
  INDEX messages_index(channel_id),
  FOREIGN key channels(id)
);
