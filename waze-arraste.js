//variaveis de controle do estado do usuario arrastado
let isDragging = false;
let offsetX = 0, offsetY = 0;

// Inicializa o controle de movimento do usuário com WASD
function inicializarMovimentoTeclado() {
    const velocidade = 5; // pixels por tecla pressionada

    window.addEventListener('keydown', (e) => {
        let { x, y } = getPosicaoUsuario();

        switch (e.key.toLowerCase()) {
            case 'w':
                y -= velocidade;
                break;
            case 'a':
                x -= velocidade;
                break;
            case 's':
                y += velocidade;
                break;
            case 'd':
                x += velocidade;
                break;
            default:
                return; // tecla não reconhecida, ignora
        }

        setPosicaoUsuario(x, y);
        atualizarBussolas(x, y);
    });

    // Atualiza centro da tela em caso de redimensionamento (se necessário)
    window.addEventListener('resize', () => {
        center.x = window.innerWidth / 2;
        center.y = window.innerHeight / 2;
    });
}

inicializarMovimentoTeclado();
