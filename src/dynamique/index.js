let erreur=document.getElementById('erreur');
    let tick = [{}]
    let j=0;
    let Vnom;//stock le nom de produit nom[i-1]
    
    function creeticket(nom_p,prix,id_p){
        if (!clicked(nom_p) && Nvide()) {
            if (j)
                if (tick[j-1].nom!="" && tick[j-1].Qt=="" ) {
                    ajoutQte(1);
                    }
        oInput = document.createElement('input'); //on crée l'élément (la balise) input
        oInput.id ='nom_p'; //on définit l'attribut id du input
       oInput.setAttribute('class','cla'+id_p);
        oInput.setAttribute('type','text');
        oForm = document.getElementById('ticket'); //on récupère le noeud formulaire
        oForm.appendChild(oInput );//on place le input dans le formulaire*/
        erreur.style.display='none'      
        }else{
            erreur.style.display='initial'
           
            erreur.innerHTML="<b> le produit est deja exist modifier sa quantite </b>"
        }
        
        //afiche les nom produit
        const pro = document.querySelectorAll('#nom_p');//recuperer tout les input cree
        //parcoure tout les input si il est vide en donne la valeur
        for (let index = 0; index < pro.length; index++) {
            const element = pro[index];                 
            if (element.value == "" && !clicked(nom_p)) {
               
                    element.value=nom_p;
                    Vnom=nom_p;
                 select(nom_p,"")//ajouter a object[{nom:nom_p,Qt:""}]
                    hidden=document.createElement('input');//cree input pour id produit hidden
                    hidden.setAttribute('type','hidden');
                    hidden.setAttribute('name',"id"+index);
                    oInput.setAttribute("name","nom"+index);
                    oInput.disabled=true;//rendre les input disable
                    
                    oForm.appendChild(hidden);
                    hidden.value=id_p;
            }
        } 
       
    }

    function clicked(nom){
        const pro = document.querySelectorAll('#nom_p');
        for (let i = 0; i < pro.length; i++) {
            const element = pro[i];
            if (element.value==nom) {
                return 1;
            }
        } 
        return 0; 
    }  
    // ajoute la quantite de produit 
    function ajoutQte(Qte){
        //ajout qte s'il n'est existe pas
        if(tick[j-1].nom!="" && tick[j-1].Qt==""  ){
        //cree input qte
        Input=document.createElement('input');
        Input.setAttribute('class',"qtep"); //input class="gtep"
        Input.setAttribute('type','text');
        oForm = document.getElementById('ticket');
        oForm.appendChild(Input);
        allInput=document.querySelectorAll('.qtep');
        for (let i = 0; i < allInput.length; i++) {
            const element = allInput[i];
            if (element.value=="") {
                Input.setAttribute('name','qte'+i);
                element.value=Qte;
             select(Vnom,Qte);
               
            }
            
        }
    }
    }

    //cree object {nom:"",Qt:""}
    function select(nom_p,qte){
        tick[j]=Object.create({},{nom:{value:nom_p},Qt:{value:qte}})
        j++;
    }

   function disable(val){
    const pro = document.querySelectorAll('#nom_p');
        ajoutQte(1);
        for (let i = 0; i < pro.length; i++) {
        const element = pro[i];
        element.disabled=false;
        
    }
   if(val=='1'){
        document.getElementById('print').value='1';
   }else
        document.getElementById('print').value=0;
   }
//test input des produit s'il vide
   function Nvide(){
    const pro = document.querySelectorAll('#nom_p');
    for (let i = 0; i < pro.length; i++) {
        const element = pro[i];
       if (element.value=="") {
        return false;
       }
        
    }
    return true;
   }



