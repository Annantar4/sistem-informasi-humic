// Fetch slider and latest news data and display them on the home page
function fetchHomeContent() {
  fetch('http://localhost:5000/home') // Backend API URL
    .then(response => response.json())
    .then(data => {
      // Menampilkan gambar slider
      const slider = data.slider;
      displaySlider(slider);

      // Menampilkan latest news
      const latestNewsArray = data.latestNew;
      displayLatestNews(latestNewsArray);
    })
    .catch(error => console.error('Error fetching home content:', error));
}

// Menampilkan gambar slider dan menambahkan fungsi slider
function displaySlider(sliderArray) {
  const sliderDiv = document.getElementById('slider');
  let currentSlide = 0;

  // Menambahkan gambar slider ke div
  sliderArray.forEach((item, index) => {
    const img = document.createElement('img');
    img.src = `http://localhost:5000/upload/${item.content}`; // Path to images folder
    img.alt = item.title;
    img.classList.add('slider-image');
    img.style.display = index === 0 ? 'block' : 'none'; // Menampilkan gambar pertama
    sliderDiv.appendChild(img);
  });

  // Slider navigation
  const images = document.querySelectorAll('.slider-image');
  document.getElementById('prev').addEventListener('click', () => {
    images[currentSlide].style.display = 'none';
    currentSlide = (currentSlide === 0) ? images.length - 1 : currentSlide - 1;
    images[currentSlide].style.display = 'block';
  });

  document.getElementById('next').addEventListener('click', () => {
    images[currentSlide].style.display = 'none';
    currentSlide = (currentSlide === images.length - 1) ? 0 : currentSlide + 1;
    images[currentSlide].style.display = 'block';
  });
}

// Menampilkan latest news
function displayLatestNews(latestNewsArray) {
  const newsDiv = document.getElementById('latest-news');
  newsDiv.innerHTML = ''; // Kosongkan konten sebelumnya
  latestNewsArray.forEach(item => {
    newsDiv.innerHTML += `<div>
      <h3>${item.title}</h3>
      <p>${item.content}</p>
    </div>`;
  });
}

// Handle form submission for slider
const sliderForm = document.getElementById('slider-form');
sliderForm.addEventListener('submit', function (event) {
  event.preventDefault();

  const formData = new FormData();
  formData.append('type', 'slider');
  formData.append('title', document.getElementById('slider-title').value);
  formData.append('imagePath', document.getElementById('slider-content').files[0]);
  

  fetch('http://localhost:5000/home', {
    method: 'POST',
    body: formData
  })
    .then(response => response.json())
    .then(data => {
      alert('Slider successfully added!');
      sliderForm.reset(); // Clear the form after submission
    })
    .catch(error => console.error('Error adding slider:', error));
});

// Handle form submission for latest news
const latestNewsForm = document.getElementById('latest-news-form');
latestNewsForm.addEventListener("submit", function(event) {
  event.preventDefault();

  const formData = new FormData();
  formData.append('type', 'latest_new');
  formData.append('title', document.getElementById('news-title').value);
  formData.append('content', CKEDITOR.instances['news-content'].getData()); // Get content from CKEditor

  fetch('http://localhost:5000/home', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      type: 'latest_new',
      title: document.getElementById('news-title').value,
      content: CKEDITOR.instances['news-content'].getData(), // CKEditor content
    }),
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Failed to submit latest news');
    }
    return response.json();
  })
  .then(result => {
    alert('Latest news submitted successfully!');
  })
  .catch(error => {
    console.error('Error submitting latest news:', error);
    alert('Error submitting latest news');
  });
});
