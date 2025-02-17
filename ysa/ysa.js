let carrinho = [];

document.addEventListener('DOMContentLoaded', () => {
    const anoAtual = new Date().getFullYear();
    document.getElementById('ano-atual').textContent = anoAtual;
});

function adicionarCarrinho(elemento) {
    const produto = elemento.parentElement;
    const nome = produto.getAttribute('data-nome');
    const preco = parseInt(produto.getAttribute('data-preco'));
    carrinho.push({ nome, preco });
    atualizarCarrinho();
}

function atualizarCarrinho() {
    const listaCarrinho = document.getElementById('lista-carrinho');
    listaCarrinho.innerHTML = '';
    let total = 0;

    carrinho.forEach((item, index) => {
        const li = document.createElement('li');
        li.textContent = `${item.nome} - R$ ${item.preco},00`;

        const removerButton = document.createElement('button');
        removerButton.textContent = 'Remover';
        removerButton.classList.add('btn-remover');
        removerButton.onclick = () => removerCarrinho(index);

        li.appendChild(removerButton);
        listaCarrinho.appendChild(li);
        total += item.preco;
    });

    const totalElement = document.getElementById('total');
    totalElement.textContent = `Total: R$ ${total},00`;

    // Atualizar o recibo em tempo real
    atualizarRecibo();
}

function selecionarMetodoEntrega() {
    const metodoEntrega = document.getElementById('metodo-entrega').value;
    const enderecoContainer = document.getElementById('endereco-container');

    if (metodoEntrega === 'retirada') {
        enderecoContainer.style.display = 'none';
    } else {
        enderecoContainer.style.display = 'block';
    }

    atualizarRecibo(); // Atualizar o recibo para refletir a taxa de entrega
}

function atualizarRecibo() {
    const metodoEntrega = document.getElementById('metodo-entrega').value;
    const total = carrinho.reduce((sum, item) => sum + item.preco, 0);
    const entrega = (metodoEntrega === 'retirada' || total >= 28) ? 0 : 9;
    const subtotal = total;
    const totalComEntrega = subtotal + entrega;

    let detalhes = '';
    const detalhesRecibo = document.getElementById('detalhes-recibo');
    detalhesRecibo.innerHTML = ''; // Limpa o conteúdo anterior

    carrinho.forEach((item, index) => {
        detalhes += `${item.nome} - R$ ${item.preco},00\n`;

        const p = document.createElement('p');
        p.textContent = `${item.nome} - R$ ${item.preco},00`;

        const removerButton = document.createElement('button');
        removerButton.textContent = 'Remover';
        removerButton.classList.add('btn-remover');
        removerButton.onclick = () => {
            removerCarrinho(index);
            atualizarRecibo();
        };

        p.appendChild(removerButton);
        detalhesRecibo.appendChild(p);
    });
    detalhes += `\nSubtotal: R$ ${subtotal},00\n`;
    detalhes += entrega === 0 ? 'Entrega: Grátis\n' : `Entrega: R$ ${entrega},00\n`;
    detalhes += `Total: R$ ${totalComEntrega},00\n`;

    const totalP = document.createElement('p');
    totalP.textContent = detalhes;
    detalhesRecibo.appendChild(totalP);
}

function removerCarrinho(index) {
    carrinho.splice(index, 1);
    atualizarCarrinho();
}

function exibirRecibo() {
    document.getElementById('carrinho').style.display = 'none';
    document.getElementById('recibo').style.display = 'block';
    atualizarRecibo(); // Atualiza o recibo ao exibir
}

function selecionarPagamento() {
    const pagamento = document.getElementById('pagamento').value;
    const trocoContainer = document.getElementById('troco-container');
    if (pagamento === 'dinheiro') {
        trocoContainer.style.display = 'block';
    } else {
        trocoContainer.style.display = 'none';
    }
}

function confirmarPedido() {
    const total = carrinho.reduce((sum, item) => sum + item.preco, 0);
    const metodoEntrega = document.getElementById('metodo-entrega').value;
    const entrega = (metodoEntrega === 'retirada' || total >= 28) ? 0 : 9;
    const subtotal = total;
    const totalComEntrega = subtotal + entrega;
    const endereco = document.getElementById('endereco').value;
    const pagamento = document.getElementById('pagamento').value;
    let troco = '';

    if (metodoEntrega === 'entrega' && endereco.trim() === '') {
        alert('Por favor, preencha o endereço de entrega.');
        return;
    }

    if (pagamento === 'dinheiro') {
        troco = document.getElementById('troco').value;
        if (troco.trim() === '') {
            alert('Por favor, informe o valor do troco.');
            return;
        }
    }

    let mensagem = 'Meu pedido:\n \n';
    carrinho.forEach(item => {
        mensagem += `${item.nome} - R$ ${item.preco},00\n`;
    });
    mensagem += `\nSubtotal: R$ ${subtotal},00\n`;
    mensagem += entrega === 0 ? 'Entrega: Grátis\n' : 
    `Entrega: R$ ${entrega},00\n`;
    mensagem += `*Total: R$ ${totalComEntrega},00*\n`;
    mensagem += `Endereço: ${metodoEntrega === 'retirada' ? 'Retirada no local' : endereco}\n`;
    mensagem += `Forma de Pagamento: ${pagamento}*\n`;
  
    if (pagamento === 'dinheiro') {
        mensagem += `Troco para: R$ ${troco},00\n`;
        mensagem += `_Cantinho Da Ysa_\n`;
        mensagem += `Obrigado pela preferencia 😊\n `;
    }

    if (confirm('Deseja confirmar o pedido?')) {
        window.open(`https://wa.me/5564999421093?text=${encodeURIComponent(mensagem)}`, '_blank');
    }
}

function redirecionar() {
    window.location.href = "ysa.html"; // Substitua pelo URL desejado
}
