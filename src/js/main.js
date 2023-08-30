const footerYear = document.querySelector(".footer__year");
const coinsList = document.querySelector(".main__coins");
const coinsExchange = document.querySelector(".main__input");
const selectSecond = document.querySelector("#selectSecond");
const selectFirst = document.querySelector("#selectFirst");
const select = document.querySelectorAll(".main__select");
const exchangeValue = document.querySelector(".main__exchange-right-value");
const exchangeValueIcon = document.querySelector(".main__value-pic");
const itemNumber = document.querySelectorAll(".main__item-number");
const coinColorOne = "rgb(53, 33, 184)";
const coinColorTwo = "rgb(37, 23, 131)";
const API = {
	headers: {
		"Content-Type": "application/json",
		"x-access-token":
			"coinrankingcdb587ca6614f8d7a25f8045f80593c8d963533b63e693db",
	},
};
const coinsData = [];

const request = fetch("https://api.coinranking.com/v2/coins", API)
	.then((response) => response.json())
	.then((result) => {
		coinsData.push(result.data.coins);
		setCoins();
		setEchangeOptions();
	});

const setCoins = () => {
	for (let i = 0; i < 10; i++) {
		const number = i % 2;
		const coinItem = document.createElement("li");
		const coinIcon = document.createElement("img");
		const coinText = document.createElement("p");
		coinItem.setAttribute("class", "main__coin");
		coinIcon.setAttribute("class", "main__coin-icon");
		coinIcon.setAttribute("src", `${coinsData[0][i].iconUrl}`);
		coinIcon.setAttribute("alt", `${coinsData[0][i].name} Icon`);
		coinText.setAttribute("class", "main__coin-text");
		coinText.textContent = `${coinsData[0][i].symbol} $${parseFloat(
			coinsData[0][i].price
		).toFixed(2)}`;
		coinItem.append(coinIcon, coinText);
		coinsList.append(coinItem);

		switch (number) {
			case 0:
				coinItem.style.backgroundColor = `${coinColorOne}`;
				break;
			case 1:
				coinItem.style.backgroundColor = `${coinColorTwo}`;
				break;
		}
	}
};

const setEchangeOptions = () => {
	for (let i = 0; i < 10; i++) {
		const selectOption = document.createElement("option");
		const optionText = document.createElement("p");
		selectOption.setAttribute("value", i);
		optionText.setAttribute("class", "main__option-text");
		optionText.textContent = coinsData[0][i].symbol;
		selectOption.append(optionText);
		selectSecond.append(selectOption);
	}

	for (let i = 0; i < 10; i++) {
		const selectOption = document.createElement("option");
		const optionText = document.createElement("p");
		selectOption.setAttribute("value", i);
		optionText.setAttribute("class", "main__option-text");
		optionText.textContent = coinsData[0][i].symbol;
		selectOption.append(optionText);
		selectFirst.append(selectOption);
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

const setFooterYear = () => {
	const date = new Date();
	footerYear.textContent = date.getFullYear();
};

const setRandomNumber = () => {
	itemNumber.forEach((item) => {
		const randomNum = Math.floor(Math.random() * 100000 + 50000);
		let startNum = 30000;

		setInterval(() => {
			if(startNum < randomNum){
				startNum += 525;
				item.textContent = startNum;
			}
		}, 10);
	});
};

setFooterYear();
setRandomNumber();

coinsExchange.addEventListener("keyup", setExchange);
