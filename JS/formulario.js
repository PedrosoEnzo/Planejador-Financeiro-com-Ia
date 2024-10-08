document.getElementById("financialForm").addEventListener("submit", function(event) {
    event.preventDefault();

    // Coletar dados do formulário
    const renda = parseFloat(document.getElementById("renda").value);
    const despesas = parseFloat(document.getElementById("despesas").value);
    const objetivo = document.getElementById("objetivo").value;
    const perfil = document.getElementById("perfil").value;

    // Cálculo de sobra mensal
    const sobra = renda - despesas;

    // Direcionamento baseado nas respostas
    let mensagem = '';

    if (sobra < 0) {
      mensagem = "Você está gastando mais do que ganha. É importante reduzir suas despesas ou aumentar sua renda antes de pensar em investir.";
    } else if (sobra === 0) {
      mensagem = "Você está equilibrado entre renda e despesas, mas seria interessante encontrar maneiras de poupar uma parte da sua renda.";
    } else {
      mensagem = `Você está economizando R$ ${sobra.toFixed(2)} por mês. Aqui estão algumas sugestões baseadas no seu perfil de investidor e objetivo:\n\n`;

      if (perfil === "conservador") {
        mensagem += "Sugerimos investir em produtos de baixo risco, como Tesouro Direto, CDBs de bancos sólidos e fundos de renda fixa.";
      } else if (perfil === "moderado") {
        mensagem += "Como investidor moderado, você pode diversificar sua carteira com Tesouro Direto, CDBs e fundos de investimento multimercado.";
      } else if (perfil === "agressivo") {
        mensagem += "Como investidor agressivo, você pode buscar ativos de maior risco e potencial de retorno, como ações, fundos imobiliários e criptomoedas.";
      }

      // Personalização adicional com base no objetivo
      mensagem += "\n\nPara o seu objetivo de " + objetivo + ", recomendamos ajustar a alocação do seu portfólio para atingir suas metas no prazo desejado.";
    }

    document.getElementById("resultado").innerText = mensagem;
  });