# Prerequisites
- Ensure you have the below tools installed on your machine 
        
        Docker 
        node JS 10+

- Create a .env file in the root directory of this project with the following details

        REDIS_HOST=redis://localhost:6379

        DB_HOST=localhost
        DB_DATABASE=agora_db
        DB_USER=agora_user_1
        DB_PASSWORD=pass1234 

## Docker Setup
- Open your Terminal and check Docker is running

        docker ps

- Now create the build your images

        docker-compose build

- Start up the application

        docker-compose up

- Now launch the application in your browser by going to http://localhost:4002/v1/docs/