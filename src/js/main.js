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
		const divLeft = document.createElement("div");
		const divRight = document.createElement("div");
		const coinIcon = document.createElement("img");
		const coinText = document.createElement("p");
		const coinTextTwo = document.createElement("p");
		const coinBtn = document.createElement("button");
		const coinLink = document.createElement("a");
		divLeft.setAttribute("class", "main__coin-left");
		divRight.setAttribute("class", "main__coin-right");
		coinItem.setAttribute("class", "main__coin");
		coinIcon.setAttribute("class", "main__coin-icon");
		coinBtn.setAttribute("class", "main__coin-btn");
		coinLink.setAttribute("class", "main__coin-link");
		coinLink.setAttribute("href", "./buyexchange.html");
		coinIcon.setAttribute("src", `${coinsData[0][i].iconUrl}`);
		coinIcon.setAttribute("alt", `${coinsData[0][i].name} Icon`);
		coinText.setAttribute("class", "main__coin-text");
		coinTextTwo.setAttribute("class", "main__coin-text");
		coinText.textContent = `${coinsData[0][i].symbol} $${parseFloat(
			coinsData[0][i].price
		).toFixed(2)}`;
		coinTextTwo.textContent = `${coinsData[0][i].change}%`;
		coinLink.textContent = "BUY";
		coinBtn.append(coinLink);
		divLeft.append(coinIcon, coinText);
		divRight.append(coinTextTwo, coinBtn);
		coinItem.append(divLeft, divRight);
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

const setRandomNumber = () => {
	itemNumber.forEach((item) => {
		const randomNum = Math.floor(Math.random() * 100000 + 50000);
		let startNum = 30000;

		setInterval(() => {
			if (startNum < randomNum) {
				startNum += 525;
				item.textContent = startNum;
			}
		}, 10);
	});
};

setRandomNumber();
