// Get DOM elements
const searchButton = document.getElementById("search-button");
const locationInput = document.getElementById("location-input"); // Ensure this matches your HTML
const eventList = document.getElementById("event-list");
const errorMessage = document.getElementById("error-message");

// Event listener for the search button
searchButton.addEventListener("click", () => {
    const location = locationInput.value.trim();
    if (location) {
        fetchEvents(location); 
    } else {
        showError("Please enter a location.");
    }
});

// Event listener for input changes
locationInput.addEventListener("input", function() {
    const query = this.value;
    console.log('Searching for:', query);
    // Optionally, you can implement real-time filtering here
});

// Event listener for the clear button
document.getElementById("clear-button").addEventListener("click", clearResults);

async function fetchEvents(location) {
    eventList.innerHTML = ""; // Clear previous results
    errorMessage.classList.add("hidden"); // Hide error message
    showLoading(); // Show loading indicator

    const apiKey = "EN7FRNWQ7OZIFGRG3NT2"; // Your actual API key
    const location = Nairobi;
const url = `https://www.eventbriteapi.com/v3/events/search/?location.address=${encodeURIComponent(Nairobi)}&token=${EN7FRNWQ7OZIFGRG3NT2}`;

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        
        // Check if we have at least 5 events
        if (data.events && data.events.length >= 5) {
            const events = data.events.map(event => ({
                name: event.name.text,
                start: event.start.local,
                venue: event.venue ? event.venue.name : 'Venue not available',
                url: event.url // Add URL for more info
            }));
            displayEvents(events);
        } else {
            showError('Not enough events returned');
        }
    } catch (error) {
        console.error('Fetch error:', error);
        showError('An error occurred while fetching events.');
    } finally {
        hideLoading(); // Hide loading indicator
    }
}

function displayEvents(events) {
    if (events.length === 0) {
        showError("No events found for this location");
        return;
    }

    events.forEach(event => {
        const eventItem = document.createElement("div");
        eventItem.classList.add("event-item");

        eventItem.innerHTML = `
            <h3>${event.name}</h3>
            <p><strong>Starts:</strong> ${new Date(event.start).toLocaleString()}</p>
            <p><strong>Venue:</strong> ${event.venue}</p>
            <a href="${event.url}" target="_blank">More Info</a>
        `;

        eventList.appendChild(eventItem);
    });
}

function showError(message) {
    errorMessage.textContent = message;
    errorMessage.classList.remove("hidden");
}

function clearResults() {
    eventList.innerHTML = ""; // Clear event list
    errorMessage.classList.add("hidden"); // Hide error message
    locationInput.value = ""; // Clear the input field
}






