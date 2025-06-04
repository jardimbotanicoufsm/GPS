// Variáveis que armazenam a posição atual do usuário na tela
let posX, posY;

// Elemento que representa o usuário
const usuario = document.getElementById('usuario');


function inicializarUsuario() {
    posX = centroDaTela.x;
    posY = centroDaTela.y;
    usuario.style.left = `${posX}px`;
    usuario.style.top = `${posY}px`;
}


// Função que retorna a posição atual do usuário como um objeto {x, y}
function getPosicaoUsuario() {
    return { x: posX, y: posY };
}


// Função que atualiza a posição do usuário e reposiciona o elemento na tela
function setPosicaoUsuario(x, y) {
    posX = x;                           // atualiza a posição X
    posY = y;                           // atualiza a posição Y
    usuario.style.left = `${posX}px`;   // move o usuario na horizontal
    usuario.style.top = `${posY}px`;    // move o usuario na vertical
}
