const coinsExchange = document.querySelector(".main__input");
const selectFirst = document.querySelector("#selectFirst");
const selectSecond = document.querySelector("#selectSecond");
const select = document.querySelectorAll(".main__select");
const exchangeValue = document.querySelector(".main__exchange-right-value");
const exchangeValueIcon = document.querySelector(".main__value-pic");
const buyBtn = document.querySelector("#buybtn");
const exchangeBtn = document.querySelector("#exchangebtn");
const middleBuy = document.querySelector(".main__middle--buy");
const middleExchange = document.querySelector(".main__middle--exchange");
const API = {
	headers: {
		"Content-Type": "application/json",
		"x-access-token":
			"coinrankingcdb587ca6614f8d7a25f8045f80593c8d963533b63e693db",
	},
};
const coinsData = [];
let buy = 1;

const request = fetch("https://api.coinranking.com/v2/coins", API)
	.then((response) => response.json())
	.then((result) => {
		coinsData.push(result.data.coins);
		setExchangeOptions();
	});

const setExchangeOptions = () => {
	selectFirst.innerHTML = "";
	selectSecond.innerHTML = "";

	for (let i = 0; i < 10; i++) {
		const selectOption = document.createElement("option");
		const optionText = document.createElement("p");
		selectOption.setAttribute("value", i);
		optionText.setAttribute("class", "main__option-text");
		optionText.textContent = coinsData[0][i].symbol;
		selectOption.append(optionText);
		selectSecond.append(selectOption);
	}

	if (buy === 1) {
		selectFirst.innerHTML = `<option value="EURO">$</option>`;
	}

	if (buy === 0) {
		for (let i = 0; i < 10; i++) {
			const selectOption = document.createElement("option");
			const optionText = document.createElement("p");
			selectOption.setAttribute("value", i);
			optionText.setAttribute("class", "main__option-text");
			optionText.textContent = coinsData[0][i].symbol;
			selectOption.append(optionText);
			selectFirst.append(selectOption);
		}
	}

	select.forEach((item) => {
		item.addEventListener("click", setExchange);
	});
};
const setExchange = () => {
	if (coinsExchange.value.length > 7) {
		coinsExchange.value = coinsExchange.value.slice(0, 7);
	}

	if (coinsExchange.value !== "") {
		if (selectFirst.value === "EURO") {
			exchangeValue.textContent = `${parseFloat(
				coinsExchange.value / coinsData[0][selectSecond.value].price
			).toFixed(9)}`;
		} else if (selectFirst.value !== "EURO") {
			exchangeValue.textContent = `${parseFloat(
				(coinsExchange.value * coinsData[0][selectFirst.value].price) /
					coinsData[0][selectSecond.value].price
			).toFixed(9)}`;
		}
	}

	exchangeValueIcon.setAttribute(
		"src",
		coinsData[0][selectSecond.value].iconUrl
	);
	exchangeValueIcon.setAttribute(
		"alt",
		coinsData[0][selectSecond.value].symbol
	);
};

function checkStatus() {
	if (this.id === "buybtn" && buy === 0) {
		buy++;
		setExchangeOptions();
	} else if (this.id === "exchangebtn" && buy === 1) {
		buy--;
		setExchangeOptions();
	}
}

const addListeners = () => {
	coinsExchange.addEventListener("keyup", setExchange);
	buyBtn.addEventListener("click", checkStatus);
	exchangeBtn.addEventListener("click", checkStatus);
};

addListeners();
