const images = document.querySelectorAll('.news-col img');
const displayDiv = document.querySelector('#displayDiv');

images.forEach(image => {
  image.addEventListener('mouseenter', function() {
    displayDiv.style.display = 'block';
    displayDiv.textContent = `Image Source: ${image.getAttribute('src')}`;
  });

  image.addEventListener('mouseleave', function() {
    displayDiv.style.display = 'none';
  });
});