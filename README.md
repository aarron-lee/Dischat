# Dischat - A Discord Clone

Dischat is a full-stack web application heavily inspired by Discord. It utilizes Ruby on Rails for the backend, a PostgreSQL database, and React+Redux used to manage the frontend.

- Personal note: It's one of my favorite chatting apps, so I thought it would be interesting to try and clone it.

## Overview

Dischat uses ruby on rails for to provide a JSON API, with the frontend being handled by Redux and React.

The  frontend is housed in the ```/frontend``` directory, which hooks into the static_pages#root html page provided in rails.


## Features and Implementation

#### Live Chat

![live chat](https://github.com/aclee91/Dischat/blob/master/documentation/features/live_chat.gif?raw=true)

#### Attach Images to Messages
![upload images](https://github.com/aclee91/Dischat/blob/master/documentation/features/live_chat_images.gif?raw=true)



#### Create Chatrooms
![create chatroom](https://github.com/aclee91/Dischat/blob/master/documentation/features/create_chatroom.gif?raw=true)




#### Create + Edit Channels

![create channels](https://github.com/aclee91/Dischat/blob/master/documentation/features/create%20channel.gif?raw=true)



#### Direct Messaging
![direct messaging](https://github.com/aclee91/Dischat/blob/master/documentation/features/direct_message.gif?raw=true)



#### Update Profile Picture
![update profile picture](https://github.com/aclee91/Dischat/blob/master/documentation/features/update_profile_picture.gif?raw=true)




## Configuration

To configure this app, run ```npm install``` and ```bundle install``` for to install the relevant dependencies.

```npm run build``` will transpile the javascript files in ```/frontend``` to ```/app/assets/javascripts/bundle.js``` and ```/app/assets/javascripts/bundle.js.map```

Rails will include the bundle.js in the document when the server is running. You can run the server with ```rails start```.

All relevant API keys should be placed under ```/config/application.yml```. The Figaro rails gem is used to manage API keys.

[Pusher](http://pusher.com) is used for real-time updates, and AWS is used for to host uploaded images. Pusher config details should be placed under ```config/initializers/pusher.rb```

Paperclip (a rails gem) is used for save/retrieve images to AWS S3 bucket instances. Read the documentation on the rails ```aws-sdk``` gem if you wish to configure your keys properly. Paperclip preloads the aws-information in ```config/application.rb``` file.

## Database creation

The DB requires you to have postgresql installed and running.

DB creation is handled by rails via migrations, so you can run ```rails db:create``` and ```rails db:migrate``` to reproduce the DB structure.
