const { resolveInclude } = require('ejs');
const express = require('express');
const connection = require('express-myconnection');
const Serveur = express.Router();



Serveur.get('/serveur',(req,res)=>{
    req.getConnection((erreur,connection)=>{
        if (erreur) {
            console.log(erreur);
            res.status(500).render("erreur",{erreur});
        } else {
            connection.query("SELECT * FROM serveur",[],(erreur,serveur)=>{
                if (erreur) {
                    console.log(erreur);
                    res.status(500).render("erreur",{erreur});
                } else {
                    res.status(200).render('serveur',{serveur});
                }
            })
        }
    })
    
})

//post modifier et ajouter les serveur 
Serveur.post('/AjouServeur',(req,res)=>{

    let date = new Date();
    let annee= date.getFullYear();
    let mois = date.getMonth()+1;
    let jour = date.getDate();
    let date_t = annee+'-'+mois+'-'+jour

    let id =req.body.idServeur ==="" ? null :req.body.idServeur;
    let nomServeur=req.body.nomServeur;
    let tel =req.body.telServeur;
    let reqSQL= id=== null ? "INSERT INTO serveur(id_s,nomSer,tel_S,date_de) VALUES(?,?,?,?)":
    "UPDATE serveur SET nomSer=?,tel_S=? WHERE id_s=?";
    let donnee = id === null ? [null,nomServeur,tel,date_t] : [nomServeur,tel,id];
req.getConnection((erreur,connection)=>{
    if (erreur) {
        res.status(500).render('erreur',{erreur})
        console.log('lblad conection');
    } else {
        connection.query(reqSQL,donnee,(erreur,result)=>{
            if (erreur) {
                console.log('lbla');
                res.status(500).render("erreur",{erreur});
            } else {
                res.status(200).redirect('serveur');
            }
        })
    }
})
})

module.exports = Serveur;










