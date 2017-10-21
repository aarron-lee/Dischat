# Dischat

This app enables Real-time messaging in online community chatrooms, as well as direct messaging with others.

* System dependencies

Dischat uses ruby on rails for to provide the JSON API, with the frontend being handled by Redux and React.

The  frontend is housed in the /frontend/ directory, which hooks into the static_pages#root html page provided in rails.

* Configuration

To configure this app, run "npm install" and "bundle install" for to install the relevant dependencies.

"npm run webpack" will transpile the javascript files in /frontend/ to /app/assets/javascripts/bundle.js and /app/assets/javascripts/bundle.js.map

Rails will include the bundle.js in the document when the server is running. You can run the server with "rails start".

* Database creation

The DB requires you to have postgresql installed and running.

DB creation is handled by rails via migrations, so you can run "rails db:create" and "rails db:migrate" to reproduce the DB structure. You can also seed the DB with "rails db:seed".
