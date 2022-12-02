
const btnAjouter =document.getElementById('btn-ajouter');//botton neveau produit
const AjouPro=document.querySelector('.AjouPro')//affiche formulaire d ajout produit 
const edit=document.getElementById('edit');//botton edit
const afichePlus=document.getElementById('afichePlus'); //botton affiche plus des produit
const plus= document.getElementById('plus10'); 
const annuler=document.getElementById('annuler');

//form noveau produit 
const nomProduit=document.getElementById('nomProduit');
const prixProduit=document.getElementById('prixProduit');
const id=document.getElementById('id');
const idPoduit=document.getElementById("idPoduit")

afichePlus.addEventListener('click',()=>{ //affiche tout les produit 
    plus.classList.toggle('active');
})

btnAjouter.addEventListener('click',()=>{//affiche  la formulaire noveau produit
    AjouPro.style.display='initial';
})

annuler.addEventListener('click',()=>{//close la formulaire  noveau produit
    AjouPro.style.display='none';
})

function Edit(i) {
    AjouPro.style.display='initial';
    let idhidden=document.getElementById('ID'+i)
    let nom=document.getElementById('nom'+i)
    let prix=document.getElementById('prix'+i)
    id.value=idhidden.value;
    idPoduit.value=idhidden.value;
    nomProduit.value=nom.value;
    prixProduit.value=prix.value;
}

//supprimer un produit dans BD

function supprimer(id){
    let pointfinal ="AjouPro/"+id;
    fetch(pointfinal,{method:"DELETE"}).then((res)=>{
        res.json()
    }).then((done)=>window.location.href=done.routeRacine
    ).catch((err)=>console.log(err))
}

