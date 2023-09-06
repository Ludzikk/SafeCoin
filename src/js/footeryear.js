const footerYear = document.querySelector(".footer__year");

const setFooterYear = () => {
	const date = new Date();
	footerYear.textContent = date.getFullYear();
};

setFooterYear();