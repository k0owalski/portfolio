function isInViewport(el) {
	const bounding = el.getBoundingClientRect();

	if (
		bounding.top >= 0 &&
		bounding.left >= 0 &&
		bounding.left <= window.innerWidth &&
		bounding.top <= window.innerHeight
	)
		return true;

	return false;
}

function animateServices() {
	const serviceCards = document.querySelectorAll('.service-card');
	const serviceContent = document.querySelector('.services .content');

	if (isInViewport(serviceContent)) {
		for (let sCard of serviceCards) {
			sCard.style.animationPlayState = 'running';
		}
	}
}

function animatePortfolio() {
	const portfolioContent = document.querySelector('.portfolio .content');

	if (isInViewport(portfolioContent)) {
		portfolioContent.style.animationPlayState = 'running';
	}
}

function animateSkills() {
	const skillsContent = document.querySelector('.skills .content');

	if (isInViewport(skillsContent)) {
		skillsContent.style.animationPlayState = 'running';
	}
}

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

	window.addEventListener('scroll', () => {
		animateServices();
		animatePortfolio();
		animateSkills();
	});

	animateServices();
	animatePortfolio();
	animateSkills();
})();
