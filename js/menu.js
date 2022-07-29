const menu = document.querySelector('nav .header .menu')
const menudos = document.querySelector('nav .header .menu-navegacion')

console.log(menudos)
console.log(menu)

menu.addEventListener('click', ()=>{
    menudos.classList.toggle("spread")
})

window.addEventListener('click', e=>{
    if(menudos.classList.contains('spread')
        && e.target != menudos && e.target != menu ){
        menudos.classList.toggle("spread")
    }
})