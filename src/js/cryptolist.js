const cryptoList = document.querySelector(".main__cryptolist");
const API = {
	headers: {
		"Content-Type": "application/json",
		"x-access-token":
			"coinrankingcdb587ca6614f8d7a25f8045f80593c8d963533b63e693db",
	},
};
const coinsData = [];
const coinColorOne = "rgb(53, 33, 184)";
const coinColorTwo = "rgb(37, 23, 131)";
let currentItemNumber = 0;

const request = fetch("https://api.coinranking.com/v2/coins", API)
	.then((response) => response.json())
	.then((result) => {
		coinsData.push(result.data.coins);
		setList();
	});

const setList = () => {
	coinsData[0].forEach((item) => {
		const number = currentItemNumber % 2;
		const coinItem = document.createElement("li");
		const coinIcon = document.createElement("img");
		const coinText = document.createElement("p");
		const coinLink = document.createElement("a");
		coinLink.setAttribute("class", "main__cryptoitem-link");
		coinLink.setAttribute("href", "./index.html#buy");
		coinItem.setAttribute("class", "main__cryptoitem");
		coinIcon.setAttribute("class", "main__cryptoitem-icon");
		coinIcon.setAttribute("src", `${item.iconUrl}`);
		coinIcon.setAttribute("alt", `${item.name} Icon`);
		coinText.setAttribute("class", "main__cryptoitem-text");
		coinText.textContent = `${item.symbol} $${parseFloat(item.price).toFixed(
			2
		)}`;
		coinLink.append(coinIcon, coinText);
		coinItem.append(coinLink);
		cryptoList.append(coinItem);
		currentItemNumber++;

		switch (number) {
			case 0:
				coinItem.style.backgroundColor = `${coinColorOne}`;
				break;
			case 1:
				coinItem.style.backgroundColor = `${coinColorTwo}`;
				break;
		}
	});
};
