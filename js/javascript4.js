require([
  "esri/Map",
  "esri/views/MapView",
  "esri/Graphic",
  "esri/layers/FeatureLayer",
  "esri/symbols/SimpleFillSymbol",
  "dojo/dom",
  "dojo/domReady!"
], function(
  Map,
  MapView,
  Graphic,
  FeatureLayer,
  SimpleFillSymbol,
  dom){

  var layerUrl = "https://services3.arcgis.com/3845X4ZJand4K8Fh/arcgis/rest/services/Colombia_C%C3%B3digo_Postal_(Simplificada)/FeatureServer/0";

  var highlightSymbol = new SimpleFillSymbol({
    color: [ 51,51, 204, 0.9 ],
    style: "solid"
  });

  var featureLayer = new FeatureLayer({
    url: layerUrl,
    outFields: ["*"],
    opacity: 0.5
  });

  var map = new Map({
    basemap: "streets"
  });

  map.add(featureLayer);

  var view = new MapView({
    container: "map", 
    map: map, 
    zoom: 5, 
    center: [-73.660568, 4.228752] 
  });

  view.ui.add("info", "top-right");

  function getGraphics(response) {
    var graphic = response.results[0].graphic;
    var code = graphic.attributes.Codigo_Pos;

    dom.byId("code").innerHTML = code;

    var nGraphic = new Graphic({
      geometry: graphic.geometry,
      symbol: highlightSymbol
    });

    view.graphics.removeAll();
    view.graphics.add(nGraphic);
  }

  view.then(function() {
    view.on("pointer-move", function(evt) {
        var screenPoint = {
          x: evt.x,
          y: evt.y
        };

        view.hitTest(screenPoint).then(function(response){
          getGraphics(response);
        });      
    });
  });
});