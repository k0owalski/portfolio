(function () {
	const hamburger = document.querySelector('#hamburger');
	const headerNav = document.querySelector('#header-nav');

	hamburger.addEventListener('click', function () {
		headerNav.classList.toggle('is-active');
	});
})();
