/**
 * Add new message to messages table
 */
INSERT INTO
  messages
VALUES
  /**
   * id: VARCHAR(18),
   * channel_id: VARCHAR(10),
   * added_at: DATETIME,
   * author_id: VARCHAR(18),
   * content: JSON
   */
  (?, ?, ?, ?, ?);
