// INPUT DOM ELEMENTS
const principle = document.getElementById("principle");
const time = document.getElementById("time");
const rate = document.getElementById("rate");

// RESULTS DOM ELEMENTS
const interest = document.getElementById("interest");
const amount = document.getElementById("amount");
const interestPerYear = document.getElementById("interest-per-year");
// CALCULATE BUTTON
const calcBtn = document.getElementById("calc-btn");

var formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "INR",
});

function calculate() {
  document.querySelector(".results").style.display = "block";

  const p = Number(principle.value);
  const r = Number(rate.value);
  const t = Number(time.value);

  const i = (p * t * r) / 100;
  interest.textContent = formatter.format(i);

  const a = p + i;
  amount.textContent = formatter.format(a);

  const yearlyInterest = i / t;
  interestPerYear.textContent = formatter.format(yearlyInterest);
}

calcBtn.addEventListener("click", calculate);
window.addEventListener("keypress", (e) => {
  if (e.keyCode == 13) {
    calculate();
  }
});
