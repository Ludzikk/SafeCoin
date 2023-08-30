const hamburgerBtn = document.querySelector(".hamburger");
const mobileNav = document.querySelector(".header__nav");
const mobileLink = document.querySelectorAll(".header__link");

const addListeners = () => {
	hamburgerBtn.addEventListener("click", toggleMobileNav);

	mobileLink.forEach((link) => {
		link.addEventListener("click", toggleMobileNav);
	});
};

const toggleMobileNav = () => {
	mobileNav.classList.toggle("hidden");
	hamburgerBtn.classList.toggle("is-active");
	document.body.classList.toggle("body-hidden");
};

addListeners();
