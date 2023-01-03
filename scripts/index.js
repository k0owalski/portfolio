function createModal(event) {
	const template = document.querySelector('#modal-template');
	const modalWrapper = document.querySelector('#modal-wrapper');

	const modal = template.content.cloneNode(true);

	const image = modal.querySelector('#modal-image');
	const title = modal.querySelector('#modal-title');
	const tag = modal.querySelector('#modal-tag');
	const description = modal.querySelector('#modal-description');
	const openButton = modal.querySelector('#modal-open-button');
	const githubButton = modal.querySelector('#modal-github-button');

	const {
		modalTitle,
		modalTag,
		modalDescription,
		modalOpenLink,
		modalGithubLink,
	} = event.target.dataset;

	image.src = event.target.src;
	title.innerText = modalTitle;
	tag.innerText = modalTag;
	description.innerText = modalDescription;
	openButton.href = modalOpenLink;
	githubButton.href = modalGithubLink;

	if (modalGithubLink) githubButton.classList.add('is-active');

	modalWrapper.append(modal);

	document
		.querySelector('#modal-bg')
		.addEventListener('click', () => (modalWrapper.innerHTML = null));
}

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
	const slides = document.querySelectorAll('.portfolio .slider .slide');
	const slider = document.querySelector('.portfolio .slider');

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

	for (let slide of slides) {
		if (window.matchMedia('(min-width: 90rem)').matches)
			slide.style.width = `${slider.clientWidth / 2 - 8}px`;
		else slide.style.width = `${slider.clientWidth}px`;

		const touch = { start: 0, end: 0 };

		slide.addEventListener('click', createModal);

		slide.addEventListener('touchstart', function (event) {
			touch.start = event.changedTouches[0].screenX;
		});

		slide.addEventListener('touchend', function (event) {
			touch.end = event.changedTouches[0].screenX;

			const sliderWidth = document.querySelector(
				'.portfolio .slider .slide'
			).clientWidth;

			const direction = Math.sign(touch.start - touch.end);
			const slideId = parseInt(event.target.dataset.slideId);

			if (
				(slideId === 0 && direction < 0) ||
				(slideId === slides.length - 1 && direction > 0)
			)
				return;

			sliderInner.style.translate = `calc((-${sliderWidth}px - 1rem) * ${
				slideId + direction
			}) 0`;

			for (let d of sliderControls) {
				d.classList.remove('is-active');

				if (d.dataset.slideId == slideId + direction) {
					d.classList.add('is-active');
				}
			}
		});
	}

	window.addEventListener('scroll', () => {
		animateServices();
		animatePortfolio();
		animateSkills();
	});

	window.addEventListener('resize', () => {
		for (let slide of slides) {
			if (window.matchMedia('(min-width: 90rem)').matches)
				slide.style.width = `${slider.clientWidth / 2 - 8}px`;
			else slide.style.width = `${slider.clientWidth}px`;
		}
	});

	animateServices();
	animatePortfolio();
	animateSkills();
})();
