// Use d3 to read the JSON file.
// The data from the JSON file is arbitrarily named importedData as the argument.
d3.json("data/lobbyists.json").then((importedData) => {
  //console.log(importedData);
  let data = importedData;

  console.log(data);

  // Create a map object.
  var myMap = L.map("map", {
    center: [37.09, -95.71],
    zoom: 5
  });

  // Add a tile layer.
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(myMap);

  // Add lobbyist markers as cluster
  var markers = L.markerClusterGroup();

  for (var i = 0; i < data.length; i++) {

    var lobbyist = data[i];

    if (lobbyist) {

      markers.addLayer(L.marker([lobbyist.lat, lobbyist.long])
      .bindPopup(`<h1>${lobbyist.first_name} ${lobbyist.last_name}</h1> <hr> <h3>Address: ${lobbyist.address_1}, <br/> ${lobbyist.city},
      ${lobbyist.state} ${lobbyist.zip}</h3> <h4>emal: ${lobbyist.email} </br> phone: ${lobbyist.phone} </br> employer: ${lobbyist.employer_name}</h4>`))

    }

  }
  myMap.addLayer(markers);

});