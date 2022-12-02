const { resolveInclude } = require('ejs');
const express = require('express');
const Produit = express.Router();



/*Produit.get('/Produit',(req,res)=>{
    req.getConnection((erreur,connection)=>{
        if (erreur) {
            console.log(erreur);
            res.status(500).render("erreur",{erreur});
        } else {
            connection.query("SELECT * FROM produit",[],(erreur,result)=>{
                if (erreur) {
                    console.log(erreur);
                    res.status(500).render("erreur",{erreur});
                } else {
                    res.status(200).render('Produit',{result});
                }
            })
        }
    })
    
})*/

Produit.post('/AjouPro',(req,res)=>{
    let id= req.body.idPoduit===""? null :req.body.idPoduit;
    let Nom = req.body.nomProduit;
    let prix=req.body.prixProduit;
    let reqSQL= id==null ? "INSERT INTO produit(id,nom_p,prix_u) VALUES (?,?,?)" :
    "UPDATE produit SET nom_p=?,prix_u=? WHERE id=?";
    let donnee = id === null ? [null,Nom,prix] :[Nom,prix,id]
    req.getConnection((erreur,connection)=>{
        if (erreur) {
            res.status(404).render('erreur',{erreur})
        } else {
            connection.query(reqSQL,donnee,(erreur,result)=>{
                if (erreur) {
                    res.status(404).render('erreur',{erreur})
                } else {
                    res.status(300).redirect('/');
                }
            })
        }
    })
})

Produit.delete('/AjouPro/:id',(req,res)=>{
    let ID= req.params.id;
    req.getConnection((erreur,connection)=>{
        if (erreur) {
            res.status(404).render('erreur',{erreur});
        } else {
            connection.query("DELETE FROM produit WHERE id=?",[ID],(erreur,result)=>{
                if (erreur) {
                    res.status(404).render('erreur',{erreur});
                } else {
                    res.status(300).json({routeRacine : "/"});
                }
            });
        }
    });
});



module.exports=Produit;









