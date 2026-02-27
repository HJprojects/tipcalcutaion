// JS
const $ = (id) => document.getElementById(id);

const els = {
  card: $("cardTip"),
  cash: $("cashTip"),
  delivery: $("deliveryTip"),
  calc: $("calcBtn"),
  reset: $("resetBtn"),
  out: {
    total: $("totalOut"),
    kitchen: $("kitchenOut"),
    tax: $("taxOut"),
    kitchenNet: $("kitchenNetOut"),
    s10: $("split10"),
    s9: $("split9"),
    s5: $("split5"),
    myTip: $("myTipOut"),
  }
};

function toNum(v) {
  const n = parseFloat(v);
  return Number.isFinite(n) ? n : 0;
}

function money(n) {
  // -0.00 방지
  const fixed = (Math.round((n + Number.EPSILON) * 100) / 100);
  const safe = Object.is(fixed, -0) ? 0 : fixed;
  return `$${safe.toFixed(2)}`;
}

function round2(n) {
  return Math.round((n + Number.EPSILON) * 100) / 100;
}

function calculate() {
  const card = toNum(els.card.value);
  const cash = toNum(els.cash.value);
  const delivery = toNum(els.delivery.value);

  const total = round2(card + cash + delivery);

  const kitchenTip = round2(total * 0.2);
  const tax = round2(kitchenTip * 0.1);
  const kitchenNet = round2(kitchenTip - tax);

  // 10 : 9 : 5
  const sum = 10 + 9 + 5; // 24
  const split10 = round2(kitchenNet * (10 / sum));
  const split9  = round2(kitchenNet * (9 / sum));
  const split5  = round2(kitchenNet * (5 / sum));

  const myTip = round2(total - (kitchenTip + tax));

  // 출력
  els.out.total.textContent = money(total);
  els.out.kitchen.textContent = money(kitchenTip);
  els.out.tax.textContent = money(tax);
  els.out.kitchenNet.textContent = money(kitchenNet);
  els.out.s10.textContent = money(split10);
  els.out.s9.textContent = money(split9);
  els.out.s5.textContent = money(split5);
  els.out.myTip.textContent = money(myTip);
}

function resetAll() {
  els.card.value = "";
  els.cash.value = "";
  els.delivery.value = "";
  calculate(); // 0으로 다시 표시
  els.card.focus();
}

els.calc.addEventListener("click", calculate);
els.reset.addEventListener("click", resetAll);

// 엔터 키로도 계산되게
[els.card, els.cash, els.delivery].forEach((inp) => {
  inp.addEventListener("keydown", (e) => {
    if (e.key === "Enter") calculate();
  });
});

// 초기값 표시
calculate();
