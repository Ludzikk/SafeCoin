const quizIcon = document.querySelectorAll(".main__quizicon");
const quizCoinName = document.querySelectorAll(".main__quizcoin");
const quizPrice = document.querySelectorAll(".main__price");
const quizItem = document.querySelectorAll(".main__quizitem");
const quizItemInside = document.querySelectorAll(".quiz__item");
const quizBtn = document.querySelectorAll(".main__quizbtn");
const quizTitle = document.querySelector(".quiz__title");
const quizBox = document.querySelector(".quiz");
const quitBtn = document.querySelector("#quit");
const startNextBtn = document.querySelector("#startnext");
const quizList = document.querySelector(".quiz__list");
const questions = [
	["It is cryptocurrency.", "It is money.", "Idk.", "It is not real."],
	["No.", "Yes.", "Let me get my money.", "Never"],
	["Not on this site.", "No.", "Go away", "Yes"],
	["No.", "Leave me alone.", "Yes.", "Let me get my money."],
];
const API = {
	headers: {
		"Content-Type": "application/json",
		"x-access-token":
			"coinrankingcdb587ca6614f8d7a25f8045f80593c8d963533b63e693db",
	},
};
const coinsData = [];
let started = false;
let choosed = false;
let wrongAnswer = false;
let currentQuestion = 0;

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
	let currentItem = 0;

	quizIcon.forEach((icon) => {
		icon.setAttribute("src", coinsData[0][currentIcon].iconUrl);
		icon.setAttribute("alt", coinsData[0][currentIcon].name);
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
		} else if (currentPrice === 1) {
			winPrice = parseFloat(coinsData[0][currentPrice].price / 100).toFixed(2);
		} else {
			winPrice = parseFloat(coinsData[0][currentPrice].price / 2).toFixed(2);
		}

		price.textContent = `${winPrice}$`;
		currentPrice++;
	});

	quizItem.forEach((item) => {
		item.id = currentItem;
		currentItem++;
	});

	quizBtn.forEach((btn) => {
		btn.addEventListener("click", startQuiz);
	});
};

function startQuiz() {
	let i = 0;
	quizList.id = this.parentElement.id;
	quizBox.classList.remove("hidden");
	quizItemInside.forEach((item) => {
		item.textContent = questions[currentQuestion][i];
		i++;
	});
}

const closeQuiz = () => {
	quizBox.classList.add("hidden");
	quizList.classList.add("opacity");
	startNextBtn.classList.remove("hidden");
	startNextBtn.textContent = "Start";
	quizTitle.textContent = "Click start to start quiz";
	started = false;
	currentQuestion = 0;
};

const nextQuestionStart = () => {
	let i = 0;

	if (started === false) {
		quizList.classList.remove("opacity");
		startNextBtn.textContent = "Next";
		quizItemInside.forEach((item) => {
			item.classList.add("click");
		});
		quizTitle.textContent = `What is ${coinsData[0][quizList.id].name}?`;
		started = true;
	}

	if (choosed === true && wrongAnswer === false) {
		quizTitle.textContent = `You won!`;
		quizList.classList.add("opacity");
		startNextBtn.classList.add("hidden");
	}

	// if (choosed === true && wrongAnswer !== true) {
	// 	if (started === true && currentQuestion === 0) {
	// 		currentQuestion++;
	// 		quizTitle.textContent = `Is ${coinsData[0][quizList.id].name} safe?`;
	// 		quizItemInside.forEach((item) => {
	// 			item.textContent = questions[currentQuestion][i];
	// 			i++;
	// 		});
	// 	}
	// else if (started === true && currentQuestion === 1) {
	// 	currentQuestion++;
	// 	quizTitle.textContent = `Will you buy ${coinsData[0][quizList.id].name}?`;
	// 	quizItemInside.forEach((item) => {
	// 		item.textContent = questions[currentQuestion][i];
	// 		i++;
	// 	});
	// } else if (started === true && currentQuestion === 2) {
	// 	currentQuestion++;
	// 	quizTitle.textContent = `Is ${
	// 		coinsData[0][quizList.id].name
	// 	} global currency?`;
	// 	quizItemInside.forEach((item) => {
	// 		item.textContent = questions[currentQuestion][i];
	// 		i++;
	// 	});
	// }
	// }

	if (wrongAnswer === true) {
		resetQuiz();
	}

	quizItemInside.forEach((item) => {
		item.classList.remove("bad-answer");
		item.classList.remove("good-answer");
	});

	choosed = false;
};

const resetQuiz = () => {
	startNextBtn.textContent = "Start";
	quizTitle.textContent = "Click start to start quiz";
	quizList.classList.add("opacity");
	started = false;
	choosed = false;
	wrongAnswer = false;
	currentQuestion = 0;
	quizItemInside.forEach((item) => {
		item.classList.remove("bad-answer");
		item.classList.remove("good-answer");
	});
};

function checkAnswer() {
	if (choosed === false) {
		if (currentQuestion === 0 && parseInt(this.id) === 0) {
			this.classList.add("good-answer");
		} else {
			this.classList.add("bad-answer");
			wrongAnswer = true;
			startNextBtn.textContent = "Reset";
		}

		// if (currentQuestion === 1 && parseInt(this.id) === 1) {
		// 	this.classList.add("good-answer");
		// } else {
		// 	this.classList.add("bad-answer");
		// 	wrongAnswer = true;
		// 	startNextBtn.textContent = "Reset";
		// }
		// if (currentQuestion === 2 && parseInt(this.id) === 3) {
		// 	this.classList.add("good-answer");
		// } else {
		// 	this.classList.add("bad-answer");
		// 	wrongAnswer = true;
		// 	startNextBtn.textContent = "Reset";
		// }
		// if (currentQuestion === 3 && parseInt(this.id) === 2) {
		// 	this.classList.add("good-answer");
		// } else {
		// 	this.classList.add("bad-answer");
		// 	wrongAnswer = true;
		// 	startNextBtn.textContent = "Reset";
		// }
	}
	choosed = true;
}

const addListeners = () => {
	quitBtn.addEventListener("click", closeQuiz);
	startNextBtn.addEventListener("click", nextQuestionStart);
	quizItemInside.forEach((item) => {
		item.addEventListener("click", checkAnswer);
	});
};

addListeners();
