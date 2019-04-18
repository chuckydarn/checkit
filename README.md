## CheckIt

CheckIt is a list making app that allows users to sign in and create different lists, such as a grocery list or a “to do” list.

### Problem and Solution

#### Problem

You have a whole family working off the same lists – how do you make sure time or money isn’t wasted on multiple people buying or doing the same thing?

#### Solution 

Shared family lists that let others know if something on the list has been taken care of already.

### Tech Stack

Frontend - built with create-react-app. I created all the specific components. React is not something I am very comfortable with or confident at. At first glance, the components could have been built smaller and more focused. 

Backend – built with Express, database built in Postgresql. I created the routes, controllers and queries, as well as the database models and migrations.

Tests – written in Jasmine.

Design – built using Bootstrap.

#### Why this tech stack?

I chose to really challenge myself with this assignment. I had never before create a React-Express app and with the constant updating going on in the solution, I thought React would be the best front end answer due to its use of the Virtual DOM. 

### Challenges

Some of the bigger challenges I faced were:

1. Creating sessions – previously, every time the page reloaded it would log the user out. Using react-cookie allowed me to be able to create a cookie upon Login, then check for that cookie each time the page reloads thus keeping the user logged in, and finally removing the cookie when a user logs out.

2. Frontend/Backend Communication – having never built a React-Express app, I had to do quite a bit of research into how the two could talk to each other. I ended up using the Fetch API, though for future projects I would be curious to look into using a proxy and how that would change the course of the app.

3. Deployment – another major hurtle was taking the working app from running on my localhost to a production environment. Heroku app naturally can pick up Node.js apps, but not so with React. The other challenge was that I wanted to keep the frontend together with the backend. What I ended up having to do was put the entire React app into the files of the Express app and then create a script that created a build version of the React upon pushing to Heroku, followed by pointing the homepage render to the index.html of the React app instead of the index of the Express app.

### Desired Additional Features

If there was more time, the top 3 things I would have liked to have implemented:

1. Collaborators - Currently as the app is set up, one household would log into a single account. If there was more time, I would have liked to have individual users and then the abilitiy for a user to invite others to share in their lists. This would also allow for users to create their own private lists.

2. Security - Currently, the app is not secure. There is no security certificate and the data is open. If there was more time, I would like to have researched and implemented more sercurity measures.

3. Assigning tasks - In an extention of Collaborators, I would have liked to create the ability assign tasks or items to individual users. Therefore, users could specify and organize lists in clear ways for all users should they want to.
