# bike-rental
MERN app

To run the application, you must have installed mongodb and the data / db directory created on the C drive
to start the database you need to go to the directory where mongodb is installed, the path is something like this
```sh
"C:\Program Files\MongoDB\Server\4.4\bin"
```
in this directory open the console and run
```sh
mongo
```
then open a new console and run
```sh
mongod --dbpath = "C:\data\db"

```
to start the server, go to the "api" project directory, open the console and run 
```sh
npm install
```
then start the server
```sh
npm run dev
```
to start the client, go to the "client" directory, open the console, run 
```sh
npm install
```
then
```sh
npm start
```
