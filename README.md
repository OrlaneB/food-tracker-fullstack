# :apple: Food Pulse

See the app here : [Food Pulse](https://foodpulse.orlanebdesign.com/)

Food Pulse is a full-stack app designed to empower users who need to track nutrient intake. The key difference between this tracker and others on the market is its focus on health rather than weight loss. Calorie intake is optional and not prominently displayed, with the choice to hide it if it's a trigger. While we aim to support all bodies in meeting their goals, we are not medical providers, and the application is not an authoritative source for medical nutrition counseling.

The inspiration for Food Pulse came from one of the app developers [Laura Castro](#Laura-Castro). Her friend's daughter had been diagnosed with anemia. This sparked a deep dive into iron deficiency, during which she came across an article discussing how pairing certain foods can maximize nutrient absorption. And voilà! She brought the idea to her classmate, [Orlane Brun](#Orlane-Brun), who enthusiastically joined her in creating this helpful tool.

Together, we developed Food Pulse to provide personalized insights into nutrient intake. Through collaboration and careful planning, we designed an application to meet diverse dietary needs while making nutrition tracking accessible and user-friendly. Enjoy a **free trial** by [signing up](https://991f2449.sibforms.com/serve/MUIFAM4F5bfiWPgw7l0NfBbyB1-WCK3Cb7a0YvOpRcxIJDIKetySXbO6gPLqXhDo0q4OeABEJCUMfAPhCRpw5xot_icUjzC2y4VSYj0ze55Drn49dp1ARPfLeN3iJa4bfAvH_S_6SEMyvQL-M6gyE6_-KPL4anlzhk0Wl55qWsBJXMtB-7EHgIkYOcyteDa2v1BnJjXnZAza6gA2)
up as a tester! 

## :sparkles: Features 
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


### Database Prep

- Access the MySQL interface in your terminal by running `mysql -u root -p`
- Create a new database called `food_pulse`
- Add a `.env` file to the project folder of this repository containing the MySQL authentication information for MySQL user. For example:

```bash
  DB_HOST=localhost
  DB_USER=root
  DB_NAME=food_pulse
  DB_PASS=YOURPASSWORD
```

### Development

- Run `npm start` in project directory to start the Express server on port 3000.

- In another terminal, do `cd client` and run `npm run dev` to start the client in development mode with hot reloading in port 5173.<br>

## :rocket: Collaborators 

Each developer played an important role in the development of Food Pulse. What started as a side project during a bootcamp became a deployed fullstack application. Below each contributors contact information you can read more about their involvement and contributions to the project.

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
