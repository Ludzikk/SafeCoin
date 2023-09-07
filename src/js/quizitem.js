const quizIcon = document.querySelectorAll(".main__quizicon");
const quizCoinName = document.querySelectorAll(".main__quizcoin");
const quizPrice = document.querySelectorAll(".main__price");
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
		setIconOfItem();
		// console.log(coinsData[0][0]);
	});

const setIconOfItem = () => {
	let currentName = 0;
	let currentIcon = 0;
	let currentPrice = 0;

	quizIcon.forEach((icon) => {
		icon.setAttribute("src", coinsData[0][currentIcon].iconUrl);
		currentIcon++;
	});

	quizCoinName.forEach((name) => {
		name.textContent = coinsData[0][currentName].name;
		currentName++;
	});

	quizPrice.forEach((price) => {
		let winPrice = 0;
		if (currentPrice === 0) {
			winPrice = parseFloat(coinsData[0][currentPrice].price / 1000).toFixed(2);
		} else if (currentPrice ===1) {
			winPrice = parseFloat(coinsData[0][currentPrice].price / 100).toFixed(2);
		} else {
            winPrice = parseFloat(coinsData[0][currentPrice].price / 2).toFixed(2);
        }

		price.textContent = `${winPrice}$`;
		currentPrice++;
	});
};
