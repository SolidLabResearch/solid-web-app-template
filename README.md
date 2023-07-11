# Solid Web app template

This template helps you to get started with creating a Solid Web app.

## Features

- [Community Solid Server](https://github.com/CommunitySolidServer/CommunitySolidServer) to test with pods locally.
- [Comunica](https://comunica.dev/) for querying pods and other data sources.
- [Solid Authentication library](https://github.com/inrupt/solid-client-authn-js) 
  for authenticating with an identity provider.
  You find the browser-specific documentation 
  [here](https://docs.inrupt.com/developer-tools/javascript/client-libraries/tutorial/authenticate-browser/).
- [webpack](https://webpack.js.org/) to bundle the JavaScript.

## Usage

1. Install the dependencies via 
   ```shell
   npm i
   ```
2. Prepare the pods via
   ```shell
   npm prepare:pods
   ```
   This will start an instance of CSS.
   Stop the server via CTRL + C once you see
   ```
   Listening to server at http://localhost:3000/
   ```
   You only have to do this once.
   If you want to reset the pods,
   do first
   ```shell
   npm run reset:pods
   ```
   and execute then the prepare script again.
3. Copy the initial data to the pods via
   ```shell
   npm run prepare:pods:data
   ```
4. Serve the app using webpack via
   ```shell
   npm start
   ```
5. Browse to <http://localhost:8080> to use the app.
6. Click the button "Show book wish list (public)" to view a public list of books on the pod
   at <http://localhost:3000/example/wish-list>.
7. Log in with the WebID <http://localhost:3000/example/profile/card#me>.
   The email and password of the account are defined in `seeded-pod-config.json`.
   This file is also in step 2 to prepare the pods.
8. Click the button "Show book wish list (private)" to view a private list of books on the pod
   at <http://localhost:3000/example/favourite-books>.

## Pod data

You find the initial pod data in the folder `initial-pod-data`.
It has two resources:
- `favourite-books`: this list contains the favourite books of the user. 
   This list is private. only the user has read, write, and control access.
   This is specified in `favourite-books.acl`.
- `wish-list`: this list contains the wish list of book of the user.
   This list is public: everybody can read the list, but only the user can write and control it.
   This is specified in `wish-list.acl`.

You find the shape to which the above two resources adhere in `shapes/book-list.ttl`.

## License

This code is copyrighted by [Ghent University – imec](http://idlab.ugent.be/) and
released under the [MIT license](http://opensource.org/licenses/MIT).
