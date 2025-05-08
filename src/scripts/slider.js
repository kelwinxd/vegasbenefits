let count = 1;
const slideInputs = ['slide1', 'slide2', 'slide3']; // Array com os ids dos inputs
const navigationLabels = document.querySelectorAll('.navigation-slides label');
setInterval(() => {
    nextImage()
}, 3000); // Intervalo de 3 segundos (ajustável conforme necessidade)

function nextImage(){
    count++; // Incrementa o contador

    if(count > 3){
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
