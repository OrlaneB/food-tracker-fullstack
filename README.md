# :apple: Food Pulse

Foodtracker...

## :sparkles: Features 

###Add image or live video

- Mobile responsive 
- Login Authentication
- Profile page 
- Nutrient calculations for each day
- Meal logging
- Editable meals, ingredients, nutrients to track<br>
- Daily nutrient target setting

## :wrench: Setup  

### Dependencies
This application is built with an Express server, MySQL database, and React front end framework. Below is a list of other dependencies that you will need to run the application.

- Run `npm install` in project directory to install server-related dependencies
- `cd client` and run `npm install` to install client dependencies
- Other libraries include `npm install --save animate.css jquery popper react-spinners`

### Database Prep

- Access the MySQL interface in your terminal by running `mysql -u root -p`
- Create a new database called `how_to_life`
- Add a `.env` file to the project folder of this repository containing the MySQL authentication information for MySQL user. For example:

```bash
  DB_HOST=localhost
  DB_USER=root
  DB_NAME=how_to_life
  DB_PASS=YOURPASSWORD
```

### Development

- Run `npm start` in project directory to start the Express server on port 3000.

- In another terminal, do `cd client` and run `npm run dev` to start the client in development mode with hot reloading in port 5173.<br>

## :rocket: Collaborators 

#### Orlane Brun
:email: orlane.brun@free.com<br> 
:octocat: [GitHub Profile](https://github.com/OrlaneB)<br> 
🔗 [LinkedIn Profile](https://www.linkedin.com/in/orlane-brun/) 


#### Laura Castro
:email: lauracastrotech@gmail.com<br> 
:octocat: [GitHub Profile](https://github.com/lauracastrotech)<br> 
🔗 [LinkedIn Profile](https://www.linkedin.com/in/lccastro/)<br> 

<br>
<img src="https://lesbianswhotech.org/wp-content/uploads/2022/02/ExternalLink_CodeOp_logo_blue-2-2.jpg" alt="Description of Image" width="100"/>
This application was a collaborative effort built during CodeOp's Fullstack Development Bootcamp. Foodtracker was developed independently from the curriculum and project phase. Demo release coming soon!
