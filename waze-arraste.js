const limitesGeograficos = {
  latMin: -22.9170, // sul
  latMax: -22.9120, // norte
  lonMin: -43.2340, // oeste
  lonMax: -43.2200  // leste
};


function converterCoordenadasParaTela(lat, lon) {
  const { latMin, latMax, lonMin, lonMax } = limitesGeograficos;

  const x = ((lon - lonMin) / (lonMax - lonMin)) * window.innerWidth;
  const y = ((latMax - lat) / (latMax - latMin)) * window.innerHeight;

  return { x, y };
}

function inicializarMovimentoGPS() {
  if ("geolocation" in navigator) {
    navigator.geolocation.watchPosition(
      (pos) => {
        const latitude = pos.coords.latitude;
        const longitude = pos.coords.longitude;

        const { x, y } = converterCoordenadasParaTela(latitude, longitude);

        setPosicaoUsuario(x, y);
        atualizarBussolas(x, y);
      },
      (erro) => {
        console.error("Erro ao obter posição: ", erro);
      },
      {
        enableHighAccuracy: true,
        maximumAge: 1000,
        timeout: 10000
      }
    );
  } else {
    alert("Geolocalização não suportada no navegador.");
  }
}


//variaveis de controle do estado do usuario arrastado
let isDragging = false;
let offsetX = 0, offsetY = 0;

// Inicializa o controle de movimento do usuário com WASD
function inicializarMovimentoTeclado() {
    const velocidade = 1; // pixels por tecla pressionada

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

inicializarMovimentoGPS();
//inicializarMovimentoTeclado();