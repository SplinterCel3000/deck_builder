Software Requirements
Vision

What is the vision of this product?
Search magic the gathering database to save and catalog cards.

What pain point does this project solve?
Tracking my progress as I build and collect new decks. This will keep the user organized in a helpful way. 

Why should we care about your product?
Because you might play magic the gathering! And we both know its hard to keep track of all your cards!

Scope (In/Out)
IN - Search an API for magic the gathering card information then present save and catagorize the data. 

Example:
Search the skryAPI for magic card details
Save cards to a database with I want or I have
Display cards based on either catagories above. 
Update the cards with I want or I have over time based on the user collection 
Let users delete cards they dont want anymore
OUT - What will your product not do.
Our website will not be used to store multiple decks. 
Minimum Viable Product vs
What will your MVP functionality be?
 Fully working app that lets a user save cards and keep them for later updating if they have bought them or not. 
What are your stretch goals?

Stretch
Multiple decks 
Multiple users

Functional Requirements
List the functionality of your product.
A user can open the site and search for magic cards that interest them. Then save them based on a criteria of owning or wanting them.
After saving the cards the user should be able to update the status of owned or want to reflect the new collection they have. 
Finally we want users to be able to remove cards that they no longer own or want. 

Data Flow
User enters information 
That goes to an API for the cards
Return the information and save to local database
Then change card details to I want or I have and save to database
Once we change it sends back to the database and updates what they user sees based on selecting I want or I have
Return the updated list of cards.
Let user delete cards 
send new information back to database and return new list

Non-Functional Requirements (301 & 401 only)
Non-functional requirements are requirements that are not directly related to the functionality of the application but still important to the app.

Examples include:

Partials for header , footer, and nav bar. 
These are important to the app but its not required we implement them this way. It will cut down on code and speed up functionality on our app. 

Saving API information to our database. 
We need to make sure we are saving the data from the API to our database to cut down on API calls and user load time. 
