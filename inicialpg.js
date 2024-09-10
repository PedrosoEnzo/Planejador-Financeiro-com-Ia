
document.addEventListener('DOMContentLoaded', () => {
    // IDs de criptomoedas e elementos correspondentes
    const cryptos = [
        { id: 'bitcoin', name: 'btc-price', changeId: 'btc-change', apiId: 'bitcoin' },
        { id: 'ethereum', name: 'eth-price', changeId: 'eth-change', apiId: 'ethereum' },
        { id: 'binancecoin', name: 'bnb-price', changeId: 'bnb-change', apiId: 'binance-coin' },
        { id: 'solana', name: 'sol-price', changeId: 'sol-change', apiId: 'solana' }
    ];

    // Função para buscar e atualizar os preços
    function fetchCryptoPrices() {
        cryptos.forEach(crypto => {
            fetch(`https://api.coincap.io/v2/assets/${crypto.apiId}`)
                .then(response => response.json())
                .then(data => {
                    const price = data.data.priceUsd;
                    const change = data.data.changePercent24Hr;
                    const priceElement = document.getElementById(crypto.name);
                    const changeElement = document.getElementById(crypto.changeId);

                    priceElement.textContent = parseFloat(price).toFixed(2);
                    changeElement.textContent = `${parseFloat(change).toFixed(2)}%`;

                    if (change > 0) {
                        changeElement.classList.add('positive');
                        changeElement.classList.remove('negative');
                    } else {
                        changeElement.classList.add('negative');
                        changeElement.classList.remove('positive');
                    }
                })
                .catch(error => console.error('Error fetching data:', error));
        });
    }

    // Carrega os dados na primeira vez que a página é carregada
    fetchCryptoPrices();

    // Atualiza os preços a cada 5 segundos
    setInterval(fetchCryptoPrices, 3000);
});

