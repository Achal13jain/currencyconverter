document.getElementById("convertBtn").addEventListener("click", function () {
    const convertBtn = document.getElementById("convertBtn");
    const amount = parseFloat(document.getElementById("amount").value);
    const sourceCurrency = document.getElementById("sourceCurrency").value;
    const targetCurrency = document.getElementById("targetCurrency").value;
    const resultContainer = document.getElementById("result");


    resultContainer.innerHTML = '<p class="loading">Converting...</p>';
    convertBtn.disabled = true;

    if (isNaN(amount) || amount <= 0) {
        resultContainer.innerHTML = '<p class="error">Please enter a valid amount.</p>';
        convertBtn.disabled = false;
        return;
    }

    fetchExchangeRate(sourceCurrency, targetCurrency)
        .then(exchangeRate => {
            const convertedAmount = (amount * exchangeRate).toLocaleString(undefined, {
                style: 'currency',
                currency: targetCurrency,
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            });
            resultContainer.innerHTML = `
                <p>${amount.toLocaleString()} ${sourceCurrency} equals</p>
                <p class="converted-amount">${convertedAmount}</p>`;
        })
        .catch(error => {
            console.error("Error fetching exchange rates:", error);
            resultContainer.innerHTML = '<p class="error">An error occurred. Please try again later.</p>';
        })
        .finally(() => {
            convertBtn.disabled = false;
        });
});


function fetchExchangeRate(sourceCurrency, targetCurrency) {
    return fetch(`https://api.exchangerate-api.com/v4/latest/${sourceCurrency}`)
        .then(response => response.json())
        .then(data => {
            return data.rates[targetCurrency];
        });
}

const resetBtn = document.getElementById("resetBtn");

resetBtn.addEventListener("click", function () {

    location.reload();
});


