# TODO app

This application aims to demonstrate basic concepts of a web application. It uses `React`
on the frontend, which communicates via an REST API with the backend. The backend is written
in `php`. Data is saved in a database (`mysql`).

The tutorial also tries to highlight the need of third-party packages
along with package managers and many technologies, all intermingling.
On the other hand, we do not go overboard, to keep at least some simplicity.

When recreating, do not be intimidated by the amount of time it takes. Start with the frontend, then backend with database.

## Goal

Build a simple TODO app. Specifications of the app are:

- the app shows all todos
- the user can add a new todo
- the user can remove a todo
- each todo has a title and a description
- there can be multiple todos with the same title and description
- todos are stored permanently

There are no further instructions (from the "customer").

## Prerequisites

This tutorial was created under Windows. If you have Linux or
want to develop under `wsl`, the concepts will
be the same, but the ways to configure stuff will be different.

First, you need a (stable) internet connection. Also, a text editor such as `VS Code` is highly recommended.

For frontend, you need to have `nodejs` along with `npm` installed. Type `node -v` and `npm -v` to find out the version. This tutorial was written with `node v16.15.1` and `npm 8.12.1`.

For backend, you need to have `php` along with `composer` installed.

- `php` is installed along with other tools using `xampp` (<https://www.apachefriends.org/download.html>). To verify, type `C:\xampp\php\php.exe -v` in the terminal. Version `8.1.6` was used during this tutorial. Add `php` to `PATH`, so that `php -v` also works.
- `composer` <https://getcomposer.org/download/>. Type `composer -v` to verify that you have it installed. This tutorial uses `Composer version 2.3.9`

For database, you need to have `mysql` installed. It comes with `xampp`.

You should be given:

- this `./README.md` file
- `./src/App.js` file

## Creating Frontend

Type `npx create-react-app todoapp` in a directory that you like to have your project in.
`todoapp` will be a newly created directory inside which a sample react app
will be located.

Switch into `todoapp` directory and run `npm start`.
Your default web browser (e.g. Firefox) should open and you
should see `localhost:3000` in the URL.

The application that gets rendered is in `src/App.js`.
Ask the lecturer to give it to you (or write your own if you know React).
It is very bare, no styles.
If finished, try adding a library such as MaterialUI and style the page up a bit!

## Explaining frontend

When you type `npm start`, the JS code gets compiled
(and bundled into a single file). Then, a web server is launched
and configured automatically to listen on port 3000 (the part
after `localhost:`).

Your default web browser gets launched and the URL is set
to `http://localhost:3000`.

- `http://` is the protocol that is used to communicate between your browser and the web server
- `localhost` is just another name for `this computer`. Internally,
it resolves to an IP adress 127.0.0.1, which is identified as loopback.
- `:3000` is the TCP port number which the web server listens on.

Note that the web browser does not care about where the data is
coming from. From it's point of view, it just asks the operating
system (Windows) to establish a TCP connection to a computer called
`localhost:3000`.

So, when we say that we have created the "frontend", we mean
that we've created some code that gets sent
(possibly over the network) from the web server onto the web client (browser).

## Creating backend

We will use `php` to create a simple REST API. For the
sake of simplicity, we will not use any frameworks for it,
although that would be advisable in any real-world scenario.

Under `todoapp`, create a new folder `backend`. Here, our backend code will be stored.

The rest of this manual is intentionally rather concise. It aims
to simulate a real-world situation.
Try to use your instinct, google around and ask other students
or the lecturer.

Continue according to this (with appropriate modifications):
<https://developer.okta.com/blog/2019/03/08/simple-rest-api-php>.
Skip all the parts regarting Octa Authentication itself,
just follow the process of API creation.

Individual steps include:

- creating a `composer.json` file
- creating a `.env` file
- test of the `getenv()` function
- adding `.gitignore`
- adding `bootstrap.php`, removing test code
- deciding what DB schema to use (hint: `id, title, description, completed` is a good start)
- creating a simple database for our TODOs
- creating a gateway which will manipulate with the database
- adding code to insert a todo by id, delete a todo by id and getting all todos
- creating a main API endpoint (controller), which will forward the HTTP requests
- creating a `TodoController.php`, which will analyze the request and execute the correct action
- starting the server and testing it (via `Postman`, `curl` or directly from the frontend)

## Explaining backend

The backend is, as usual, yet another server which
listens on some port. Because we have decided to use the HTTP
protocol for communication between the frontend and the backend,
the server is - surprise - a web server.

The difference with the "frontend" server (which is started
by `npm run`) is purely conceptual. They both listen on some port
and give back some data based on requests.

However, the "backend" server does not serve
HMTL, JS and CSS files, but rather some JSON responses (=plain text
written in a specified way).

We ask the backend server to get us some data (usually called a `fetch`, executed by `HTTP GET`), to modify some existing data
(usually `HTTP PUT`), or add new data (`HTTP POST`).

With the frontend server, we usually ask it to `GET` us all resources (JS, HTML, CSS) needed to correctly display a webpage.

The communication schema looks like this:

- the user types in `localhost:3000` into the URL bar of the browser.
- the browser infers `http://`.
- the browser performs a `GET` request to the URL `http://localhost:3000`
- our "frontend" server responds by handing HTML, CSS and JS files
(remember, `App.js` is where our frontend code resides. Usually, it will be bundled along with other code into a single file)
- the browser is happy with the response and displays the webpage.
It also starts executing the JS code that if got from our frontend server.
- In the JS code, we have programmed `fetch()` of the todos. We need to know the backend's server address (IP+port), so that the
browser knows where to send the request.
- The browser executes this `fetch`, asking our backend
server to get all todos.
- The backend server (conceptually a completely different thing which happens to run on the same computer, `localhost`, just listening on a different port) analyzes the request and decides
to respond.
- The backend server will therefore consult the database (again,
conceptually a completely different thing, could be running anywhere
on the web). The database will hand the server all the todos.
- The backend server takes these todos and puts them in the response into the JSON file format. Then, it dispatches the response back into our browser.
- The browser gets the JSON todo data and spills them onto the screen.

## Useful links

- <https://medium.com/js-geek/create-a-simple-todo-app-in-react-72d9341a7e6c>
- <https://developer.okta.com/blog/2019/03/08/simple-rest-api-php>
- <https://www.sourcecodester.com/tutorials/php/12333/php-simple-do-list-app.html>

## Troubleshooting

- When `command is not recognised as ...`, remember to restart your terminal session, so that PATH gets refreshed .
- Try restarting the computer.
- If something is not working, remember to check your current working directory.
- Ask! There is not that much time to get stuck.

## Improving the app, more practice

If you've finished, congratulations! You can continue with implementing
these concepts:

- adding a "completed", "due date" and "priority" for every todo
- allowing the user to complete a todo by some checkbox
- making the frontend generally nicer, e.g. coloring the todos with a color based on the due date and importance, sorting the todos,
displaying them in a table or on clickable cards
- allowing the user to fulltext search todos (hint: you need
to add a new API endpoint on backend)
- refactoring - use a framework on the backend to help you create the API
- publishing - set up a account at e.g. Azure and try to make the application accessible from the internet!
