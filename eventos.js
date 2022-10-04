const API_URL = 'http://localhost:8000';

function onlynumber(evt) {
    var theEvent = evt || window.event;
    var key = theEvent.keyCode || theEvent.which;
    key = String.fromCharCode( key );
    var regex = /^[0-9.]+$/;
    if( !regex.test(key) ) {
       theEvent.returnValue = false;
       if(theEvent.preventDefault) theEvent.preventDefault();
    }
 }
 function onlynumber2(evt) {
    var theEvent = evt || window.event;
    var key = theEvent.keyCode || theEvent.which;
    key = String.fromCharCode( key );
    var regex = /^[0-9.]+$/;
    if( !regex.test(key) ) {
       theEvent.returnValue = false;
       if(theEvent.preventDefault) theEvent.preventDefault();
    }
 }

function marcarTodos() {
    let todos = document.querySelectorAll('[data-check="acao"]');

    todos.forEach((cadaCheck) => {
        

        cadaCheck.checked = check_all.checked;
    });

    acionarBotaoExcluir();
}




function buscarParaEditar(id) {
    input_editar_id.value = id;

    fetch(API_URL+'/agenda/'+id) 
        .then(res => res.json())
        .then(dados => {
            input_editar_nome.value = dados.nome;
            input_editar_numero.value = dados.numero;
        });
}


function editar() {
    event.preventDefault(); 

   
    let dados = {
        nome: input_editar_nome.value,
        numero: input_editar_numero.value,
    };

    fetch(API_URL+'/agenda/'+input_editar_id.value, {
        method: 'PATCH',
        body: JSON.stringify(dados),
        headers: {
            'content-type': 'application/json'
        }
    })
        .then(res => res.json())
        .then(() => atualizarLista());

    let x = document.querySelector('[data-bs-dismiss="offcanvas"]');

    x.dispatchEvent(new Event('click'));
}


function inserir() {
    //para a pagina não ser recarregada
    event.preventDefault();

    let dados = {
        nome: input_contato.value,
        numero: parseInt(input_numero.value),
    };

    fetch(API_URL+'/agenda', {
        method: 'POST',
        body: JSON.stringify(dados),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(resposta => resposta.json())
        .then(resposta => atualizarLista());

    form_add.reset();
}


async function excluir (id) {
    let resposta = confirm('Tem certeza?');

    if (resposta !== true) { 
        return;
    }

    await fetch(API_URL+'/agenda/'+id, {
        method: 'DELETE'
    });

    atualizarLista();
}

function atualizarLista() {
    tabela_agenda.innerHTML = '';

    fetch(API_URL+'/agenda')
        .then(function (resposta) {
            return resposta.json();
        })
        .then(function (lista) {
            lista.forEach(function (cadanome) {
                tabela_agenda.innerHTML += `
                    <tr>
                        <td> <input onclick="acionarBotaoExcluir()" value="${cadanome.id}" data-check="acao" type="checkbox"> </td>
                        <td>${cadanome.id}</td>
                        <td>${cadanome.nome}</td>
                        <td>${cadanome.numero}</td>
                        <td>
                            <button onclick="buscarParaEditar(${cadanome.id})" data-bs-toggle="offcanvas" data-bs-target="#offcanvasEditar" class="btn btn-outline-warning btn-sm">
                                Editar
                            </button>
                            <button onclick="excluir(${cadanome.id})" class="btn btn-outline-danger btn-sm">
                                Excluir
                            </button>
                        </td>
                    </tr>
                `;
            });
            
        })

}

atualizarLista();