const cryptoList = document.querySelector(".main__cryptolist");
const footerYear = document.querySelector(".footer__year");
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
		// console.log(result.data.coins[0]);
		setList();
	});

const setList = () => {
	coinsData[0].forEach((item) => {
		const number = currentItemNumber % 2;
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
		coinLink.setAttribute("href", "./buyexchange.html")
		coinIcon.setAttribute("src", `${item.iconUrl}`);
		coinIcon.setAttribute("alt", `${item.name} Icon`);
		coinText.setAttribute("class", "main__coin-text");
		coinTextTwo.setAttribute("class", "main__coin-text");
		coinText.textContent = `${item.symbol} $${parseFloat(
			item.price
		).toFixed(2)}`;
		coinTextTwo.textContent = `${item.change}%`;
		coinLink.textContent = "BUY";
		coinBtn.append(coinLink)
		divLeft.append(coinIcon, coinText);
		divRight.append(coinTextTwo, coinBtn);
		coinItem.append(divLeft, divRight);
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

const setFooterYear = () => {
	const date = new Date();
	footerYear.textContent = date.getFullYear();
};

setFooterYear();
