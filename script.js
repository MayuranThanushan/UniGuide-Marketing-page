document.getElementById('newsletterForm').addEventListener('submit', async (e) => {
  e.preventDefault(); // Prevent the form from submitting the traditional way

  const email = document.getElementById('emailInput').value; // Get the email from the form input
  const proxyURL = '/api/proxy'; // Proxy endpoint hosted on Vercel

  const messageEl = document.getElementById('message'); // The element to display the status message
  messageEl.textContent = 'Submitting...'; // Show a "Submitting..." message

  try {
    const response = await fetch(proxyURL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }), // Send the email in the request body
    });

    const result = await response.json(); // Parse the JSON response

    if (result.status === 'success') {
      messageEl.textContent = 'Subscription successful!'; // If successful, show a success message
      messageEl.style.color = 'green';
    } else {
      messageEl.textContent = 'Error: ' + result.message; // Show the error message if there's an issue
      messageEl.style.color = 'red';
    }
  } catch (error) {
    messageEl.textContent = 'An error occurred. Please try again.'; // Show a generic error message
    messageEl.style.color = 'red';
  }
});

// Select elements
const loadingText = document.getElementById("loading-text");
const loadingScreen = document.querySelector(".loading-screen");
const uniguideContainer = document.getElementById("uniguide-container");
const comingsoonContainer = document.getElementById("coming-soon-container");

let load = 0;

// Increment the loading percentage
const loadingInterval = setInterval(() => {
  load++;
  loadingText.textContent = `${load}%`;

  if (load > 100) {
    clearInterval(loadingInterval); // Stop the loading percentage
    loadingScreen.style.display = "none"; // Hide loading screen

    // After 2 seconds, hide UniGuide and show the next div
    setTimeout(() => {
      uniguideContainer.style.display = "none";
      comingsoonContainer.style.display = "flex"; // Show new content
    }, 5000); // 2-second delay
  }
}, 30); // Loading increments every 30ms
