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
}

App.use(express.urlencoded({extended : false}));

//difinition du middlware par connection a DB
App.use(myconnection(mysql,optionDB,'pool'));

// definition de moteur d'affichage 
App.set("view engine","ejs");
App.set('views','src');
App.use(express.static(__dirname + '/src'));

App.use(function(req, res, next) {
  console.log(typeof req.next);

  next();
});
//express router 
App.use(route);
 App.use(Produit);
App.use(serveur);
App.use(commande);

App.use((req, res) => {
    res.status(404).render("erreur");
  });
App.listen(8080);
console.log("attende la requete au port 8080 ");
