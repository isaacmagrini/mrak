// A função não usa mapas. Ela faz a busca sequencial no Alfabeto 1 e depois no Alfabeto 2,
// usando a lógica de index, igual ao seu código Python.

// --- 1. FUNÇÃO ÚNICA DE SUBSTITUIÇÃO POSICIONAL ---
// Equivale à sua função Python 'zenith_polar'
function substituir(texto, alfA, alfB) {
    let resultado = "";
    
    // Converte os alfabetos para arrays de caracteres, removendo espaços e forçando minúsculas
    const alfALower = alfA.replace(/\s/g, '').toLowerCase();
    const alfBLower = alfB.replace(/\s/g, '').toLowerCase();

    for (const char of texto) {
        // Pega a versão minúscula do caractere de entrada
        const charLower = char.toLowerCase();
        
        // Variável para armazenar a substituição
        let substituicao = char;
        
        // 1. Tenta encontrar no Alfabeto A (cima)
        let indexA = alfALower.indexOf(charLower);
        
        if (indexA !== -1) {
            // Encontrou em A, substitui pela mesma posição em B
            substituicao = alfBLower[indexA];
        } 
        // 2. Tenta encontrar no Alfabeto B (baixo)
        else {
            let indexB = alfBLower.indexOf(charLower);
            
            if (indexB !== -1) {
                // Encontrou em B, substitui pela mesma posição em A
                substituicao = alfALower[indexB];
            }
        }
        
        // 3. Aplica a preservação de caso (se o caractere original era maiúsculo)
        if (substituicao !== char) {
            if (char === char.toUpperCase() && char !== char.toLowerCase()) {
                substituicao = substituicao.toUpperCase();
            }
        }
        
        resultado += substituicao;
    }
    return resultado;
}


// --- 2. FUNÇÕES DE ACIONAMENTO ---

function codificar() {
    const alfA = document.getElementById('alphaA').value;
    const alfB = document.getElementById('alphaB').value;
    const texto = document.getElementById('inputText').value;
    const resultadoOutput = document.getElementById('outputText');
    
    if (alfA.length === 0 || alfB.length === 0) {
        resultadoOutput.value = "ERRO: Preencha ambos os alfabetos.";
        return;
    }

    // Na Codificação, Cima (A) substitui Baixo (B). Chamamos como você faria no Python: substituir(texto, cima, baixo)
    resultadoOutput.value = substituir(texto, alfA, alfB);
}

function decodificar() {
    const alfA = document.getElementById('alphaA').value;
    const alfB = document.getElementById('alphaB').value;
    const texto = document.getElementById('inputText').value;
    const resultadoOutput = document.getElementById('outputText');
    
    if (alfA.length === 0 || alfB.length === 0) {
        resultadoOutput.value = "ERRO: Preencha ambos os alfabetos.";
        return;
    }

    // Na Decodificação, Baixo (B) substitui Cima (A). Chamamos como você faria no Python: substituir(texto, baixo, cima)
    resultadoOutput.value = substituir(texto, alfB, alfA);
}
