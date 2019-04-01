# BeerProject

This project was made with node.js, express.js, joi and socket.io, and it delivers a sistem that helps to control the temperature of beer containers in transport.

## Run the project 

Before we start, make sure you have node and npm installed in your environment, and than run `npm install` to install all the dependencies this project has

Run `npm run start` to run the project, then you can acess `http://localhost:3000/index` to monitore the temperature of the beer containers
To send the data to the server, you will need to send HTTP requests, to post the Beers, Trucks and Containers that you have. But don't worry, inside the project you will find a Postman collection to help you, and a file named `data.json` with some examples.
Once you have some data on the server, you can change the temperature of the containers making and HTTP request as well, you will find it in the postman collection too. When you change the temperature, go to the index page and see what happends!


## Running tests

Run `npm run test` to execute the tests

# What are the highlights of your logic/code writing style?

This project was made with node and socket.io, and was made with simplicity, clarity and clean code best practices


# What could have been done in a better way? What would you do in version 2.0?

The front end was made with pure html, I would made a better front end solution, perhaps with Angular or React. The separation of the fron end of the back end will be the first thing to modify.
Add and database to store the data, add more validations, on the business rules and on the entities will also be part of the version 2.0

# What were the questions you would ask and your own answers/assumptions?

There will be the need to monitore more than onde truck at the time? A: There's only one truck, but the sistems supports more trucks, but for that, the front end must be modified
There's the need to push the alert notification? In this version, no.

# Any other notes you feel relevant for the evaluation of your solution.
The solution for the real time display of the temperature is the most simple, it could be used an AWS solution, like SQS. It's kind of complicated to configure, but can be used in the data entry, for changing the temperature, and for push the alert. 
Even simple, the socket.io does his job, and for this project was the simples solution i've found. And he integrates ver easy with node.js
