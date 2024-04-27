const slides = document.querySelector('.slides');
const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');
const carouselItem = document.querySelectorAll('.carousel-item');
const imgWidth = carouselItem[0].clientWidth;

prevButton.addEventListener('click', () => {
  // Di chuyển đến slide trước đó
  slides.style.transition = 'transform 0.3s ease';
  slides.style.transform = `translateX(${imgWidth}px)`;
  setTimeout(() => {
    slides.style.transition = 'none';
    slides.insertBefore(slides.lastElementChild, slides.firstElementChild);
    slides.style.transform = `translateX(0)`;
  }, 300);
});

nextButton.addEventListener('click', () => {
  // Di chuyển đến slide tiếp theo
  slides.style.transition = 'transform 0.3s ease';
  slides.style.transform = `translateX(-${imgWidth}px)`;
  setTimeout(() => {
    slides.style.transition = 'none';
    slides.appendChild(slides.firstElementChild);
    slides.style.transform = `translateX(0)`;
  }, 300);
});
