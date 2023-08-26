const footerYear = document.querySelector(".footer__year");
const coinsList = document.querySelector(".main__coins");
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
	});

const setCoins = () => {
	console.log(coinsData[0][0]);
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

const setFooterYear = () => {
	const date = new Date();
	footerYear.textContent = date.getFullYear();
};

setFooterYear();
