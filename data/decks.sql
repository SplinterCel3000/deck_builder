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

--  DECK: deck VARCHAR(255)
--  TOTAL CARDS: data.total_cards (integer)
--  NAME: data.object.name (string)
--  RELEASE DATE: data.object.released_at (FULLYEAR-MONTH-DAY, 2015-03-27)
--  IMAGE: data.object.image_uris.normal (https string, run cleaner)
--  LEGAL: data.object.legalities.standard (string, 'legal' || 'not_legal')
--  DESCRIPTION: data.object.oracle_text (string, but contains obj literals)

--   "object": "list",
--     "total_cards": 164,  <-- this one
--     "has_more": false,
--     "data": [
--         {
--             "object": "card",   
--             "id": "aa8f58f1-4843-4926-b3c4-98898201c216",
--             "oracle_id": "f4378682-359f-48b0-adb7-b996b8d972db",
--             "multiverse_ids": [
--                 394485
--             ],
--             "mtgo_id": 56142,
--             "mtgo_foil_id": 56143,
--             "tcgplayer_id": 96496,
--             "name": "Acid-Spewer Dragon",  <-- this one
--             "lang": "en",
--             "released_at": "2015-03-27",  <-- this one
--             "uri": "https://api.scryfall.com/cards/aa8f58f1-4843-4926-b3c4-98898201c216",
--             "scryfall_uri": "https://scryfall.com/card/dtk/86/acid-spewer-dragon?utm_source=api",
--             "layout": "normal",
--             "highres_image": true,
--             "image_uris": {
--                 "small": "https://img.scryfall.com/cards/small/front/a/a/aa8f58f1-4843-4926-b3c4-98898201c216.jpg?1562791329",
--                 "normal": "https://img.scryfall.com/cards/normal/front/a/a/aa8f58f1-4843-4926-b3c4-98898201c216.jpg?1562791329",  <-- this one
--                 "large": "https://img.scryfall.com/cards/large/front/a/a/aa8f58f1-4843-4926-b3c4-98898201c216.jpg?1562791329",
--                 "png": "https://img.scryfall.com/cards/png/front/a/a/aa8f58f1-4843-4926-b3c4-98898201c216.png?1562791329",
--                 "art_crop": "https://img.scryfall.com/cards/art_crop/front/a/a/aa8f58f1-4843-4926-b3c4-98898201c216.jpg?1562791329",
--                 "border_crop": "https://img.scryfall.com/cards/border_crop/front/a/a/aa8f58f1-4843-4926-b3c4-98898201c216.jpg?1562791329"
--             },
--             "mana_cost": "{5}{B}",
--             "cmc": 6.0,
--             "type_line": "Creature — Dragon",
--             "oracle_text": "Flying, deathtouch\nMegamorph {5}{B}{B} (You may cast this card face down as a 2/2 creature for {3}. Turn it face up any time for its megamorph cost and put a +1/+1 counter on it.)\nWhen Acid-Spewer Dragon is turned face up, put a +1/+1 counter on each other Dragon creature you control.",
--             "power": "3",
--             "toughness": "3",
--             "colors": [
--                 "B"
--             ],
--             "color_identity": [
--                 "B"
--             ],
--             "legalities": {  <-- this one (stretch goal)
--                 "standard": "not_legal",
--                 "future": "not_legal",
--                 "historic": "not_legal",
--                 "pioneer": "legal",
--                 "modern": "legal",
--                 "legacy": "legal",
--                 "pauper": "not_legal",
--                 "vintage": "legal",
--                 "penny": "legal",
--                 "commander": "legal",
--                 "brawl": "not_legal",
--                 "duel": "legal",
--                 "oldschool": "not_legal"
--             },
