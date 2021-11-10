//Part 1: Getting map setup
var platform = new H.service.Platform({
    apikey: 'toP-MvKQ3SeIKPC_ARiahuHhZahDlhQR_KQ8KQH9QYo',
    useCIT: false,
    useHTTPS: true
 });
 
 var defaultLayers = platform.createDefaultLayers();
 
 var map = new H.Map(document.getElementById('map'), defaultLayers.normal.map, {
    zoom: 17,
    center: new H.geo.Point(40.977996, 28.819649)
 });
 
 var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));
 var ui = H.ui.UI.createDefault(map, defaultLayers, 'en-US');

 //Part 2: displaying venues
var venueService = platform.getVenueService();
var customVenueLayer = venueService.createTileLayer();
var venueProvider = customVenueLayer.getProvider();
map.addLayer(customVenueLayer);
venueProvider.setCurrentLevel(2)

//Part 3: Changing floors
function renderControls(title, buttons) {
    var containerNode = document.createElement('div');
    containerNode.id = 'containerNode'
    containerNode.innerHTML = '<h4 id="title"> Level: ' + venueProvider.getCurrentLevel() + '</h4><div class="btn-group"></div>';
 
    Object.keys(buttons).forEach(function(label) {
       var input = document.createElement('input');
       input.value = label;
       input.type = 'button';
       input.onclick = buttons[label];
       input.className = 'btn btn-sm btn-default';
       containerNode.lastChild.appendChild(input);
    });
 
    document.getElementById('map').appendChild(containerNode);
 }
 
 renderControls('Change floor', {
    '+1 Level': function() {
       //Change to floor above
       venueProvider.setCurrentLevel(venueProvider.getCurrentLevel() + 1);
       document.getElementById('title').innerText = 'Level: ' + venueProvider.getCurrentLevel()
    },
    '-1 Level': function() {
       venueProvider.setCurrentLevel(venueProvider.getCurrentLevel() - 1);
       document.getElementById('title').innerText = 'Level: ' + venueProvider.getCurrentLevel()
    }
 });