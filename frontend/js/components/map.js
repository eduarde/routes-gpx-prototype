import _ from 'underscore';
import leaflet from 'leaflet';
import bing from 'leaflet-bing-layer';
import StamenTileLayer from './tile.stamen';
import FullScreen from 'leaflet.fullscreen';
import locate from 'leaflet.locatecontrol';


var Map = function (_) {

    var map, control;

    // Init function to create the user interface
    var load = function () {


        var mapboxAccessToken = 'pk.eyJ1IjoiZWR1YXJkZSIsImEiOiJjanZodTFqeXQwMzllNDFwOGFkcG9lOGlhIn0.wdGoXTTCWrRLhCBA9il9rQ';

        var mapboxLayer = L.tileLayer('https://{s}.tiles.mapbox.com/v4/surfoo.la14jo4j/{z}/{x}/{y}.png?access_token=' + mapboxAccessToken),
            osmLegacyLayer = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 18,
                minZoom: 3,
                attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://www.openstreetmap.org/">OpenStreetMap</a>'
            }),
            bingLayerAerial = new L.tileLayer.bing({
                bingMapsKey: 'AqX41vVRpe3o0jooLF0cPol_58SGp2F94OLf4MJhp3QpMa_HQMw-1Y8vPQpiiKAg',
                imagerySet: 'Aerial'
            }),
            bingLayerAerialWithLabels = new L.tileLayer.bing({
                bingMapsKey: 'AqX41vVRpe3o0jooLF0cPol_58SGp2F94OLf4MJhp3QpMa_HQMw-1Y8vPQpiiKAg',
                imagerySet: 'AerialWithLabels'
            }),
            bingLayerRoad = new L.tileLayer.bing({
                bingMapsKey: 'AqX41vVRpe3o0jooLF0cPol_58SGp2F94OLf4MJhp3QpMa_HQMw-1Y8vPQpiiKAg',
                imagerySet: 'Road'
            }),
            stamenToner = new L.StamenTileLayer("toner"),
            stamenWaterColor = new L.StamenTileLayer("watercolor");

        // List of base layers
        var baseLayers = {
            "OSM Legacy": osmLegacyLayer,
            "Bing Aerial": bingLayerAerial,
            "Bing Road": bingLayerRoad,
            "Bing Hybrid": bingLayerAerialWithLabels,
            "MapBox Light": mapboxLayer,
            "Stamen Toner": stamenToner,
            "Stamen WaterColor": stamenWaterColor
        };

        // Default values
        var currentLatitude = 46,
            currentLongitude = 2.9,
            currentZoom = 6,
            currentBaseLayer = 'OSM Legacy';

        var overlays = {};

        // Create the map
        map = L.map('map', {
            center: new L.LatLng(currentLatitude, currentLongitude),
            zoom: currentZoom,
            layers: _.values(_.pick(baseLayers, currentBaseLayer)),
            attributionControl: false,
            zoomControl: true,
            inertia: false
        });

        // Layers
        control = L.control.layers(baseLayers, overlays);
        control.addTo(map);

        // Scale options
        L.control.scale({
            'maxWidth': 200
        }).addTo(map);


        // Fullscreen options
        map.addControl(new L.Control.FullScreen());

        // Geolocation options
        L.control.locate({
            drawCircle: false
        }).addTo(map);
    };

    // App Cache, reload the web app by user request to get the latest version
    var onUpdateReady = function () {
        _.delay(function () {
            if (confirm('Geocaching GPX Viewer has been updated!\n\nDo you want to reload the page to use the new version?')) {
                window.location.reload(true);
            }
        }, 0);
        return false;
    };
    // Listener for App Cache
    window.applicationCache.addEventListener('updateready', onUpdateReady);
    if (window.applicationCache.status === window.applicationCache.UPDATEREADY) {
        onUpdateReady();
    }

    // call initialization file
    // if (window.File && window.FileList && window.FileReader) {
    //     document.getElementById('files').addEventListener('change', FileSelectHandler, false);
    // } else {
    //     alert('Your browser doesn\'t support this feature, please upgrade it (or use Firefox or Chrome).');
    // }

    return {
        loadmap: load
    }

}(_);


export default Map;