const quadradoAzul = document.getElementById("quadradoAzul");
const quadradoVermelho = document.getElementById("quadradoVermelho");
const velocidade = 7;
const teclasPressionadas = {};
let body = document.querySelector("body");
let level = document.querySelector(".level");
let ultimaTecla = "";
let contador = 0;

function verificarColisao() {
    const posicaoAzul = quadradoAzul.getBoundingClientRect();
    const posicaoVermelho = quadradoVermelho.getBoundingClientRect();

    if (
        posicaoAzul.left < posicaoVermelho.right &&
        posicaoAzul.right > posicaoVermelho.left &&
        posicaoAzul.top < posicaoVermelho.bottom &&
        posicaoAzul.bottom > posicaoVermelho.top
    ) {
        // Colisão detectada, ocultar o quadrado vermelho
        quadradoVermelho.style.display = "none";
        let largura =  document.body.clientWidth;
        let altura = document.body.clientHeight;
        // Reposicionar o quadrado vermelho em uma posição aleatória
        const novoLeft = Math.random() * largura; // -100 a 100 pixels
        const novoTop = Math.random() * altura; // -100 a 100 pixels
        quadradoVermelho.style.left = novoLeft + "px";
        quadradoVermelho.style.top = novoTop + "px";

        // Mostrar o quadrado vermelho novamente
        quadradoVermelho.style.display = "block";
        atualizaContador();
    }
}

let atualizaContador = ()=>{
    contador = contador + 1; 
    let pContador = document.querySelector(".contador");
    pContador.innerHTML = `${contador}`;
    msg(contador);
}

let msg = (value)=>{
    teclasPressionadas[ultimaTecla] = false;
    if(value == 3){
        alert(`O Sol converte cerca de 600 milhões de toneladas de hidrogênio em hélio a cada segundo em virtude do processo de fusão nuclear. `)
        level.innerHTML = `Level 2`;
        body.style.background = "yellow";
    }
    if(value == 6){
        alert(`O calendário da Etiópia é sete anos atrasado em relação aos demais países do ocidente `)
        level.innerHTML = `Level 3`;
        body.style.background = "pink";
    }
    if(value == 12){
        alert(`O divisor do algoritmo da divisão nunca pode ser zero. `)
        level.innerHTML = `Level 4`;
        body.style.background = "red";
    }
    if(value == 18){
        alert(`A luz do Sol leva cerca de 8 minutos e 20 segundos para chegar à Terra. `)
        level.innerHTML = `Level FINAL`;
        body.style.background = "gray";
    }
    if(value == 24){
        level.innerHTML = `VOCÊ GANHOU`;
        lixo.style.display = "none"
    }
}

document.addEventListener("keydown", (event) => {
    teclasPressionadas[event.key] = true;
    ultimaTecla = event.key;
});

document.addEventListener("keyup", (event) => {
    teclasPressionadas[event.key] = false;
});

function moverQuadrado() {
    if (teclasPressionadas["w"]) {
        quadradoAzul.style.top = (parseInt(getComputedStyle(quadradoAzul).top) - velocidade) + "px";
    }
    if (teclasPressionadas["a"]) {
        quadradoAzul.style.left = (parseInt(getComputedStyle(quadradoAzul).left) - velocidade) + "px";
    }
    if (teclasPressionadas["s"]) {
        quadradoAzul.style.top = (parseInt(getComputedStyle(quadradoAzul).top) + velocidade) + "px";
    }
    if (teclasPressionadas["d"]) {
        quadradoAzul.style.left = (parseInt(getComputedStyle(quadradoAzul).left) + velocidade) + "px";
    }

    verificarColisao();
    requestAnimationFrame(moverQuadrado);
}

requestAnimationFrame(moverQuadrado);