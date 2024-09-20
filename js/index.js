document.addEventListener('DOMContentLoaded', () => {
    const API_URL = 'https://api.artic.edu/api/v1/artworks';
    const imageBaseURL = 'https://www.artic.edu/iiif/2/';
    const artworksContainer = document.getElementById('artworks');
    const nextButton = document.getElementById('nextButton');
    let currentPage = 1; // Start with page 1

    async function fetchArtworks(page) {
        try {
            const response = await fetch(`${API_URL}?page=${page}&limit=9`);
            const data = await response.json();
            const artworks = data.data; // Get artworks from the response
            artworksContainer.innerHTML = ''; // Clear the container before displaying new artworks

            artworks.forEach(artwork => {
                const artworkElement = createArtworkElement(artwork);
                artworksContainer.appendChild(artworkElement);
            });
        } catch (error) {
            console.error('Error fetching artworks:', error);
        }
    }

    function createArtworkElement(artwork) {
        const artworkDiv = document.createElement('div');
        artworkDiv.classList.add('artwork');

        const artworkImage = `${imageBaseURL}${artwork.image_id}/full/843,/0/default.jpg`;

        artworkDiv.innerHTML = `
            <img src="${artworkImage}" alt="${artwork.title}">
            <h2>${artwork.title}</h2>
            <p>Artist: ${artwork.artist_title || 'Unknown'}</p>
            <p>Date: ${artwork.date_display || 'Unknown'}</p>
        `;

        return artworkDiv;
    }

    // Fetch the initial set of artworks
    fetchArtworks(currentPage);

    // Add event listener to the Next button
    nextButton.addEventListener('click', () => {
        currentPage += 1; // Increment the page number
        fetchArtworks(currentPage); // Fetch the next page of artworks
    });
});
