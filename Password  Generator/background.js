chrome.runtime.onInstalled.addListener(function() {
    console.log("Extension Installed");
});

chrome.runtime.onMessage.addListener(async function(request, sender, sendResponse) {
    if (request.length) {
        const url = `https://password-generator1.p.rapidapi.com/api/generePassWd?len=${request.length}`;
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '179b629e36mshf99f72aa1027ca9p162750jsnc29746bee287',
                'X-RapidAPI-Host': 'password-generator1.p.rapidapi.com'
            }
        };

        try {
            const response = await fetch(url, options);
            const result = await response.text();
            console.log(result);
            sendResponse({ password: result });
        } catch (error) {
            console.error(error);
            sendResponse({ password: 'Error generating password' });
        }
        return true;
    }
});
