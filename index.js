// L'url ou nous allons chercher le json
const requestURL = 'https://api.coindesk.com/v1/bpi/currentprice.json'
  // Pour créé une requete nous avons besoin d'instancier notre objet 'XMLHttpRequest'
const request = new XMLHttpRequest();
// On ouvre la requete
request.open('GET', requestURL);
// On donne le type ou format de la requete
request.responseType = 'json';

// On demande à request de ce lancer au chargement de la page et de faire ça ...
request.onload = () => {
  // On défini notre variable qui va acceuillir nos nouvelle data
  var currency = request.response;
  // On execute getPrice et nous lui donnons les data nécessaire
  getPrice(currency)
  getConverter(currency)
  // le log de l'objet reçu
  console.log(currency)
}

// On lance notre requete
request.send();

// Récupération des ID pour y metre le résultat
const priceDiv = document.getElementById('prices')

// On créé un fonction getPrice qui prend currency
function getPrice(currency) {
  // On déclare nos variable = au prix renvoyer par l'objet currency
  let USD = currency.bpi.USD.rate
  let EUR = currency.bpi.EUR.rate
  let GBP = currency.bpi.GBP.rate

  // On déclare notre variable qui est la création d'un H4
  const price = `
    <h4 id="priceUSD">` + USD + ` USD ($)</h4>
    <h4 id="priceEUR">` + EUR + ` EUR (€)</h4>
    <h4 id="priceGBP">` + GBP + ` GBP (£)</h4>
  `
  priceDiv.innerHTML = price

}

// Récupération de nos valeurs pour les calculer

function getConverter(currency) {

  // déclaration de la récupération de nos ID
  const btc = document.getElementById('btc');
  const usd = document.getElementById('usd');
  const eur = document.getElementById('eur');
  const gbp = document.getElementById('gbp');

  // On demande à nos variable d'etre à l'écoute de l'événement du input
  btc.addEventListener("input", function() {
    // On défini que notre function getResult devra contenir 2 valeur un ID et la value du input
    getResult(this.id, this.value, currency);
  });
  usd.addEventListener("input", function() {
    getResult(this.id, this.value, currency);
  });
  eur.addEventListener("input", function() {
    getResult(this.id, this.value, currency);
  });
  gbp.addEventListener("input", function() {
    getResult(this.id, this.value, currency);
  });

  // On déclare getResult qui prend 2 callback de l'écoute de notre variable
  function getResult(id, valeur, currency) {
    // On défini le ratio entre les devises
    const ratioUsdEur = currency.bpi.USD.rate_float / currency.bpi.EUR.rate_float
        , ratioUsdGbp = currency.bpi.USD.rate_float / currency.bpi.GBP.rate_float

    if (id == "btc") {
      usd.value = valeur * currency.bpi.USD.rate_float;
      eur.value = valeur * currency.bpi.EUR.rate_float;
      gbp.value = valeur * currency.bpi.GBP.rate_float;

    } else if (id == "usd") {
      btc.value = valeur / currency.bpi.USD.rate_float;
      eur.value = valeur / ratioUsdEur;
      gbp.value = valeur / ratioUsdGbp;

    } else if (id == "eur") {
      btc.value = valeur / currency.bpi.EUR.rate_float;
      usd.value = valeur * ratioUsdEur;
      gbp.value = valeur / ratioUsdGbp;

    } else if (id == "gbp") {
      btc.value = valeur / currency.bpi.EUR.rate_float;
      usd.value = valeur * ratioUsdEur;
      eur.value = valeur / ratioUsdEur;

    }

  }

}