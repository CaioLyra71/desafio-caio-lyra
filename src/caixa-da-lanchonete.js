class CaixaDaLanchonete {
  calcularValorDaCompra(metodoDePagamento, itens) {
    const cardapio = {
      cafe: { descricao: "Café", valor: 3.0 },
      chantily: { descricao: "Chantily (extra do Café)", valor: 1.5 },
      suco: { descricao: "Suco Natural", valor: 6.2 },
      sanduiche: { descricao: "Sanduíche", valor: 6.5 },
      queijo: { descricao: "Queijo (extra do Sanduíche)", valor: 2.0 },
      salgado: { descricao: "Salgado", valor: 7.25 },
      combo1: { descricao: "1 Suco e 1 Sanduíche", valor: 9.5 },
      combo2: { descricao: "1 Café e 1 Sanduíche", valor: 7.5 },
    };

    const formasDePagamento = ["dinheiro", "debito", "credito"];

    if (!formasDePagamento.includes(metodoDePagamento)) {
      return "Forma de pagamento inválida!";
    }

    if (itens.length === 0) {
      return "Não há itens no carrinho de compra!";
    }

    let totalCompra = 0;
    const itemsMap = {};
    const itensExtra = [];
    const itensPrincipais = [];

    for (const itemInfo of itens) {
      const [codigo, quantidade] = itemInfo.split(",");
      const item = cardapio[codigo];

      if (!item) {
        return "Item inválido!";
      }

      if (!itemsMap[codigo]) {
        itemsMap[codigo] = 0;
      }

      itemsMap[codigo] += parseInt(quantidade);
    }

    for (const codigo in itemsMap) {
      const item = cardapio[codigo];
      const quantidade = itemsMap[codigo];

      if (item.descricao.includes("extra")) {
        itensExtra.push(codigo);
      }

      if (!item.descricao.includes("extra")) {
        itensPrincipais.push(codigo);
      }

      totalCompra += item.valor * quantidade;
    }

    if (itensExtra.includes("chantily") && !itensPrincipais.includes("cafe")) {
      return "Item extra não pode ser pedido sem o principal";
    }

    if (
      itensExtra.includes("queijo") &&
      !itensPrincipais.includes("sanduiche")
    ) {
      return "Item extra não pode ser pedido sem o principal";
    }

    if (totalCompra === 0) {
      return "Quantidade inválida!";
    }

    if (metodoDePagamento === "dinheiro") {
      totalCompra *= 0.95;
    } else if (metodoDePagamento === "credito") {
      totalCompra *= 1.03;
    }

    return `R$ ${totalCompra.toFixed(2).replace(".", ",")}`;
  }
}

export { CaixaDaLanchonete };
