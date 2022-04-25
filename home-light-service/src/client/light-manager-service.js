const LIGHT_API_URL = 'http://localhost:5000/light';

function tryUpdateStatus() {
    const request = new XMLHttpRequest();
    request.onreadystatechange = function() {
        if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
            updateLedStatus(this.responseText);
        }
    };
    request.open('GET', LIGHT_API_URL);
    request.send();
}

function updateLedStatus(responseText) {
    const response = JSON.parse(responseText);
    const statusElement = document.getElementById('light-status');
    const status = response.ledStatus === 1 ? 'enabled' : 'disabled';
    const text = response.ledStatus === 1 ? 'enabled' : 'disabled';

    statusElement.classList = [status];
    statusElement.innerText = text;
}

function enableLight() {
    callLightRequest(1);
}

function disableLight() {
    callLightRequest(0);
}

function callLightRequest(lightStatus) {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", `/light/${lightStatus}`, true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function() {
        if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
            updateLedStatus(this.responseText);
        }
    }
    xhr.send(null);
}

(function() {
    tryUpdateStatus();

    setInterval(tryUpdateStatus, 1000)
})();