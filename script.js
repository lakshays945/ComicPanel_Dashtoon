const comicForm = document.getElementById('comicForm');
const comicPanelsContainer = document.getElementById('comicPanels');
let limiter = new Limiter(60,1000);

async function query(data) {
    console.log("Request Sent");
	const response = await fetch(
		"https://xdwvg9no7pefghrn.us-east-1.aws.endpoints.huggingface.cloud",
		{
			headers: { 
				"Accept": "image/png",
				"Authorization": "Bearer VknySbLLTUjbxXAXCjyfaFIPwUTCeRXbFSOjwRiCxsxFyhbnGjSFalPKrpvvDAaPVzWEevPljilLVDBiTzfIbWFdxOkYJxnOPoHhkkVGzAknaOulWggusSFewzpqsNWM", 
				"Content-Type": "application/json" 
			},
			method: "POST",
			body: JSON.stringify(data),
		}
	);
	const result = await response.blob();
    console.log("Got Response");
	return result;
}

function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function generateComicPanel() {
    const panelText = document.getElementById('panelText').value;
    limiter.refill();
    if(limiter.consume() == false){
        console.log("Wait");
        return;
    }
    showLoadingSpinner();
    query({"inputs": panelText})
        .then((response) => {
            const imageUrl = URL.createObjectURL(response);
            hideLoadingSpinner();
            displayComicPanel(imageUrl);
        }).catch(error => {
            console.error(error);
            hideLoadingSpinner();
            alert('Failed to generate comic panel. Please try again.');
        });

}


function displayComicPanel(imageUrl) {
    const panelElement = document.createElement('div');
    panelElement.className = 'panel';
    const imgElement = document.createElement('img');
    imgElement.src = imageUrl;
    imgElement.alt = 'Comic Panel';
    panelElement.appendChild(imgElement);
    comicPanelsContainer.appendChild(panelElement);
}

function showLoadingSpinner() {
    const panelElement = document.createElement('div');
    panelElement.className = 'panel';
    const loadingSpinner = document.createElement('img');
    loadingSpinner.className = 'loading-spinner';
    loadingSpinner.alt = 'Comic Panel';
    loadingSpinner.src = 'https://www.freeiconspng.com/uploads/load-icon-png-10.png';
    panelElement.appendChild(loadingSpinner);
    comicPanelsContainer.appendChild(panelElement);
}

function hideLoadingSpinner() {
    const loadingSpinner = document.querySelector('.loading-spinner');
    if (loadingSpinner) {
        loadingSpinner.remove();
    }
}