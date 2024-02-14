let countryList = {
  AED: "AE",
  AFN: "AF",
  XCD: "AG",
  ALL: "AL",
  AMD: "AM",
  ANG: "AN",
  AOA: "AO",
  AQD: "AQ",
  ARS: "AR",
  AUD: "AU",
  AZN: "AZ",
  BAM: "BA",
  BBD: "BB",
  BDT: "BD",
  XOF: "BE",
  BGN: "BG",
  BHD: "BH",
  BIF: "BI",
  BMD: "BM",
  BND: "BN",
  BOB: "BO",
  BRL: "BR",
  BSD: "BS",
  NOK: "BV",
  BWP: "BW",
  BYR: "BY",
  BZD: "BZ",
  CAD: "CA",
  CDF: "CD",
  XAF: "CF",
  CHF: "CH",
  CLP: "CL",
  CNY: "CN",
  COP: "CO",
  CRC: "CR",
  CUP: "CU",
  CVE: "CV",
  CYP: "CY",
  CZK: "CZ",
  DJF: "DJ",
  DKK: "DK",
  DOP: "DO",
  DZD: "DZ",
  ECS: "EC",
  EEK: "EE",
  EGP: "EG",
  ETB: "ET",
  EUR: "FR",
  FJD: "FJ",
  FKP: "FK",
  GBP: "GB",
  GEL: "GE",
  GGP: "GG",
  GHS: "GH",
  GIP: "GI",
  GMD: "GM",
  GNF: "GN",
  GTQ: "GT",
  GYD: "GY",
  HKD: "HK",
  HNL: "HN",
  HRK: "HR",
  HTG: "HT",
  HUF: "HU",
  IDR: "ID",
  ILS: "IL",
  INR: "IN",
  IQD: "IQ",
  IRR: "IR",
  ISK: "IS",
  JMD: "JM",
  JOD: "JO",
  JPY: "JP",
  KES: "KE",
  KGS: "KG",
  KHR: "KH",
  KMF: "KM",
  KPW: "KP",
  KRW: "KR",
  KWD: "KW",
  KYD: "KY",
  KZT: "KZ",
  LAK: "LA",
  LBP: "LB",
  LKR: "LK",
  LRD: "LR",
  LSL: "LS",
  LTL: "LT",
  LVL: "LV",
  LYD: "LY",
  MAD: "MA",
  MDL: "MD",
  MGA: "MG",
  MKD: "MK",
  MMK: "MM",
  MNT: "MN",
  MOP: "MO",
  MRO: "MR",
  MTL: "MT",
  MUR: "MU",
  MVR: "MV",
  MWK: "MW",
  MXN: "MX",
  MYR: "MY",
  MZN: "MZ",
  NAD: "NA",
  XPF: "NC",
  NGN: "NG",
  NIO: "NI",
  NPR: "NP",
  NZD: "NZ",
  OMR: "OM",
  PAB: "PA",
  PEN: "PE",
  PGK: "PG",
  PHP: "PH",
  PKR: "PK",
  PLN: "PL",
  PYG: "PY",
  QAR: "QA",
  RON: "RO",
  RSD: "RS",
  RUB: "RU",
  RWF: "RW",
  SAR: "SA",
  SBD: "SB",
  SCR: "SC",
  SDG: "SD",
  SEK: "SE",
  SGD: "SG",
  SKK: "SK",
  SLL: "SL",
  SOS: "SO",
  SRD: "SR",
  STD: "ST",
  SVC: "SV",
  SYP: "SY",
  SZL: "SZ",
  THB: "TH",
  TJS: "TJ",
  TMT: "TM",
  TND: "TN",
  TOP: "TO",
  TRY: "TR",
  TTD: "TT",
  TWD: "TW",
  TZS: "TZ",
  UAH: "UA",
  UGX: "UG",
  USD: "US",
  UYU: "UY",
  UZS: "UZ",
  VEF: "VE",
  VND: "VN",
  VUV: "VU",
  YER: "YE",
  ZAR: "ZA",
  ZMK: "ZM",
  ZWD: "ZW"
};

let apiKey = "7efcfbd5e304be1aa82da9ba";

const fromCurrencySelect = document.getElementById("fromCurrency");
const toCurrencySelect = document.getElementById("toCurrency");
const getButton = document.getElementById("getButton");
const exchangeRateText = document.getElementById("exchangeRateText");

function loadDropdowns() {
  for (let currencyCode in countryList) {
    const option = document.createElement("option");
    option.value = currencyCode;
    option.text = currencyCode;
    fromCurrencySelect.appendChild(option);
    toCurrencySelect.appendChild(option.cloneNode(true));
  }

  // Set default initial values (e.g., USD to EUR)
  fromCurrencySelect.value = "USD";
  toCurrencySelect.value = "EUR";
  

  loadFlag(fromCurrencySelect,countryList[fromCurrencySelect.value]);
  loadFlag(toCurrencySelect,countryList[toCurrencySelect.value]);
}

function loadFlag(element,value) {
  const imgTag = element.parentElement.querySelector("img");
  if (imgTag) {
    const countryCode = value.toLowerCase();
    console.log(countryCode)
    imgTag.src = `https://flagcdn.com/48x36/${countryCode}.png`;
  }
}

window.addEventListener("load", () => {
  loadDropdowns();
  getExchangeRate();
});

fromCurrencySelect.addEventListener("change", async () => {
  const countryCode = countryList[fromCurrencySelect.value];
  loadFlag(fromCurrencySelect, countryCode);
  await getExchangeRate()
});

toCurrencySelect.addEventListener("change", async() => {
  const countryCode = countryList[toCurrencySelect.value];
  loadFlag(toCurrencySelect, countryCode);
  await getExchangeRate()

});


getButton.addEventListener("click", (e) => {
  e.preventDefault();
  getExchangeRate();
});

async function getExchangeRate() {
  loadFlag(fromCurrencySelect,countryList[fromCurrencySelect.value]);
  loadFlag(toCurrencySelect,countryList[toCurrencySelect.value]);
  const amount = parseFloat(document.getElementById("amount").value);
  const fromCurrency = fromCurrencySelect.value;
  const toCurrency = toCurrencySelect.value;

  if (!amount || isNaN(amount) || amount <= 0) {
    exchangeRateText.textContent = "Invalid amount";
    return;
  }

  exchangeRateText.textContent = "Getting exchange rate...";

  let url = `https://v6.exchangerate-api.com/v6/7efcfbd5e304be1aa82da9ba/latest/${fromCurrency}`;
  const data = await fetch(url);
  const jsondata = await data.json();
  const rate = jsondata.conversion_rates[toCurrency] * amount;
  console.log(rate)
  console.log(fromCurrency)
console.log(toCurrency)
exchangeRateText.textContent = `${amount} ${fromCurrency} = ${rate} ${toCurrency}`

}