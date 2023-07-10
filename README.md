# Solid app template

This template helps you to get started with creating a Solid app.

## Features

- Community Solid Server to test with pods locally.
- Comunica for querying pods and other data sources.
- [Solid Authentication library](https://github.com/inrupt/solid-client-authn-js) 
  for authenticating with an identity provider.

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
8. Click the button "Show book wish list (private)" to view a private list of books on the pod
   at <http://localhost:3000/example/favourite-books>.

## License

This code is copyrighted by [Ghent University – imec](http://idlab.ugent.be/) and
released under the [MIT license](http://opensource.org/licenses/MIT).
