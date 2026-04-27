// Esta função "acorda" o modal
function abrirFormulario() {
    // 1. Localiza a div do modal pelo ID
    const modal = document.getElementById('passo-1');
    
    // 2. Muda o estilo de 'none' (invisível) para 'flex' (visível e centralizado)
    modal.style.display = 'flex';

}

// Esta função "esconde" o modal novamente
function fecharFormulario() {
    var modal = document.getElementById('passo-1');
    modal.style.display = 'none';

    var modal = document.getElementById('passo-2');
    modal.style.display = 'none';

    var modal = document.getElementById('passo-3');
    modal.style.display = 'none';

    var modal = document.getElementById('passo-4');
    modal.style.display = 'none';

    
}


function mudarPasso(passo) {
    // 1. Identifica o passo anterior para validar
    const passoAtualNumero = passo - 1;
    const divPassoAnterior = document.getElementById('passo-' + passoAtualNumero);

    // 2. VALIDAÇÃO (Só roda se você estiver indo para frente)
    if (divPassoAnterior && passo > passoAtualNumero) {
        
        // Validação Passo 1 (Rádios)
        if (passoAtualNumero === 1) {
            const selecionado = divPassoAnterior.querySelector('input[name="perfil"]:checked');
            if (!selecionado) {
                alert("Por favor, selecione se você é Doador ou Coletor.");
                return; // PARA AQUI se estiver vazio
            }
        }

        // Validação Passo 2 (Campos de texto)
        if (passoAtualNumero === 2) {
            const campos = divPassoAnterior.querySelectorAll('.campo-grupo input');
            let algumVazio = false;

            campos.forEach(input => {
                if (input.value.trim() === "") {
                    algumVazio = true;
                    input.style.borderBottom = "2px solid red";
                } else {
                    input.style.borderBottom = "1px solid black";
                }
            });

            if (algumVazio) {
                alert("Por favor, preencha todos os campos obrigatórios.");
                return; // PARA AQUI se estiver vazio
            }
        }
    }

    // 3. TROCA DE TELA (Só acontece se passar pela validação acima)
    // Esconde todos os passos que existem no seu HTML
    document.getElementById('passo-1').style.display = 'none';
    document.getElementById('passo-2').style.display = 'none';
    document.getElementById('passo-3').style.display = 'none';
    if(document.getElementById('passo-4')) {
        document.getElementById('passo-4').style.display = 'none';
    }
    
    // Mostra o passo solicitado
    const proximo = document.getElementById('passo-' + passo);
    if (proximo) {
        proximo.style.display = 'flex';
    }
}

function abrirFormulario() {
    // LIMPEZA DOS CAMPOS
    const inputs = document.querySelectorAll('input[type="text"]');
    inputs.forEach(input => {
        input.value = ''; // Limpa o texto
        input.style.borderBottom = "1px solid black"; // Reseta a cor da linha
    });

    const radios = document.querySelectorAll('input[name="perfil"]');
    radios.forEach(radio => radio.checked = false); // Desmarca Doador/Coletor

    // ABRE O PRIMEIRO PASSO
    const modal = document.getElementById('passo-1');
    modal.style.display = 'flex';
}

function enviarFinal() {
    const formulario = document.getElementById('meuFormulario');
    const dados = new FormData(formulario);

    // Envia para o Formspree via AJAX (em segundo plano)
    fetch(formulario.action, {
        method: formulario.method,
        body: dados,
        headers: {
            'Accept': 'application/json'
        }
    }).then(response => {
        if (response.ok) {
            alert("Sucesso! Recebemos todas as informações do seu post.");
            fecharFormulario(); // Fecha o modal após enviar
        } else {
            alert("Houve um erro ao enviar. Tente novamente.");
        }
    });
}