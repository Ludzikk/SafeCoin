const hamburgerBtn = document.querySelector(".hamburger");
const mobileNav = document.querySelector(".header__nav");
const mobileLink = document.querySelectorAll(".header__link");
const arrow = document.querySelector(".fa-arrow-right-arrow-left");

const addListeners = () => {
	hamburgerBtn.addEventListener("click", toggleMobileNav);

	mobileLink.forEach((link) => {
		link.addEventListener("click", toggleMobileNav);
	});
};

const toggleMobileNav = () => {
	if (!mobileNav.classList.contains("hidden")) {
		mobileNav.classList.add("hide-nav");
		arrow.classList.toggle("hide");
		hamburgerBtn.classList.toggle("is-active");
		document.body.classList.toggle("body-hidden");
		setTimeout(() => {
			mobileNav.classList.remove("hide-nav");
			mobileNav.classList.remove("show-nav");
			mobileNav.classList.toggle("hidden");
		}, 500);
	} else {
		hamburgerBtn.classList.toggle("is-active");
		arrow.classList.toggle("hide");
		mobileNav.classList.toggle("hidden");
		mobileNav.classList.add("show-nav");
		document.body.classList.toggle("body-hidden");
		mobileNav.classList.remove("hide-nav");
	}
};

addListeners();
