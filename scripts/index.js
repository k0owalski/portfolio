(function () {
	const hamburger = document.querySelector('#hamburger');

	hamburger.addEventListener('click', () => {
		const header = document.querySelector('#header');

		header.classList.toggle('is-active');
	});
})();
