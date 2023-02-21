const { resolveInclude } = require('ejs');
const express = require('express');
const connection = require('express-myconnection');
const CMD = express.Router();

CMD.post('/view',(req,res)=>{
    let id_com = req.body.id_comm; //A="SELECT Orders.OrderID, Customers.CustomerName, Orders.OrderDate FROM Orders"
    let nom =req.body.nom_serveur;
    let reqSQL="SELECT concerne_pro.ref_comm,concerne_pro.qte,produit.nom_p,produit.prix_u FROM  concerne_pro INNER JOIN produit ON concerne_pro.id=produit.id AND concerne_pro.ref_comm ="+id_com;
    req.getConnection((erreur,connection)=>{
        if (erreur) {
            res.status(500).render('erreur',{erreur});
        } else {
            connection.query(reqSQL,[],(erreur,rslt)=>{
                if (erreur) {
                    res.status(500).render('erreur',{erreur});
                } else {
                   /* for (let i = 0; i < array.length; i++) {
                        if (rslt) {
                            
                        }
                        
                    }*/
                    res.status(300).render('viewCMD',{rslt,id_com,nom})
                }
            })
        }
    })
})

module.exports = CMD;