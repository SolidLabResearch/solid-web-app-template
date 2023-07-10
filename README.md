# Solid app template

This template helps you to get started with creating a Solid app.

## Features

- Community Solid Server to test with pods locally.
- TODO: Comunica for querying pods and other data sources.

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
3. Serve the app using webpack via
   ```shell
   npm start
   ```
4. Browse to <http://localhost:8080> to use the app.

## License

This code is copyrighted by [Ghent University – imec](http://idlab.ugent.be/) and
released under the [MIT license](http://opensource.org/licenses/MIT).
