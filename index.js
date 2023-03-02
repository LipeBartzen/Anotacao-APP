const btnEl = document.getElementById("btn")
const appEl = document.getElementById("app")

getBlocos().forEach((bloco) => {
const blocoEl = criarBlocoEl(bloco.id, bloco.content);
appEl.insertBefore(blocoEl, btnEl);
});
    function criarBlocoEl(id, content) {
    const element = document.createElement("textarea");
    element.classList.add("bloco");
    element.placeholder = "Bloco Vazio";
    element.value = content;
    
    element.addEventListener("dblclick", () => {
    const warning = confirm("Você quer deletar este bloco?");
    if(warning) {
        deletarBloco(id, element)
    }
    });
    element.addEventListener("input", ()=>{
        atualizarBloco(id,element.value)
    })
    return element;
}
function deletarBloco(id, element){
     const blocos = getBlocos().filter((bloco)=>bloco.id != id)
     salvarBloco(blocos)
     appEl.removeChild(element)
}

function atualizarBloco(id, content){
    const blocos = getBlocos()
    const target = blocos.filter((bloco)=>bloco.id == id)[0];
    target.content = content;
    salvarBloco(blocos)
}
function adicionarBloco(){

    const blocos = getBlocos();
    const blocoObj = {
        id: Math.floor(Math.random() * 100000),
        content: "",
    };
    const blocoEl = criarBlocoEl(blocoObj.id, blocoObj.content); 
    appEl.insertBefore(blocoEl, btnEl);

    blocos.push(blocoObj);

    salvarBloco(blocos);
}


function salvarBloco(blocos){
    localStorage.setItem("bloco-app", JSON.stringify(blocos))
}

function getBlocos(){
   return JSON.parse(localStorage.getItem("bloco-app") || "[]");

}
btnEl.addEventListener("click", adicionarBloco);