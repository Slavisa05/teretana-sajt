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

    // sakrij navbar kada skrolujes
    let lastScroll = 0;
    const navbar = document.querySelector('nav');

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        if (currentScroll > lastScroll && currentScroll > 50) {
            // Skroluješ dole
            navbar.classList.add('hide');
        } else {
            // Skroluješ gore
            navbar.classList.remove('hide');
        }
        lastScroll = currentScroll;
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

const navNextBtn = document.querySelector('.nav-btn.next');
if (navNextBtn) {
    navNextBtn.addEventListener('click', () => {
        currentSlide++;
        if (currentSlide >= slidesLength) {
            currentSlide = 0;
            goToSlide(currentSlide);
        }
    
        goToSlide(currentSlide);
        updateDots()
    });
}

const navPrevBtn = document.querySelector('.nav-btn.prev');
if (navPrevBtn) {
    navPrevBtn.addEventListener('click', () => {
        currentSlide--;
        if (currentSlide < 0) {
            currentSlide = slidesLength - 1;
            goToSlide(currentSlide);
        }
    
        goToSlide(currentSlide);
        updateDots()
    });
}

// GALLERY TABS
const galleryButtons = document.querySelectorAll('.buttons-wrapper button');

galleryButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const buttonName = btn.id;
        const targetDiv = document.getElementById(`${buttonName}-div`);

        document.querySelectorAll('.gallery-grid').forEach(div => {
            div.classList.remove('active');
        });

        if (targetDiv) {
            targetDiv.classList.add('active');
        }

        galleryButtons.forEach(otherBtn => {
            otherBtn.classList.remove('active'); 
        });

        btn.classList.add('active');
    });
});

// LIGHTBOX
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const closeBtn = document.querySelector('.close-popup-btn');
const galleryItems = document.querySelectorAll('.gallery-item');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');

let currentGroup = '';
let currentItems = [];
let currentIndex = 0;

// Otvaranje lightbox-a
galleryItems.forEach(item => {
    item.addEventListener('click', function() {
        currentGroup = this.dataset.group;
        currentItems = Array.from(document.querySelectorAll(`.gallery-item[data-group="${currentGroup}"]`));
        currentIndex = currentItems.indexOf(this);
        
        lightbox.style.display = 'flex';
        updateLightboxImage();
    });
});

// Zatvaranje lightbox-a
if (closeBtn) {
    closeBtn.addEventListener('click', () => {
        lightbox.style.display = 'none';
    });
}

// Klik izvan slike zatvara lightbox
if (lightbox) {
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.style.display = 'none';
        }
    });
}

// Navigacija
if (prevBtn) {
    prevBtn.addEventListener('click', showPrevImage);
}

if (nextBtn) {
    nextBtn.addEventListener('click', showNextImage);
}

// Tastatura navigacija
document.addEventListener('keydown', (e) => {
    if (lightbox.style.display === 'flex') {
        if (e.key === 'ArrowLeft') {
            showPrevImage();
        } else if (e.key === 'ArrowRight') {
            showNextImage();
        } else if (e.key === 'Escape') {
            lightbox.style.display = 'none';
        }
    }
});

// Modifikujte funkcije za navigaciju
function showPrevImage() {
    if (currentIndex > 0) {
        currentIndex--;
        updateLightboxImage();
        updateNavButtons();
    }
}

function showNextImage() {
    if (currentIndex < currentItems.length - 1) {
        currentIndex++;
        updateLightboxImage();
        updateNavButtons();
    }
}

// Dodajte novu funkciju za ažuriranje dugmadi
function updateNavButtons() {
    prevBtn.classList.toggle('hidden', currentIndex === 0);
    nextBtn.classList.toggle('hidden', currentIndex === currentItems.length - 1);
}

// Ažurirajte i početno stanje u updateLightboxImage
function updateLightboxImage() {
    lightboxImg.src = currentItems[currentIndex].src;
    lightboxImg.alt = currentItems[currentIndex].alt;
    updateNavButtons(); // Dodajte ovu liniju
}

// I inicijalno stanje kada se otvori lightbox
galleryItems.forEach(item => {
    item.addEventListener('click', function() {
        currentGroup = this.dataset.group;
        currentItems = Array.from(document.querySelectorAll(`.gallery-item[data-group="${currentGroup}"]`));
        currentIndex = currentItems.indexOf(this);
        
        lightbox.style.display = 'flex';
        updateLightboxImage();
        updateNavButtons(); // Dodajte ovu liniju
    });
});

// POPUP
const blackMask = document.querySelector('.popup-mask');
const popupModals = document.querySelectorAll('.service-popup');

const openPopupBtns = document.querySelectorAll('.services-link');
openPopupBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const btnId = btn.id.replace("-btn", "");

        blackMask.classList.add('active');

        popupModals.forEach(modal => {
            if (btnId === modal.id) {
                modal.classList.add('active');
            } else {
                modal.classList.remove('active');
            }
        });
    });
});

// close-popup-btn
const closePopupBtns = document.querySelectorAll('.close-popup-btn');
closePopupBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        blackMask.classList.remove('active');
        popupModals.forEach(modal => modal.classList.remove('active'));
    });
});

if (blackMask) {
    blackMask.addEventListener('click', (e) => {
        if (e.target === blackMask) {
            blackMask.classList.remove('active');
            popupModals.forEach(modal => modal.classList.remove('active'));
        }
    });
}

// PRIMARY I SECONDARY DUGMAD
const contactBtns = document.querySelectorAll('.contact-button');
contactBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        window.location.href = 'kontakt';
    });
});

const heroBtn = document.querySelector('.hero-section .container .inline-div .secondary-button');
if (heroBtn) {
    heroBtn.addEventListener('click', () => {
        window.location.href = '#1';
    })
}

const servicesBtn = document.querySelector('.home-services-section button');
if (servicesBtn) {
    servicesBtn.addEventListener('click', () => {
        window.location.href = 'usluge';
    })
}

const gymBtns = document.querySelectorAll('.gym-button');
gymBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        window.location.href = `${btn.id}`;
    });
});

const meetMembersBtn = document.querySelector('.meet-members');
if (meetMembersBtn) {
    meetMembersBtn.addEventListener('click', () => {
        window.location.href = 'o-nama.html#clanovi';
    });
}