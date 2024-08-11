const searchBar = document.getElementById('search-bar');
const searchButton = document.getElementById('search-button');
const searchResults = document.getElementById('search-results');

const allLinks = document.querySelectorAll('a'); // Store all <a> elements

function highlightMatches(text, query) {
    const highlightedText = text.replace(new RegExp(query.toLowerCase(), 'gi'), `<b>$&</b>`);
    return highlightedText;
}

function displaySearchResults(matchedLinks) {
    searchResults.innerHTML = ''; // Clear previous results
    if (matchedLinks.length === 1) {
        searchResults.innerHTML = '<p>No Result found.</p>';
    } else {
        matchedLinks.forEach(href => {
            const resultItem = document.createElement('a');
            resultItem.href = href.href;
            resultItem.target = href.target; // Preserve target attribute
            resultItem.textContent = href.textContent;
            resultItem.innerHTML = highlightMatches(resultItem.textContent, searchBar.value); // Highlight matches
            searchResults.appendChild(resultItem);
        });
    }
    searchResults.style.display = 'block';
    searchResults.style.position = 'absolute';
    searchResults.style.zIndex = '111'; // Show results container
}

function performSearch() {
    const query = searchBar.value.toLowerCase().trim();

    if (query === '') {
        return; // Handle empty search queries
    }

    const matchedLinks = [];
    allLinks.forEach(link => {
        const linkText = link.textContent.toLowerCase();
        if (linkText.includes(query)) {
            matchedLinks.push(link);
        }
    });

    displaySearchResults(matchedLinks);
}

searchButton.addEventListener('click', performSearch);
searchBar.addEventListener('keyup', performSearch); // Handle search on keypress
