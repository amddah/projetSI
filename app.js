const express = require("express");
 const mysql = require('mysql');
 const myconnection = require("express-myconnection");
const route = require('./route/myroote');
const Produit = require('./route/getProduit');
const serveur = require('./route/getServeur');
const commande = require('./route/commande')
const App = express();



// option de connection a mysql
const optionDB = {
    host : "localhost",
    user : "root",
    password : "",
    database : "gestion_cafe"
}|| process.env;

App.use(express.urlencoded({extended : false}));

//difinition du middlware par connection a DB
App.use(myconnection(mysql,optionDB,'pool'));

// definition de moteur d'affichage 
App.set("view engine","ejs");
App.set('views','src');
App.use(express.static(__dirname + '/src'));

//express router 
App.use(route);
 App.use(Produit);
App.use(serveur);
App.use(commande);

App.use((req, res) => {
    res.status(404).render("erreur");
  });
const port =process.env.PORT||3000;
App.listen(port);
console.log("attende la requete au port 8000 ");
