# **The React Quiz**

A fun and interactive quiz application built with modern React. Test your knowledge across a wide range of categories with customizable quiz settings.

[**Live Demo**](https://smara2026.github.io/quizApp)


## **Features**

* **Dynamic Questions**: Fetches trivia questions on-demand from the public [The Trivia API](https://the-trivia-api.com/).  
* **Quiz Customization**: Users can select the number of questions, the difficulty level, and the specific category for their quiz.  
* **Timed Challenge**: Each question has a 30-second timer to add an element of challenge.  
* **Instant Feedback**: Users see immediately whether their selected answer is correct or incorrect.  
* **Progress Tracking**: A dynamic progress bar shows the user's current position, points earned, and potential total points.  
* **Scoring System**: Points are awarded based on question difficulty (Easy: 10, Medium: 20, Hard: 30).  
* **High Score Tracking**: The app keeps track of the highest score achieved during the current session.  
* **Responsive Design**: A clean and simple interface that works well on different screen sizes.

## **Technologies Used**

* **React**: The core of the application, built with functional components and hooks.  
  * **useReducer**: For robust and predictable state management of the entire quiz flow.  
  * **useEffect**: For handling asynchronous data fetching and managing the countdown timer.  
* **JavaScript (ES6+)**: Modern JavaScript syntax for clean and efficient code.  
* **CSS3**: For custom styling and animations.  
* [**React Select**](https://react-select.com/): A flexible and beautiful Select Input control for ReactJS.

## **Getting Started**

To get a local copy up and running, follow these simple steps.

### **Prerequisites**

You need to have Node.js and npm installed on your machine.

* [Node.js](https://nodejs.org/) (which includes npm)

### **Installation**

1. Clone the repo  
   git clone \[https://github.com/smara2026/quizApp.git\](https://github.com/smara2026/quizApp.git)

2. Navigate into the project directory  
   cd quizApp

3. Install NPM packages  
   npm install

4. Run the app in development mode  
   npm start

   Open [http://localhost:3000](https://www.google.com/search?q=http://localhost:3000) to view it in the browser.

## **Available Scripts**

In the project directory, you can run:

* npm start: Runs the app in development mode.  
* npm test: Launches the test runner in interactive watch mode.  
* npm run build: Builds the app for production to the build folder.  
* npm run deploy: Deploys the application to GitHub Pages.
