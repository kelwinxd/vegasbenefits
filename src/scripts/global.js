let count = 1;
const slideInputs = ['slide1', 'slide2', 'slide3']; // Array com os ids dos inputs
const navigationLabels = document.querySelectorAll('.navigation-slides label');

// Marca o primeiro input e sua label logo no início
document.getElementById(slideInputs[0]).checked = true; // Marca o primeiro slide como checado
navigationLabels[0].style.backgroundColor = 'white'; // Marca a primeira label como ativa

// Intervalo de 3 segundos (ajustável conforme necessidade)
setInterval(() => {
    nextImage();
}, 3000);

function nextImage() {
    count++; // Incrementa o contador

    if (count > 3) {
        count = 1; // Reseta o contador se passar do número 3
    }

    // Desmarcar todos os inputs
    slideInputs.forEach((id) => {
        document.getElementById(id).checked = false;
    });

    // Marcar o input correto com base no contador
    document.getElementById(slideInputs[count - 1]).checked = true; // Atualiza o input correspondente

    // Controla as labels
    navigationLabels.forEach((label, index) => {
        label.style.backgroundColor = ''; // Remove o fundo branco de todas as labels
    });

    // Marca a label ativa
    navigationLabels[count - 1].style.backgroundColor = 'white';
}

// Adicionando evento de clique nas labels para alterar a cor de fundo
navigationLabels.forEach((label, index) => {
    label.addEventListener('click', () => {
        // Desmarcar todos os inputs
        slideInputs.forEach((id) => {
            document.getElementById(id).checked = false;
        });

        // Marcar o input correspondente ao label clicado
        document.getElementById(slideInputs[index]).checked = true;

        // Controla as labels
        navigationLabels.forEach((label) => {
            label.style.backgroundColor = ''; // Remove o fundo branco de todas as labels
        });

        // Marca a label clicada com fundo branco
        label.style.backgroundColor = 'rgb(75, 47, 151)';
    });
});











//modalsearch

// Selecionando os elementos
const openModalBtn = document.getElementById('openModalBtn');
const closeModalBtn = document.getElementById('closeModalBtn');
const modal = document.getElementById('modal');
const backdrop = document.getElementById('backdrop');
const searchInput = document.getElementById('searchInput');

// Função para abrir o modal
openModalBtn.addEventListener('click', () => {
    modal.classList.add('open');  // Torna o modal visível
    backdrop.classList.add('active');  // Torna o backdrop visível
    searchInput.focus();  // Foca no campo de pesquisa
});

// Função para fechar o modal
closeModalBtn.addEventListener('click', () => {
    modal.classList.remove('open');
    backdrop.classList.remove('active');
});

// Impede interações com o fundo enquanto o modal está aberto
backdrop.addEventListener('click', () => {
    modal.classList.remove('open');
    backdrop.classList.remove('active');
});






//map 
const cityData = {
    americana: {
      center: { lat: -22.739444, lng: -47.331111 },
      points: [
        { name: "Academia BodyTech", type: "academia", position: { lat: -22.735, lng: -47.328 } },
        { name: "Farmácia São João", type: "farmacia", position: { lat: -22.740, lng: -47.330 } },
        { name: "Academia SmartFit", type: "academia", position: { lat: -22.742, lng: -47.334 } },
        { name: "Drogasil Americana", type: "farmacia", position: { lat: -22.738, lng: -47.329 } },
      ],
    },
    osasco: {
      center: { lat: -23.532, lng: -46.791 },
      points: [
        { name: "Academia Fit Osasco", type: "academia", position: { lat: -23.530, lng: -46.790 } },
        { name: "Drogaria Osasco", type: "farmacia", position: { lat: -23.533, lng: -46.792 } },
        { name: "Academia Life", type: "academia", position: { lat: -23.534, lng: -46.793 } },
        { name: "Farmácia Bem Estar", type: "farmacia", position: { lat: -23.535, lng: -46.789 } },
      ],
    },
  };

  let map;
  let markers = [];


  
  



const filterCity = document.getElementById("filterCity");
const filterSegment = document.getElementById("filterSegment");
const filterCard = document.getElementById("filterCard");
const produtoLista = document.querySelectorAll("#produtoLista li");
const heroDiv = document.querySelector(".hero-div")
const mapS = document.querySelector(".mapsearch")
const mapContainer = document.querySelector(".map-container")



function filtrar() {
  const search = searchInput.value.toLowerCase();
  const cidade = filterCity.value;
  const segmento = filterSegment.value;
  const cartao = filterCard.value;

  produtoLista.forEach((item) => {
    const nome = item.querySelector("h3").textContent.toLowerCase();
    const cidades = item.dataset.city.split(",");
    const seg = item.dataset.seg;
    const cards = item.dataset.card.split(",");
    const tags = item.dataset.tags.toLowerCase();

   
    const nomeOuTagMatch = !search || 
      nome.includes(search) || 
      tags.includes(search);

    const cidadeMatch = !cidade || cidades.includes(cidade);
    const segMatch = !segmento || seg === segmento;
    const cardMatch = !cartao || cards.includes(cartao);

    if (nomeOuTagMatch && cidadeMatch && segMatch && cardMatch) {
      item.style.display = "block";
       mapS.style.display = 'block'
       mapContainer.style.display = 'block'
      
    } else {
      
      item.style.display = "none";

      
    }
  });

  if (cidade && cityData[cidade]) {
    updateMapByCity(cidade, segmento);
  }
   
  heroDiv.style.display = 'none'
  mapS.style.display = 'block'



}

searchInput.addEventListener("input", filtrar);
filterCity.addEventListener("change", filtrar);
filterSegment.addEventListener("change", filtrar);
filterCard.addEventListener("change", filtrar);



  function initMap() {
    const defaultCenter = { lat: -23.561684, lng: -46.625378 };

  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 12,
    center: defaultCenter,
  });
  }

  

  function updateMapByCity(city, segmentoSelecionado = "") {
    if (!cityData[city]) return;
  
    const cityInfo = cityData[city];
  
    // Centraliza o mapa
    map.setCenter(cityInfo.center);
    map.setZoom(13);
  
    // Remove marcadores antigos
    markers.forEach(marker => marker.setMap(null));
    markers = [];
  
    // Adiciona novos marcadores que combinam com o segmento (ou todos se nenhum filtro)
    cityInfo.points.forEach(point => {
      const tipo = point.type.toLowerCase();
      const segment = segmentoSelecionado.toLowerCase();
  
      const exibir = !segment || tipo === segment;
  
      if (exibir) {
        const marker = new google.maps.Marker({
          position: point.position,
          map: map,
          title: `${point.name} (${point.type})`,
        });
  
        markers.push(marker);
      }
    });
  }
  
