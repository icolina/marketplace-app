# HOW TO SETUP THE PROJECT IN LOCAL

### OPTION 1: RUNNING THE APP SEPARATELY
1. Go the `api` directory 
2. Copy the sample environment variable `cp .env.example .env`and make sure to update it based on your setup, especially the DB related ones
3. Run `composer install` and `npm install` in your terminal to install the dependencies
4. Run `composer run dev` in your terminal to have our API up and running. Access it at `http://localhost:3200`
5. Go to the `frontend` directory
6. Run `npm install` to install the dependencies
7. Run `npm run dev` and access the React Frontend at `http://localhost:5174`

### OPTION 2: RUNNING THE APP VIA DOCKER
1. Run `docker-compose -f docker-compose.yml up --build` in your terminal.
2. Access the Laravel API at `http://localhost:8080`
3. Access the React Frontend at `http://localhost:3000`
