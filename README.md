# Overview
Bring all your data sources together under into a single service. This tool aggregates data from the below locations to simplify the process of creating, finding and managing test data
- Google sheets 
- MySQL databases 
- Wiki pages 
- existing API endpoints 


# Prerequisites
- Ensure you have the below tools installed on your machine 
        
        Docker 
        NodeJS 10+

## Docker Setup
- Open your Terminal and check Docker is running

        docker ps

- Now build the app (this may take a few minutes)

        docker-compose build

- Start up the application

        docker-compose up

- Now launch the application in your browser by going to http://localhost:4002/v1/docs/