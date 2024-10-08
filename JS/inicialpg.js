document.addEventListener('DOMContentLoaded', () => {
    // IDs de criptomoedas e elementos correspondentes no HTML
    const cryptos = [
        { id: 'bitcoin', name: 'btc-price', changeId: 'btc-change', apiId: 'bitcoin' },   // Bitcoin
        { id: 'ethereum', name: 'eth-price', changeId: 'eth-change', apiId: 'ethereum' }, // Ethereum
        { id: 'binancecoin', name: 'bnb-price', changeId: 'bnb-change', apiId: 'binance-coin' }, // Binance Coin
        { id: 'solana', name: 'sol-price', changeId: 'sol-change', apiId: 'solana' }      // Solana
    ];

    // Função que faz a requisição para buscar e atualizar os preços das criptomoedas
    function fetchCryptoPrices() {
        // Itera sobre o array de criptomoedas
        cryptos.forEach(crypto => {
            // Faz uma requisição à API CoinCap usando o ID da criptomoeda correspondente
            fetch(`https://api.coincap.io/v2/assets/${crypto.apiId}`)
                .then(response => response.json())  // Converte a resposta em JSON
                .then(data => {
                    const price = data.data.priceUsd; // Obtém o preço da criptomoeda em USD
                    const change = data.data.changePercent24Hr; // Obtém a variação percentual nas últimas 24 horas

                    // Obtém os elementos HTML onde o preço e a variação serão exibidos
                    const priceElement = document.getElementById(crypto.name);
                    const changeElement = document.getElementById(crypto.changeId);

                    // Atualiza o conteúdo de texto dos elementos com os valores formatados
                    priceElement.textContent = parseFloat(price).toFixed(2); // Formata o preço com duas casas decimais
                    changeElement.textContent = `${parseFloat(change).toFixed(2)}%`; // Formata a variação com duas casas decimais

                    // Verifica se a variação é positiva ou negativa para ajustar as classes CSS
                    if (change > 0) {
                        changeElement.classList.add('positive');  // Adiciona a classe 'positive' se for positivo
                        changeElement.classList.remove('negative'); // Remove a classe 'negative'
                    } else {
                        changeElement.classList.add('negative');  // Adiciona a classe 'negative' se for negativo
                        changeElement.classList.remove('positive'); // Remove a classe 'positive'
                    }
                })
                // Caso ocorra algum erro na requisição, ele será exibido no console
                .catch(error => console.error('Error fetching data:', error));
        });
    }

    // Carrega os dados na primeira vez que a página é carregada
    fetchCryptoPrices();

    // Define um intervalo para atualizar os preços a cada 3 segundos (3000 milissegundos)
    setInterval(fetchCryptoPrices, 3000);
});
