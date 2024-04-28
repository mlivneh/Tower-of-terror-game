document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM fully loaded and parsed");

    var startForm = document.getElementById('start-form');
    if (startForm) {
        console.log("Start form found, adding event listener");
        startForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent the default form submission which causes the page reload
            console.log("Form submission intercepted");

            const userName = document.getElementById('username').value.trim();
            console.log("Username entered:", userName); // Log the username entered by the user

            if (userName) {
                localStorage.setItem('username', userName);
                console.log("Username stored in localStorage, redirecting to main.html");
                window.location.href = 'main.html'; // Redirect to main.html
            } else {
                alert("Please enter a username to start the game."); // Alert if username is not entered
            }
        });
    } else {
        console.log("Start form not found"); // Log if the form is not found
    }
});
