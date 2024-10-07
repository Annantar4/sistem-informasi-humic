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

        const upcomingEvents = data.event;
        displayUpcomingEvents(upcomingEvents);  // Panggil fungsi untuk upcoming event
      })
      .catch(error => console.error('Error fetching home content:', error));
}

function displaySlider(sliderArray) {
    const sliderDiv = document.getElementById('slider');
    let currentSlide = 0;
  
    // Menambahkan gambar slider ke div
    sliderArray.forEach((item, index) => {
      const img = document.createElement('img');
      img.src = `http://localhost:5000/upload/${item.imagePath}`; // Path to images folder
      img.alt = item.title;
      img.classList.add('slider-image');
      img.style.display = index === 0 ? 'block' : 'none'; // Menampilkan gambar pertama
      sliderDiv.appendChild(img);
    });
  
    // Slider navigation
    const images = document.querySelectorAll('.slider-image');
    
    // Fix here: Use querySelector to target the class instead of ID
    document.querySelector('.prev').addEventListener('click', () => {
      images[currentSlide].style.display = 'none';
      currentSlide = (currentSlide === 0) ? images.length - 1 : currentSlide - 1;
      images[currentSlide].style.display = 'block';
    });
  
    document.querySelector('.next').addEventListener('click', () => {
      images[currentSlide].style.display = 'none';
      currentSlide = (currentSlide === images.length - 1) ? 0 : currentSlide + 1;
      images[currentSlide].style.display = 'block';
    });
}

function displayLatestNews(latestNewsArray) {
    // Fix here: Define latestNewsContainer
    const latestNewsContainer = document.getElementById('latest-news-container');

    latestNewsArray.forEach(item => {
        const newsCard = document.createElement('div');
        newsCard.classList.add('news-card');

        newsCard.innerHTML = `
            <img src="http://localhost:5000/upload/${item.imagePath}" alt="News Image">
            <h3>${item.title}</h3>
            <p>${item.content.substring(0, 100)}...</p>
            <button class="read-more-btn" data-id="${item.id}">Read More</button>
        `;

        latestNewsContainer.appendChild(newsCard);
    });

    addReadMoreEventListeners();
}


function addReadMoreEventListeners() {
  const readMoreButtons = document.querySelectorAll('.read-more-btn');
  readMoreButtons.forEach(button => {
      button.addEventListener('click', function() {
          const newsId = this.getAttribute('data-id');
          window.location.href = `detail.html?id=${newsId}`;
      });
  });
}

function displayUpcomingEvents(upcomingEvents) {
  const upcomingEventContainer = document.getElementById('upcoming-events-container'); // Asumsikan ada div ini di HTML
  const seeAllEventsBtn = document.getElementById('see-all-events-btn'); // Asumsikan ada button ini di HTML

  upcomingEvents.forEach(event => {
      const eventCard = document.createElement('div');
      eventCard.classList.add('event-card');
      eventCard.innerHTML = `
          <div class="event-content">
              <h3>${event.title}</h3>
              <p>${event.content.substring(0, 100)}...</p>
          </div>
      `;
      upcomingEventContainer.appendChild(eventCard);
  });

  // Tampilkan tombol "See All Events" hanya jika event lebih dari 2
  if (upcomingEvents.length > 2) {
      seeAllEventsBtn.style.display = 'block';
  } else {
      seeAllEventsBtn.style.display = 'none';
  }
}

