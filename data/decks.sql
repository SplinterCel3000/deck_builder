
DROP TABLE IF EXISTS cardtable;
CREATE TABLE IF NOT EXISTS cardtable (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  date VARCHAR(255),
  image_url TEXT,
  legal0 VARCHAR(255),
  legal1 VARCHAR(255),
  legal2 VARCHAR(255),
  legal3 VARCHAR(255),
  legal4 VARCHAR(255),
  tag VARCHAR(255)
);
