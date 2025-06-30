console.log("hello")

let b=document.getElementsByClassName("box")
function getcolor() {
    let a = Math.floor(Math.random() * 256);
    let b1 = Math.floor(Math.random() * 256);
    let c = Math.ceil(Math.random()*256)
    return `rgb(${a}, ${b1}, ${c})`;
}

Array.from(b).forEach(a=>{
    a.style.backgroundColor=getcolor();
    a.style.color=getcolor();
})