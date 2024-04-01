const image = document.querySelector('.news-col img');
const displayDiv = document.querySelector('#displayDiv');

image.addEventListener('onmouseenter', function() {
    displayDiv.style.display = 'block';
    displayDiv.innerHTML = `Image Source: ${image.getAttribute('src')}`;
});


image.addEventListener('onmouseleave', function() {
    displayDiv.style.display = 'none';
});