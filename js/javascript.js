/*
  Desarrollado por Semillero de Innovación Geográfica  
*/
require([
  "esri/map", "esri/layers/FeatureLayer",
  "esri/symbols/SimpleFillSymbol", "esri/symbols/SimpleLineSymbol", "esri/symbols/CartographicLineSymbol",
  "esri/renderers/SimpleRenderer", "esri/graphic",
  "esri/dijit/Search", "esri/dijit/HomeButton",
  "esri/tasks/query",
  "esri/Color", "dojo/domReady!"
], function(
  Map, FeatureLayer,
  SimpleFillSymbol, SimpleLineSymbol, CartographicLineSymbol,
  SimpleRenderer, Graphic,
  Search, HomeButton,
  Query,
  Color
) {
  var url = "https://services3.arcgis.com/3845X4ZJand4K8Fh/arcgis/rest/services/Colombia_C%C3%B3digo_Postal_(Simplificada)/FeatureServer/0";

  //Definición del mapa
  var map = new Map("map", {
    basemap: "streets",
    center: [-73.660568, 4.228752],
    zoom: 5
  });

  var homeButton = new HomeButton({
    map: map
  }, "HomeButton");
  homeButton.startup();

  //Definición de la barra de búsqueda de dirección (Geocodificador)
  var search = new Search({
    map: map
  }, "search");
  search.startup();

  //Definición de la capa
  var featureLayer = new FeatureLayer(url, {
    "mode": FeatureLayer.ONDEMAND,
    outFields: ["*"]
  });

  //Definición del color de selección del grafico de la capa
  var sfs = new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID, new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color([0, 122, 31, 0.5]), 1), new Color([0, 122, 31, 0.5]));
  featureLayer.setSelectionSymbol(sfs);

  //Definición del color de la capa (Render)
  var symbol = new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID, new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color([41, 91, 255,0.35]), 1), new Color([41, 91, 255, 0.35]));
  featureLayer.setRenderer(new SimpleRenderer(symbol));
  map.addLayer(featureLayer);

  featureLayer.on("click", function(evt){
    var cod = evt.graphic.attributes.Codigo_Pos;
    featureLayer.sele
    $("#postal").html(cod);
    $("#modal").fadeIn();
  });

  featureLayer.on("mouse-over", function(evt){
    var content = evt.graphic.attributes.Codigo_Pos ;
    var query = new Query();
    query.objectIds = [evt.graphic.attributes.FID];
    featureLayer.selectFeatures(query);

    $("#code").html(content);
  });
});

$(document).ready(function(){
  $("#buttonCopy").click(function(event){
    var elementId = "postal";
    var aux = document.createElement("input");
    aux.setAttribute("value", document.getElementById(elementId).innerHTML);
    document.body.appendChild(aux);
    aux.select();
    document.execCommand("copy");
    document.body.removeChild(aux);
  });

  $("#closeModal").click(function(event){
    $("#modal").fadeOut();
  });
});
