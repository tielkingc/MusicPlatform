var generateEvents = function () {

    document.getElementById("searchbutton").style.display = "none";
    document.getElementById("list").style.display = "block";
    
    var userCity = document.querySelector("#cityEntry").value.trim();

    fetch(
        'https://app.ticketmaster.com/discovery/v2/events.json?classificationName=music&city=' + userCity + '&apikey=bz4pDAkoqBgGaRl2E3fNUOQjJikthwgI'
    )

    .then(function (response) {
        return response.json();
    })

    .then(function (response) {
        console.log(response);
        // events = response.json();

    for (let i = 0; i < response._embedded.events.length; i++) {
        var bodyEl = document.getElementById("body");
        var rowEl = document.createElement("tr");
        var eventsEl = document.createElement("td");
        
        eventsEl.textContent = response._embedded.events[i].name;

        var linkEl = document.createElement("td");

        linkEl.textContent = response._embedded.events[i].url

        rowEl.appendChild(eventsEl);
        rowEl.appendChild(linkEl)

        bodyEl.appendChild(rowEl);
    }})
};