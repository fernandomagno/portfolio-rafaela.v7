const revealItems = document.querySelectorAll('.reveal');
const editorialPhotos = document.querySelectorAll('.editorial-photo');
const lightbox = document.querySelector('.lightbox');
const lightboxImage = lightbox.querySelector('img');
const lightboxCaption = lightbox.querySelector('p');
const closeButton = lightbox.querySelector('.lightbox-close');

const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
}, { rootMargin: '0px 0px 240px', threshold: 0.05 });

revealItems.forEach((item) => revealObserver.observe(item));

const openLightbox = (card) => {
  const image = card.querySelector('img');
  lightboxImage.src = card.dataset.full;
  lightboxImage.alt = image.alt;
  lightboxCaption.textContent = card.querySelector('span').textContent;
  lightbox.classList.add('is-open');
  lightbox.setAttribute('aria-hidden', 'false');
  document.body.classList.add('modal-open');
  closeButton.focus();
  lightboxImage.decode?.().catch(() => {});
};

const closeLightbox = () => {
  lightbox.classList.remove('is-open');
  lightbox.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('modal-open');
};

editorialPhotos.forEach((photo) => {
  photo.setAttribute('aria-label', `Ampliar ${photo.querySelector('img').alt}`);
  photo.addEventListener('click', () => openLightbox(photo));
  photo.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      openLightbox(photo);
    }
  });
  photo.querySelector('img').draggable = false;
  photo.addEventListener('contextmenu', (event) => event.preventDefault());
});

lightbox.addEventListener('contextmenu', (event) => event.preventDefault());
lightboxImage.draggable = false;
closeButton.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', (event) => {
  if (event.target === lightbox) closeLightbox();
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeLightbox();
  if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 's') event.preventDefault();
});
