chrome.runtime.onInstalled.addListener(function() {
    console.log("Extension Installed");
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.length) {
        fetch('https://github.com/SamuraiHashira/Samurai-ArqamFC/generate_password', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ length: request.length }),
        })
        .then(response => response.json())
        .then(data => {
            sendResponse({ password: data.password });
        })
        .catch(error => {
            console.error('Error:', error);
            sendResponse({ password: 'Error generating password' });
        });
        return true;
    }
});
