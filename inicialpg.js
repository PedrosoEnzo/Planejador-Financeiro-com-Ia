document.addEventListener('DOMContentLoaded', function() {
    const btcPriceElem = document.getElementById('btc-price');
    const btcChangeElem = document.getElementById('btc-change');
    const ethPriceElem = document.getElementById('eth-price');
    const ethChangeElem = document.getElementById('eth-change');
    const bnbPriceElem = document.getElementById('bnb-price');
    const bnbChangeElem = document.getElementById('bnb-change');
    const solPriceElem = document.getElementById('sol-price');
    const solChangeElem = document.getElementById('sol-change');

    const apiUrl = 'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,binancecoin,solana&vs_currencies=usd&include_24hr_change=true';

    function updateCryptoData() {
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                // Bitcoin
                btcPriceElem.textContent = data.bitcoin.usd.toFixed(2);
                btcChangeElem.textContent = data.bitcoin.usd_24h_change.toFixed(2) + '%';
                
                // Ethereum
                ethPriceElem.textContent = data.ethereum.usd.toFixed(2);
                ethChangeElem.textContent = data.ethereum.usd_24h_change.toFixed(2) + '%';
                
                // Binance Coin
                bnbPriceElem.textContent = data.binancecoin.usd.toFixed(2);
                bnbChangeElem.textContent = data.binancecoin.usd_24h_change.toFixed(2) + '%';
                
                // Solana
                solPriceElem.textContent = data.solana.usd.toFixed(2);
                solChangeElem.textContent = data.solana.usd_24h_change.toFixed(2) + '%';
            })
            .catch(error => {
                console.error('Erro ao obter dados das criptomoedas:', error);
            });
    }

    // Atualiza os dados assim que a página é carregada
    updateCryptoData();

    // Atualiza os dados a cada 60 segundos
    setInterval(updateCryptoData, 3000);
});
