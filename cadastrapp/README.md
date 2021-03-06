Cadastrapp ADDON
==============  

Cet add-on est fait pour être intégré dans le visualiseur MapfishApp de geOrchestra. Il appelle des services de la webapp cadastrapp disponible ici : 

https://github.com/GFI-Informatique/cadastrapp

Les informations des services WMS et WFS sont à modifier en fonction du modèle utilisé (Qgis ou Arcopole).

Pour activer l'add-on cadastrapp, il faut modifier le fichier javascript GEOR_custom.js et rajouter dans la partie ADDONS: 

Attention pour la partie 
```
"options": { 
		"CNIL":{
			"cnil1RoleName" : 
```
Il faut rajouter ```ROLE_``` devant le nom du groupe ldap. Par exemple si votre groupe ldap CNIL1 est EL_CAD_CNIL1 alors la valeur de cnil1RoleName sera ROLE_EL_CAD_CNIL1

	[{
	"id": "cadastrapp_0", 
	"name": "Cadastrapp", 
	"title": { 
		"fr": "Cadastrapp", 
		"en": "Cadastrapp", 
		"es": "Cadastrapp",
		"de": "Cadastrapp", 
	},
	 "description": { 
		"fr": "Une série d'outils pour exploiter pleinement les données cadastrales de la DGFiP", 
		"en": "A series of tools to fully exploit the cadastral data DGFiP", 
		"es": "Una serie de herramientas para aprovechar al máximo los datos catastrales DGFiP",
		"de": "TODO" },
	"options": { 
		"target": "tbar_12",
		"webapp":{
			"url" : "http://hostname/cadastrapp"
		}
		"WMSLayer":{
			"layerNameInPanel":"",
			"transparent":true,
			"format": "image/png"
		},
		"WFSLayerSetting": {
			"request" : "getfeature",
			"version" : "1.0.0",
			"service" : "wfs",
			"outputFormat" : "application/json",
			"geometryField":"geom"
		},
		"defautStyleParcelle" :{
			"strokeColor": "#000000",
			"strokeWidth":"0.5",
           "pointRadius": 6,
			"pointerEvents": "visiblePainted",
			"fontSize": "10px" 
		},
		"selectedStyle" : {
			"defautColor":"#AAAAAA",
			"colorState1":"#FFFF00", //selection niveau 1
			"colorState2":"#81BEF7", // selection niveau 2
			"colorState3":"#57D53B", // selection niveau 3
			"opacity":"0.4",
			"strokeWidth":"3"
		},
		"popup" : {
			"timeToShow": 5000,
			"minZoom":14
		} 
		},
	"preloaded": "true"
	}],
