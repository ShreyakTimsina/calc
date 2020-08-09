// INITIAL INVESTMENT DOM OBJECTS
const initialNumberEl = document.getElementById("initial-no");
const initialPriceEl = document.getElementById("initial-price");
const initialTotalEl = document.getElementById("initial-total");

// INVESTMENT FEE AND COMMISSION
const totalPriceEl = document.getElementById("total-price");
const dmatFeeEl = document.getElementById("demat-fee");
const sebonFeeEl = document.getElementById("sebon-fee");
const brokerCommissionEl = document.getElementById("broker-commission");

// INVESTING DOM OBJECTS
const estimatedBonusEl = document.getElementById("bonus-percent");
const estimatedDividendEl = document.getElementById("dividend-percent");
const timeEl = document.getElementById("time");
const finalPriceEl = document.getElementById("estimated-price");
const calcBtn = document.getElementById("calc-btn");

// RESULTS DOM OBJECTS
const finalNumberEl = document.getElementById("final-no");
const finalAddedEl = document.getElementById("final-added");
const finalTotalPriceEl = document.getElementById("final-total-price");
const totalDividendEl = document.getElementById("total-dividend");
const dividendAfterTaxesEl = document.getElementById(
  "total-dividend-after-taxes"
);
const yearlyDividendReturnEl = document.getElementById(
  "percent-dividend-per-year"
);

// Tax and Fee
const resultDematFeeEl = document.getElementById("result-demat-fee");
const resultSebonFeeEl = document.getElementById("result-sebon-fee");
const resultBrokerCommissionEl = document.getElementById(
  "result-broker-commission"
);
const resultGainTaxEl = document.getElementById("result-gain-tax");

const totalReceivableEl = document.getElementById("total-receivable");
const overallTotalEl = document.getElementById("overall-total");
const totalProfitEl = document.getElementById("total-profit");

// CURRENCY FORMATTER
var formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "INR",
});

// SCREEN SCROLL FUNCTION
function scrollScreen() {
  window.scrollBy(0, 350);
}

var totalPayable = 0;

// UPDATE INITIAL TOTAL
function updateTotal() {
  const n = Number(initialNumberEl.value);
  const p = Number(initialPriceEl.value);

  var totalPrice = n * p;

  var dmatFee = 0;
  var sebonFee = 0;
  var brokerCommission = 0;

  if (totalPrice != 0) {
    dmatFee = 25;
    sebonFee = ((0.015 / 100) * totalPrice).toFixed(4);

    // Broker commission
    if (totalPrice <= 50000) {
      brokerCommission = (0.6 / 100) * totalPrice;
      if (brokerCommission < 25) {
        brokerCommission = 25;
      }
    } else if (totalPrice > 50000 && totalPrice <= 500000) {
      brokerCommission = (0.55 / 100) * totalPrice;
    } else if (totalPrice > 500000 && totalPrice <= 2000000) {
      brokerCommission = (0.5 / 100) * totalPrice;
    } else if (totalPrice > 2000000 && totalPrice <= 10000000) {
      brokerCommission = (0.45 / 100) * totalPrice;
    } else if (totalPrice > 10000000) {
      brokerCommission = (0.4 / 100) * totalPrice;
    }
  }

  totalPayable =
    Number(totalPrice) +
    Number(dmatFee) +
    Number(sebonFee) +
    Number(brokerCommission);

  totalPriceEl.textContent = "Total Price: " + formatter.format(totalPrice);
  dmatFeeEl.textContent = "Demat Fee: " + formatter.format(dmatFee);
  sebonFeeEl.textContent = "SEBON Fee: " + formatter.format(sebonFee);
  brokerCommissionEl.textContent =
    "Broker Commission: " + formatter.format(brokerCommission);
  initialTotalEl.textContent = formatter.format(totalPayable);
}

// CALCULATION RESULTS
function calculate() {
  const initialNumber = Number(initialNumberEl.value);
  const initialPrice = Number(initialPriceEl.value);
  const estimatedBonus = Number(estimatedBonusEl.value);
  const estimatedDividend = Number(estimatedDividendEl.value);
  const time = Number(timeEl.value);
  var finalPrice = 0;

  document.querySelector(".results").style.display = "block";
  // SCROLL SCREEN
  scrollScreen();

  if (finalPriceEl.value === "") {
    finalPrice = initialPrice;
  } else {
    finalPrice = Number(finalPriceEl.value);
  }

  var finalNumber = initialNumber;
  var dividendAmount = 0;

  for (i = 0; i < time; i++) {
    dividendAmount = dividendAmount + estimatedDividend * finalNumber;
    finalNumber = Math.floor(
      finalNumber + (estimatedBonus / 100) * finalNumber
    );
  }

  const finalTotalPrice = finalNumber * finalPrice;
  const finalAdded = finalNumber - initialNumber;
  const bonusPrice = finalAdded * 100;
  const bonusTax = 5 * finalAdded;
  const dividendTax = (5 / 100) * dividendAmount;
  const dividendReceivable = dividendAmount - bonusTax - dividendTax;

  // TAXES AND FEES
  var dmatFee = 0;
  var sebonFee = 0;
  var brokerCommission = 0;

  if (finalNumber != 0) {
    dmatFee = 25;
    var sebonFee = ((0.015 / 100) * finalTotalPrice).toFixed(4);

    //  BROKER COMMISSION
    var brokerCommission = 0;
    if (finalTotalPrice <= 50000) {
      brokerCommission = (0.6 / 100) * finalTotalPrice;
      if (brokerCommission < 25) {
        brokerCommission = 25;
      }
    } else if (finalTotalPrice > 50000 && finalTotalPrice <= 500000) {
      brokerCommission = (0.55 / 100) * finalTotalPrice;
    } else if (finalTotalPrice > 500000 && finalTotalPrice <= 2000000) {
      brokerCommission = (0.5 / 100) * finalTotalPrice;
    } else if (finalTotalPrice > 2000000 && finalTotalPrice <= 10000000) {
      brokerCommission = (0.45 / 100) * finalTotalPrice;
    } else if (finalTotalPrice > 10000000) {
      brokerCommission = (0.4 / 100) * finalTotalPrice;
    }
  }

  // CAPITAL GAIN TAX
  const taxableProfit =
    finalTotalPrice -
    dmatFee -
    sebonFee -
    brokerCommission -
    totalPayable -
    bonusPrice;
  var capitalGainTax = (5 / 100) * taxableProfit;
  if (capitalGainTax < 0) {
    capitalGainTax = 0;
  }
  const totalReceivable =
    finalTotalPrice - dmatFee - sebonFee - brokerCommission - capitalGainTax;
  const totalProfit = totalReceivable - totalPayable;

  //   DISPLAYING RESULTS IN THE DOM
  finalNumberEl.textContent = finalNumber;

  finalAddedEl.textContent = finalAdded;

  finalTotalPriceEl.textContent = formatter.format(finalTotalPrice);

  totalDividendEl.textContent = formatter.format(dividendAmount);

  dividendAfterTaxesEl.textContent = formatter.format(dividendReceivable);

  yearlyDividendReturnEl.textContent =
    ((dividendReceivable / time / totalPayable) * 100).toFixed(2) + "%";

  // GAIN TAX AND FEES
  resultDematFeeEl.textContent = formatter.format(dmatFee);
  resultSebonFeeEl.textContent = formatter.format(sebonFee);
  resultBrokerCommissionEl.textContent = formatter.format(brokerCommission);
  resultGainTaxEl.textContent = formatter.format(capitalGainTax);

  totalReceivableEl.textContent = formatter.format(totalReceivable);

  overallTotalEl.textContent = formatter.format(
    totalReceivable + dividendReceivable
  );

  totalProfitEl.textContent =
    formatter.format(totalProfit + dividendReceivable) +
    " / " +
    (((totalProfit + dividendReceivable) / totalPayable) * 100).toFixed(2) +
    "%";
}

// -----------EVENT LISTENERS

// UPDATE INITIAL TOTAL EVENT LISTENERS
initialNumberEl.addEventListener("keyup", updateTotal);
initialPriceEl.addEventListener("keyup", updateTotal);

// MAIN CALCULATION EVENT LISTENERS
calcBtn.addEventListener("click", calculate);
window.addEventListener("keypress", (e) => {
  if (e.keyCode == 13) {
    calculate();
  }
});
