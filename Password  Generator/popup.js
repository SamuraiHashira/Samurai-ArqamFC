function generatePassword() {
    var passwordLength = document.getElementById("passwordLength").value;
    
    // Check if the password length is at least 6 characters
    if (passwordLength < 6) {
        // If the length is less than 6, display an error message
        document.getElementById("generatedPassword").textContent = "The length must be 6 or more for your security.";
    } else {
        // If the length is 6 or more, send a message to the background script to generate the password
        chrome.runtime.sendMessage({ length: passwordLength }, function(response) {
            // Handle the response directly inside the callback function
            if (response && response.password) {
                // Display the generated password in the popup
                document.getElementById("generatedPassword").textContent = "Generated Password: " + response.password;
            } else {
                // Handle error or empty response, if needed
                document.getElementById("generatedPassword").textContent = "Failed to generate password.";
            }
        });
    }
}