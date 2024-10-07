// Fetch the news ID from URL parameters
const urlParams = new URLSearchParams(window.location.search);
const newsId = urlParams.get('id');

// Fetch news detail from API using the news ID
fetch(`http://localhost:5000/home/${newsId}`)
    .then(response => response.json())
    .then(data => {
        document.getElementById('news-title').innerText = data.data.title;
        document.getElementById('news-content').innerHTML = data.data.content;

        const imagePath = data.data.imagePath ? `http://localhost:5000/upload/${data.data.imagePath}` : 'default-image.jpg';
        document.getElementById('news-image').src = imagePath;
    })
    .catch(error => console.error('Error fetching news details:', error));
