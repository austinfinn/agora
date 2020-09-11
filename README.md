# Overview
Agora is a simple, but powerful, aggregation service

It's a simple tool that unlocks all your data sources to simplify creating, finding and managing test data. Bring your Google sheets, MySQL/Postgres databases, Wiki pages and existing API endpoints together in different combinations to create a bespoke service that can help alleviate some/all of your data bottlenecks. A single Swagger page makes it easy for everybody on your Product team to create and find the test data they need.

You can play around with a hosted version [HERE](http://agora-data-aggregation.herokuapp.com/v1/docs/#/users/create). If you want to

# Prerequisites
- Ensure you have the below tools installed on your machine 
        
        Docker 
        NodeJS 10+

## Docker Setup
- Firstly you will need to create your own Google Sheets. Setup instructions are [here](https://theoephraim.github.io/node-google-spreadsheet/#/getting-started/authentication)

- Then copy the GOOGLE_SERVICE_ACCOUNT_EMAIL, GOOGLE_PRIVATE_KEY and GOOGLE_SHEET_ID details from the previous step to the docker-compose.yml file

- Open your Terminal and check Docker is running

        docker ps
- Start up the application

        docker-compose up

- Now launch the application in your browser by going to http://localhost:4002/v1/docs/