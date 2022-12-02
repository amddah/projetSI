
const AjouServeur=document.querySelector('.AjouServeur')//affiche formulaire d ajout produit 
const afichePlus=document.getElementById('afichePlus'); //botton affiche plus des produit
const plus= document.getElementById('plus10'); 


//form noveau serveur 
const nomServeur=document.getElementById('nomServeur');
const telServeur=document.getElementById('telServeur');
const idServeur= document.getElementById('idServeur');
const id=document.getElementById('id');

afichePlus.addEventListener('click',()=>{ //affiche tout les produit 
    plus.classList.toggle('active');
})

function AjouS(){//affiche  la formulaire noveau produit
    AjouServeur.style.display='initial';
}


function closeF(){//close la formulaire  noveau serveur
    AjouServeur.style.display='none';
}

function Edit(i) {
    AjouServeur.style.display='initial';
    let idhidden=document.getElementById('ID'+i)
    let nom=document.getElementById('nom'+i)
    let tel=document.getElementById('tel'+i)
    id.value=idhidden.value;
    idServeur.value=idhidden.value;
    nomServeur.value=nom.value;
    telServeur.value=tel.value;
}

//serveur

