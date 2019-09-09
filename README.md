This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

<!-- ## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify -->

# FOODSGIVING
## Objectives
Foodsgiving is an app that lets users donate and receive leftover foods from birthday parties, weddings, office luncheons, family dinner etc. 40 million tons of food is wasted in america annually. The idea behind this app stems from a desire to help curb food wastage which is why i decided to pick up this project as my front-end capstone.
## Description
This was designed as a single-user view application. The user signs in and the home page displays a list of donations made. Users can make new donations when they click the *DONATE* tab. New donations can be viewed on the *MY DONATIONS* page. Users can also search for food using the search bar and can filter through all donations to search for claimed and unclaimed donations.

First, the user logs in.

### Screenshot
![Login page](https://raw.githubusercontent.com/okaformark/front-end-capstone/master/src/helpers/screeshots/loginPage.png)

The user is prompted for authentication by Google.

![Google Auth](https://raw.githubusercontent.com/okaformark/front-end-capstone/master/src/helpers/screeshots/googleAuth.PNG)
![User adds movie](https://raw.githubusercontent.com/okaformark/movie-history/master/src/images/addsMovie.PNG)

which takes the user to their home page.

### Screenshots
![Home page](https://raw.githubusercontent.com/okaformark/front-end-capstone/master/src/helpers/screeshots/homePage.png)
![Search Bar](https://raw.githubusercontent.com/okaformark/front-end-capstone/master/src/helpers/screeshots/searchBar.png)

There, users can view donations. On display is also a search bar, filter buttons and the navigation bar.
Clicking on the claimed button filters through the donations and displays all claimed donations.

![Claimed View](https://raw.githubusercontent.com/okaformark/front-end-capstone/master/src/helpers/screeshots/claimedView.png)

likewise, clicking on the unclaimed button displays all the donations yet to be claimed.

![Unclaimed view](https://raw.githubusercontent.com/okaformark/front-end-capstone/master/src/helpers/screeshots/unclaimedView.png)


On the donate tab, users can make their donations,

### Screenshot
![Donate](https://raw.githubusercontent.com/okaformark/front-end-capstone/master/src/helpers/screeshots/donatePage.png)

after which the new donation pops up on the *My Donations* page.

 ### Screenshots
 ![My Donations](https://raw.githubusercontent.com/okaformark/front-end-capstone/master/src/helpers/screeshots/myDonationsPage.png)

## Technologies Used
- React, Reactstrap SCSS, and JavaScript
- CRUD Functionality
- Firebase

## Installation Instructions
- Clone this repository.
- At the root of the project run ```$ npm install```

## How to Run
- In the terminal, type ```$ npm start``` to run the webpage. 
- To make a production build of this project, type ```$ npm run build```. This will create a folder called ```build``` with all of the minified codes you need.
- Link to Firebase [Here](https://front-end-capstone-e5ec4.firebaseapp.com/)

## Author 
Mark Okafor
