// INITIAL INVESTMENT DOM OBJECTS
const initialNumber = document.getElementById("initial-no");
const initialPrice = document.getElementById("initial-price");
const initialTotal = document.getElementById("initial-total");

// INVESTING DOM OBJECTS
const estimatedBonus = document.getElementById("bonus-percent");
const estimatedDividend = document.getElementById("dividend-percent");
const time = document.getElementById("time");
const finalPrice = document.getElementById("estimated-price");
const calcBtn = document.getElementById("calc-btn");

// RESULTS DOM OBJECTS
const finalNumber = document.getElementById("final-no");
const finalAdded = document.getElementById("final-added");
const finalTotalPrice = document.getElementById("final-total-price");
const totalDividend = document.getElementById("total-dividend");
const dividendPerYear = document.getElementById("total-dividend-per-year");
const yearlyDividendReturn = document.getElementById(
  "percent-dividend-per-year"
);
const grandTotal = document.getElementById("grand-total");
const totalReturns = document.getElementById("total-returns");
const yearlyReturns = document.getElementById("yearly-returns");

// CURRENCY FORMATTER
var formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "INR",
});

// CALCULATION FUNCTION
function calculate() {
  const n = Number(initialNumber.value);
  const p = Number(initialPrice.value);
  const b = Number(estimatedBonus.value);
  const d = Number(estimatedDividend.value);
  const t = Number(time.value);
  var f = 0;

  document.querySelector(".results").style.display = "block";

  if (finalPrice.value === "") {
    f = p;
  } else {
    f = Number(finalPrice.value);
  }

  var x = n;
  var y = 0;

  for (i = 0; i < t; i++) {
    y = y + d * x;
    x = Math.floor(x + (b / 100) * x);
  }

  //   DISPLAYING RESULTS IN THE DOM
  finalNumber.textContent = x;
  finalAdded.textContent = x - n;
  finalTotalPrice.textContent = formatter.format(x * f);
  totalDividend.textContent = formatter.format(y);
  dividendPerYear.textContent = formatter.format(y / t);
  yearlyDividendReturn.textContent = ((y / t / (n * p)) * 100).toFixed(2) + "%";
  grandTotal.textContent = formatter.format(y + x * f);
  totalReturns.textContent =
    formatter.format(y + x * f - n * p) +
    " / " +
    (((y + x * f - n * p) * 100) / (n * p)).toFixed(2) +
    "%";
  yearlyReturns.textContent =
    formatter.format((y + x * f - n * p) / t) +
    " / " +
    ((((y + x * f - n * p) / t) * 100) / (n * p)).toFixed(2) +
    "%";

  // SCROLL SCREEN
  scrollScreen();
}

// SCREEN SCROLL FUNCTION
function scrollScreen() {
  window.scrollBy(0, 350);
}

// UPDATE INITIAL TOTAL
function updateTotal() {
  const n = Number(initialNumber.value);
  const p = Number(initialPrice.value);

  initialTotal.textContent = formatter.format(n * p);
}

// -----------EVENT LISTENERS

// UPDATE INITIAL TOTAL EVENT LISTENERS
initialNumber.addEventListener("keyup", updateTotal);
initialPrice.addEventListener("keyup", updateTotal);

// MAIN CALCULATION EVENT LISTENERS
calcBtn.addEventListener("click", calculate);
window.addEventListener("keypress", (e) => {
  if (e.keyCode == 13) {
    calculate();
  }
});
