const celulas = document.querySelectorAll(".celula")
const jogadorX = "X"
const jogadorO = "O"
let fimDeJogo = false
// let checarTurno = true

// Criação de um array de arrays para definir as possíveis células que devem ser preenchidas para um jogador vencer o jogo...
const combinacoes = [
    // Células HORIZONTAIS...
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    // Células VERTICAIS...
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    // Células DIAGONAIS...
    [0, 4, 8],
    [2, 4, 6]
]

// Identificamdo oc cliques dentro e fora das células (se for fora da célula, ignora!)...
document.addEventListener("click", (event) => {
    if(event.target.matches(".celula")) {
        jogar(event.target.id, jogadorX) 
        setTimeout(() => bot(), 500)
    }
})

// Criando uma função onde o BOT vai jogar...
function bot() {
    const posicoesDisponiveis = []
    for(index in celulas) {
        if(!isNaN(index)) {
            if (!celulas[index].classList.contains("X") && !celulas[index].classList.contains("O")) {
                posicoesDisponiveis.push(index)
            }
        }
    }

    const posicaoAleatoria = Math.floor(Math.random() * posicoesDisponiveis.length)

    if(!fimDeJogo) {
        jogar(posicoesDisponiveis[posicaoAleatoria], jogadorO)
    }
}

// Criando a função para/de jogar...
function jogar(id, turno) {
    const celula = document.getElementById(id)
    celula.textContent = turno
    celula.classList.add(turno)  // Para verificar se quem jogou foi o jogador 'X' ou o jogador 'O'.
    checarVencedor(turno)   // Passamos o jogador para saber se ele é ou não o vencedor.
}

function checarVencedor(turno) {
    // Percorrendo os arrays de combinações, para verificar se o jogador preencheu alguma dessas combinações: se alguma dessas combinações retornar TRUE, a função 'checarVencedor' retornará TRUE também (para isso, usei função 'some')...
    const vencedor = combinacoes.some((comb) => {
        // Ao usar a função 'every', TODAS as combinações devem retornar TRUE. Se uma combinação retornar FALSE, a função 'combinações' vai TOTALMENTE FALSE!
        return comb.every((index) => {
            // Se a função 'every' for TRUE, a função 'some' também retornará 'TRUE'.
            return celulas[index].classList.contains(turno)
        })
    })

    if(vencedor) {
        encerrarJogo(turno)  // Aqui, a função 'encerrarJogo' percebe que teve um jogador e retorna qual jogador venceu.
    } else if(checarEmpate()) {
        encerrarJogo()  // Aqui, a função 'encerrarJogo' percebe que não teve um jogador e não retorna nada.
    } 
}

function checarEmpate() {
    let x = 0
    let o = 0

    for(index in celulas) {
        if(!isNaN(index)) {
            if(celulas[index].classList.contains(jogadorX)) {
                x++
            }
    
            if(celulas[index].classList.contains(jogadorO)) {
                o++
            }
        }
    }

    return x + o === 9 ? true : false
}

// Na função abaixo: se o parâmento vier com valor,  a função recebe este valor. Caso contrário, prevalece o null.
function encerrarJogo(vencedor = null) {
    fimDeJogo = true
    const telaEscura = document.getElementById("tela-escura")
    const h2 = document.createElement("h2")
    const h3 = document.createElement("h3")
    let mensagem = null

    telaEscura.style.display = "block"
    telaEscura.appendChild(h2)
    telaEscura.appendChild(h3)

    if(vencedor) {
        h2.innerHTML = `O jogador <span>${vencedor}</span> venceu!`
    } else {
        h2.innerHTML = "Empatou!"
    }

    let contador = 3
    setInterval(() => {
        h3.innerHTML = `Reniciando em ${contador--}...`
    }, 1000)

    setTimeout(() => location.reload(), 4000)
}