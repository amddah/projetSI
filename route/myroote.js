const { resolveInclude } = require('ejs');
const express = require('express');
const route = express.Router();


route.get('/',(req,res)=>{
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
                   //select les commande dans la table commande pour ajouter a la page accieul
                   connection.query("SELECT * FROM commande",[],(erreur,R_comm)=>{
                    if (erreur) {
                        console.log(erreur);
                        res.status(500).render("erreur",{erreur});
                    } else {
                        //select les serveur dans la table des serveur
                        connection.query("SELECT * FROM serveur",[],(erreur,serveur)=>{
                            if (erreur) {
                                res.status(500).render("erreur",{erreur});
                            } else {
                                 res.status(200).render('index',{result,R_comm,serveur});
                            }
                        });//select serveur
                       
                    }
                });
                }
            })
        }
    })
    
})


route.post('/Formcontenu',(req,res)=>{
   
    // defini la date de commande pour inser a DB
    let date = new Date();
    let annee= date.getFullYear();
    let mois = date.getMonth()+1;
    let jour = date.getDate();
    let h = date.getHours();
    let min = date.getMinutes();
    let sc = date.getSeconds();
    let date_t = annee+'-'+mois+'-'+jour+' '+h+':'+min+':'+sc; 
    let nom_serveur=req.body.nom_serveur;
  //
   
    let Obj=[
        {
        nom:req.body.id0,
        Qte:req.body.qte0
        },
        {
        nom:req.body.id1,
        Qte:req.body.qte1
        },
        {
        nom:req.body.id2,
        Qte:req.body.qte2
        },
        {
        nom:req.body.id3,
        Qte:req.body.qte3
        },
        {
            nom:req.body.id4,
            Qte:req.body.qte4
        },
        {
            nom:req.body.id5,
            Qte:req.body.qte5
        },
        {
            nom:req.body.id6,
            Qte:req.body.qte6
        },
        {
            nom:req.body.id7,
            Qte:req.body.qte7
        },
        {
            nom:req.body.id8,
            Qte:req.body.qte8
        }
    ]      
    let btn=req.body.printN;
    //requete SQL
    let reqsql = "INSERT INTO commande(ref_comm,date_comm,nomSer) VALUES(?,?,?)"
    let reqsgl2 = "INSERT INTO concerne_pro(ref_comm,qte,id) VALUES(?,?,?)"
    
    let donnee = [null,date_t,nom_serveur];

    req.getConnection((erreur,connection)=>{
        if (erreur) {
            console.log(erreur);
            res.status(500).render("erreur",{erreur});
        } else {
           //ajout un noveau commende a table commande
            connection.query(reqsql,donnee,(erreur,result)=>{
                 if (erreur) {
                    console.log(erreur);
                    res.status(500).render("erreur",{erreur});
                }/*else  {
                    res.status(300).redirect('/');
                }*/
            })
         //select la ID de la dernier commande ajouter
          let maxid = "SELECT MAX(ref_comm) AS ID FROM commande"
          let a;
       connection.query(maxid,a,(erreur,a)=>{ 
        // extract la valeur de a=[ RowDataPacket { ID: 197 } ]
        let result = Object.values(JSON.parse(JSON.stringify(a)));
       //ajouer les le ID e QTE des produit a la table concerne table
        for (let index = 0; index < Obj.length; index++) {
            // let rslt =  Object.values(JSON.parse(JSON.stringify(Obj[index].nom)));
            // let rsQte = 
            console.log(Obj[index].nom);
            if (Obj[index].nom!=null) { //test 
                d=[result[0].ID,Obj[index].Qte,Obj[index].nom]; //les donnee ajouter a table concerne table
               connection.query(reqsgl2,d,(erreur)=>{
                if (erreur) {
                   
                    console.log(erreur);
                    res.status(500).render("erreur",{erreur});
                }
               })

            }//else break; //if
        }//for
        //ajout a ticket les produit commande sur place
        let reqSQL="SELECT concerne_pro.ref_comm,concerne_pro.qte,produit.nom_p,produit.prix_u FROM  concerne_pro INNER JOIN produit ON concerne_pro.id=produit.id AND concerne_pro.ref_comm ="+result[0].ID;
        let btn=req.body.printN;
        let ID=result[0].ID;
       // if (btn==='1'){ 
            connection.query(reqSQL,[],(erreur,content)=>{
            if (erreur) {
                res.status(500).render("erreur",{erreur});
            } else {
                res.render('ticket',{content,ID,date_t,nom_serveur});
                 //render a la page ticket les produit est la date ...
                
            }
        })
//here 
       })

        }
    })
});




module.exports = route;