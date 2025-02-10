### Part 1: Express Backend

1. **Setup the Express Server:**

First, create a new directory `server` for your project and initialize a new Node.js project:

```sh
mkdir server
cd server
npm init -y
```
Install the necessary dependencies:

```sh
npm install express body-parser axios
```

Create a `tasks.json` file in the same directory with an empty array:

```json
[]
```

### Part 2: React Frontend

1. **Setup the React Application:**

Create a new React application using Create React App: in `client or parent folder`

```sh
cd client
npm install axios
```
**Run the Application:**

Start the Express server:

```sh
node server.js
```

Start the React application:

```sh
npm start
```
