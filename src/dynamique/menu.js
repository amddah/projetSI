let aside =document.querySelector('.aside');
let btn = document.querySelector('.btn-menu');
const croix = document.querySelector('.fa-regular');
const menuicone = document.querySelector('.fa-solid');

const produit=document.getElementById('produit');
let content=document.querySelector('.content');
let categore = document.querySelector('.categore');
let pageProduit=document.querySelector('#table-pro')

btn.addEventListener('click',()=>{
aside.classList.toggle("active");
            //changer le button de menu a X
    croix.classList.toggle('active');
    menuicone.classList.toggle('active');
})

// script slide  image 


produit.addEventListener('click',()=>{
    content.classList.toggle("active");
    categore.classList.toggle('active');
    pageProduit.classList.toggle('active');
   document.querySelector('.ordre').classList.toggle('active');
})

