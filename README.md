# GraphQL Server Applcation
<img src="https://res.cloudinary.com/practicaldev/image/fetch/s--M5dHch5L--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://cdn-images-1.medium.com/max/800/1%2AR6WHuWI0M9I4t-og2yNq-w.png">

## Requirements
1. Install [*npm*](https://www.npmjs.com/get-npm) - 6.4.x.
2. Install [*Node.js*](https://nodejs.org/en/) - 10.x.x.
3. Git - 2.x.x
4. Visual Studio Code
5. MySQL - You can use [*XAMPP*](https://www.apachefriends.org/index.html) or [*APPSERV*](https://www.appserv.org/en/) to create server database

----
## Steps to Setup
### 1. Clone the application
* Create folder for contain project and open Git bash in this folder
* Type in Git bash command line: 
  * HTTPS: *git clone https://github.com/thanhlongvl/sportstore.git*

  * SSH: *git clone git@github.com:thanhlongvl/sportstore.git*

----
### 2. Set up database and connect to MySQL
* Run all query in **query.sql** file with MySQL to create database
* Open project with Visual Studio Code then go to server/db.js and edit code to connect with MySQL

<img src="https://i.imgur.com/oi8Gxmt.png">

----
### 3. Installation environment for build project
#### a. Server
* Open terminal in Visual Studio Code and **cd** to **/server** 
* Type **npm install**

#### b. Client
* Open terminal in Visual Studio Code and **cd** to **/my_app** 
* Type **npm install**
----
### 4. Build and run project
* Run [*Spring Boot Server*](https://github.com/thanhlongvl/springbootserversportstore) with IntelliJ IDEA or Eclipse
* Go to **server** folder in project then open PowerShell window here and type **node server.js**
* In Visual Studio Code **cd** to **my_app** folder and type **npm start**
