# Deck Builder App
​
**Authors**: Brandon Johnson, Shingo Nakajima, Peter Cole  
**Version**: 3.2.0 Functional CRUD
​
## Overview
Using the Skryfall API, query a deck building app that allows the tracking of desired and acquired cards.
​
## Getting Started
Modern browser with internet connection
​
## Architecture
HTML, SMACSS, JS, JQUERY, AJAX, SQL, POSTMAN, HEROKU, EXPRESS, DOTENV, POSTGRES (PG), EJS, NODEMON, METHOD-OVERRIDE
​
## Change Log
Number and name of feature: Day 1 - User stories, repository set up, file structure, wireframing, proof of life  
​
Estimate of time needed to complete: 4 hours  
​
Start time: 9am  
​
Finish time: 1:30pm  
​
Actual time needed to complete: 4.5 hours
​
- 12-26-2019 9:00am - Repo set up
- 12-26-2019 1:19pm - Proof of life functional, deployed on Heroku
​
---
​
Number and name of feature: Day 1 - About Us page  
​
Estimate of time needed to complete: 2hrs  
​
Start time: 12pm  
​
Finish time: 3pm  
​
Actual time needed to complete: 3hrs
​
- 12-26-2019 9:00am - About Us functional, live on Heroku
​
---
​
Number and name of feature: Day 2 - Results Page Render  
​
Estimate of time needed to complete: 3hrs  
​
Start time: 9:30am  
​
Finish time: 1:30pm  
​
Actual time needed to complete: 4hrs
​
- 12-27-2019 1:53am - Results page functional, live on Heroku
​
---

Number and name of feature: Day 2 - Collection Page Render  
​
Estimate of time needed to complete: 3hrs  
​
Start time: 1:30pm  
​
Finish time: 4:09pm  
​
Actual time needed to complete: 2.5hrs
​
- 12-27-2019 4:10pm - Collection page functional, live on Heroku

---

Number and name of feature: Day 2 - Wishlist Page Render  
​
Estimate of time needed to complete: 30min  
​
Start time: 4:10pm  
​
Finish time: 4:41pm  
​
Actual time needed to complete: 30min
​
- 12-27-2019 4:42pm - Wishlist page functional, live on Heroku

---
​
Number and name of feature: Day 3 - CSS design  
​
Estimate of time needed to complete: 4hrs  
​
Start time: 9:00am  
​
Finish time: ____  
​
Actual time needed to complete: ____
​
- 12-28-2019 4:40pm - Content placed in frames, updated naming conventions
- 12-29-2019 9:55am - Added Magic Font, fixed buttons
- 12-30-2019 10:30am - SMACCSified style.css into base, layout, module

---

Number and name of feature: Day 3 - Update & Delete Methods  
​
Estimate of time needed to complete: 2hrs  
​
Start time: 10:11am  
​
Finish time: 11:47am  
​
Actual time needed to complete: 1.5hrs
​ 
- 12-30-2019 11:07am - Update button functional
- 12-30-2019 11:47am - Delete card button functional
- 12-30-2019 3:59pm - Delete collection or wishlist functional
- 12-30-2019 ~5pm - Delete functionality improved, updated naming conventions

---

Number and name of feature: Day 3 - Soft Search with Drop Down Menu  
​
Estimate of time needed to complete: 3hrs  
​
Start time: 5pm 
​
Finish time: ____  
​
Actual time needed to complete: ____  
​
## Credits and Collaborations
Brandon Johnson, Shingo Nakajima, Peter Cole, CodeFellows 301  
CSS buttons inspired from https://www.w3schools.com/csS/css3_buttons.asp
​
## Links
* Trello: https://trello.com/b/0b6nE6fw/deck-builder
​
* Heroku: https://deck-builder-301-final.herokuapp.com
​
## User Stories
1. As a dev I want the user to search for cards so that they can expand their collection
  * Link to the API
  * Can search database
  * Will present data
​
2. As a user I want to save my cards
  * Present data
  * Drop down menu that lets user choose "Collection" and "Wish List"
  * Save to database
​
3. As a user I want to see my cards
  * Load data
  * Show cards on different pages
  * Show info on each card
​
4. As a user I want to update my cards
  * Load data on "Collection" and "Wish List"
  * Change or update "Collection" and "Wish List"
  * Present new data
​
5. As a user I want to remove cards
  * Load data
  * Present user with button for deleting individually
  * Remove selected card
  * Update database

## Sample of Data Schema
```sql
id SERIAL PRIMARY KEY,
name VARCHAR(255),
date VARCHAR(255),
image_url TEXT,
legal0 VARCHAR(255),
legal1 VARCHAR(255),
legal2 VARCHAR(255),
legal3 VARCHAR(255),
legal4 VARCHAR(255),
tag VARCHAR(255);
```

## Wireframes
#### Database Entity Relationship
![Database Entity Relationship](https://github.com/SplinterCel3000/deck_builder/blob/master/assets/db-entity-rel.jpg)
​
#### Domain Model
![Domain Model](https://github.com/SplinterCel3000/deck_builder/blob/master/assets/domain-model.jpg)
​
#### Wireframe - Deck Builder
![Deck Builder](https://github.com/SplinterCel3000/deck_builder/blob/master/assets/wf-1.jpg)
​
#### Wireframe - Results
![Results](https://github.com/SplinterCel3000/deck_builder/blob/master/assets/wf-2.jpg)
​
#### Wireframe - Collection
![Collection](https://github.com/SplinterCel3000/deck_builder/blob/master/assets/wf-3.jpg)
​
#### Wireframe - Wish List
![Wishlist](https://github.com/SplinterCel3000/deck_builder/blob/master/assets/wf-4.jpg)
​