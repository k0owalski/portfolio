(function () {
	const hamburger = document.querySelector('#hamburger');
	const header = document.querySelector('#header');
	const navItems = document.querySelectorAll('.nav-item-link');
	const sliderControls = document.querySelectorAll(
		'.portfolio .slider-controls .dot'
	);
	const sliderInner = document.querySelector('.portfolio .slider-inner');

	hamburger.addEventListener('click', () =>
		header.classList.toggle('is-active')
	);

	for (let item of navItems) {
		item.addEventListener('click', () => header.classList.remove('is-active'));
	}

	for (let dot of sliderControls) {
		dot.addEventListener('click', function (event) {
			const sliderWidth = document.querySelector(
				'.portfolio .slider .slide'
			).clientWidth;

			for (let d of sliderControls) {
				d.classList.remove('is-active');
			}

			dot.classList.add('is-active');

			sliderInner.style.translate = `calc((-${sliderWidth}px - 1rem) * ${parseInt(
				event.target.dataset.slideId
			)}) 0`;
		});
	}
})();
