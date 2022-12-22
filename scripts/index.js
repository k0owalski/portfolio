(function () {
	const hamburger = document.querySelector('#hamburger');
	const header = document.querySelector('#header');
	const navItems = document.querySelectorAll('.nav-item-link');

	hamburger.addEventListener('click', () =>
		header.classList.toggle('is-active')
	);

	for (let item of navItems) {
		item.addEventListener('click', () => header.classList.remove('is-active'));
	}
})();
