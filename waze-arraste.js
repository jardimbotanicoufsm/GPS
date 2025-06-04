let referenciaGeografica = null; // Vai guardar {lat, lon}
const centroDaTela = {
  x: window.innerWidth / 2,
  y: window.innerHeight / 2
};

const limitesGeograficos = {
  latMin: -22.9170, // sul
  latMax: -22.9120, // norte
  lonMin: -43.2340, // oeste
  lonMax: -43.2200  // leste
};

function posicionarUsuarioInicial() {
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const latitude = pos.coords.latitude;
        const longitude = pos.coords.longitude;

        // Salva a posição geográfica do centro da tela
        referenciaGeografica = { lat: latitude, lon: longitude };

        // Coloca o ícone do usuário no centro da tela
        setPosicaoUsuario(centroDaTela.x, centroDaTela.y);

        atualizarBussolas(centroDaTela.x, centroDaTela.y);
      },
      (erro) => {
        console.error("Erro ao obter posição inicial: ", erro);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000
      }
    );
  } else {
    alert("Seu navegador não suporta geolocalização.");
  }
}


function converterCoordenadasParaTela(lat, lon) {
  if (!referenciaGeografica) return { x: 0, y: 0 };

  const METROS_POR_GRAU_LAT = 111320;
  const METROS_POR_GRAU_LON = 111320 * Math.cos(referenciaGeografica.lat * Math.PI / 180);

  const deltaLat = lat - referenciaGeografica.lat;
  const deltaLon = lon - referenciaGeografica.lon;

  const metrosX = deltaLon * METROS_POR_GRAU_LON;
  const metrosY = -deltaLat * METROS_POR_GRAU_LAT; // invertido porque Y cresce para baixo

  // 1 metro = N pixels (ajustável, aqui usamos escala de 1:1)
  const escala = 1; // Aumente para zoom-out, diminua para zoom-in

  const x = centroDaTela.x + metrosX * escala;
  const y = centroDaTela.y + metrosY * escala;

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

posicionarUsuarioInicial();
inicializarMovimentoGPS();
inicializarMovimentoTeclado();