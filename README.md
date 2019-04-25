# GraphQL Server Applcation


----
## Requirements
1. Install npm - 6.4.x. [*npm*](https://www.npmjs.com/get-npm)
2. Install Node.js - 10.x.x. [*Node.js*](https://nodejs.org/en/)
3. Git - 2.x.x
4. Visual Studio Code

----
## Steps to Setup
###1. Clone the application
* Create folder for contain project and open Git bash in this folder
* Type in Git bash command line: 
 * HTTPS: git clone https://github.com/thanhlongvl/sportstore.git

 * SSH: git clone git@github.com:thanhlongvl/sportstore.git


### 2. Set up database and connect to MySQL
* Run all query in **query.sql** file with MySQL to create database
* Open project with Visual Studio Code then go to server/db.js and edit code to connect with MySQL

<img src="https://i.imgur.com/oi8Gxmt.png">

### 3. Installation environment for build project
#### a. Server
* Open terminal in Visual Studio Code and **cd** to **/server** 
* Type npm install
* Type *npm install express --save* to install node_module
* Type *npm install graphql express-graphql --save * to install graphql and express-graphql dependencies
* Type *npm install --save sequelize* to install sequelize
* Type *npm install --save mysql2*
* Type *npm i node-fetch*

#### b. Client
* Type *npm i react-router-dom*
* Type *npm install react-bootstrap bootstrap*
* Type *npm i node-fetch*