const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const quoteAuthor = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

function showLoadingSpinner() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

function removeLoadingSpinner() {
    loader.hidden = true;
    quoteContainer.hidden = false;
}

// Get Quote from API
async function getQuote(){
    showLoadingSpinner();
    const proxyURL = 'https://tranquil-sea-20147.herokuapp.com/'
    const quoteURL = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
    try {
        const response = await fetch(proxyURL + quoteURL);
        const data = await response.json();
        quoteText.innerText = data.quoteText;
        quoteAuthor.innerText = data.quoteAuthor === '' ? 'Unknown' : data.quoteAuthor;
        data.quoteText.length > 120 ? quoteText.classList.add('long-text') : quoteText.classList.remove('long-text');
        removeLoadingSpinner();
    } catch(error) {
        getQuote();
    }
}

// Tweet quote
function tweetQuote() {
    const quote = quoteText.innerText;
    const author = quoteAuthor.innerText;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(twitterUrl, '_blank');
}

// Event Listeners
newQuoteBtn.addEventListener('click', getQuote);
twitterBtn.addEventListener('click', tweetQuote);

// On Load
getQuote()