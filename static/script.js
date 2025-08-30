// NAVBAR
const dropdown = document.querySelector('.dropdown')
const dropdownToggle = document.querySelector('.dropdown-toggle');

if (dropdown && dropdownToggle) {
    // Klik na toggle dugme (otvaranje/zatvaranje)
    dropdownToggle.addEventListener('click', (e) => {
        e.stopPropagation(); // sprečava da odmah "propadne" do document
        dropdown.classList.toggle('open');
    });

    // Klik bilo gde na dokumentu
    document.addEventListener('click', (e) => {
        // Ako klik NIJE bio unutar dropdown-a
        if (!dropdown.contains(e.target)) {
            dropdown.classList.remove('open');
        }
    });
}

// TESTIMONIAL SLIDER
const dotsContainer = document.getElementById('sliderDots');
const slides = document.querySelectorAll('.slide');
const slidesLength = slides.length;
let currentSlide = 0;

slides.forEach((_, idx) => {
  const dot = document.createElement('span');
  dot.classList.add('slider-dot');
  if (idx === 0) dot.classList.add('active'); // prvi aktivan
  dot.addEventListener('click', () => {
    goToSlide(idx);
  });
  dotsContainer.appendChild(dot);
});

function goToSlide(idx) {
        currentSlide = idx;
        let slideContainer = document.getElementById('slideContainer')

        if (slideContainer) {
            slideContainer.style.transform = `translateX(-${currentSlide * 100}%)`;
        }
    }

function updateDots() {
        const dots = document.querySelectorAll('.slider-dot');
        dots.forEach((dot, idx) => {
            dot.classList.toggle('active', idx === currentSlide);
        });
    }

document.querySelector('.nav-btn.next').addEventListener('click', () => {
    currentSlide++;
    if (currentSlide >= slidesLength) {
        currentSlide = 0;
        goToSlide(currentSlide);
    }

    goToSlide(currentSlide);
    updateDots()
});

document.querySelector('.nav-btn.prev').addEventListener('click', () => {
    currentSlide--;
    if (currentSlide < 0) {
        currentSlide = slidesLength - 1;
        goToSlide(currentSlide);
    }

    goToSlide(currentSlide);
    updateDots()
});
