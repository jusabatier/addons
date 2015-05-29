
	/** api: (define)
	*  module = GEOR
	*  class = Cadastrapp
	*  base_link = `Ext.util.Observable <http://extjs.com/deploy/dev/docs/?class=Ext.util.Observable>`_
	*/
Ext.namespace("GEOR")

	var resultProprietaireWindow;

  	/** public: method[onClickRechercheProprietaire]
     *  :param layer: 
     *  Create ...TODO
     */
    addNewResultProprietaire = function(result) {
		if (resultProprietaireWindow == null) {
			initResultProprietaire();
		}
		resultProprietaireWindow.show();
		
		var tabs = resultProprietaireWindow.items.items[0];
		var newGrid = new Ext.grid.GridPanel({
			title: 'TEST '+ tabs.items.length,
			height: 400,
			border: true,
			colModel: new Ext.grid.ColumnModel([
				{
					id:'ccoinsee',
					dataIndex: 'ccoinsee',
					header: 'Code INSEE',
					sortable: true
				},{
					id:'libcom_min',
					dataIndex: 'libcom_min',
					header: 'Nom Commune',
					sortable: true
				}]),
			store: result,
			listeners: {
				click: function(grid, rowIndex, columnIndex, e) {
					
				}				
			}
		});
		tabs.insert(0, newGrid);
		tabs.setActiveTab(0);
	}
		
    initResultProprietaire = function() {						
		//fenêtre principale
		resultProprietaireWindow = new Ext.Window({
			title: 'Séléction de propriétaires',
			frame: true,
			autoScroll:true,
			minimizable: true,
			closable: true,
			resizable: false,
			draggable : true,
			constrainHeader: true,
			
			border:false,
			width: 600,
			defaults: {autoHeight:true},
			
			listeners: {
				close: function(window) {
					resultProprietaireWindow = null;
				}
			},
			
			items: [
			{
				xtype:'tabpanel'
			}],
			
			buttons: [
			{
				text: 'Fermer',
				listeners: {
					click: function(b,e) {
						resultProprietaireWindow.close();
					}
				}
			}]
		});
	};