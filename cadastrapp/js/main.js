Ext.namespace("GEOR.Addons.Cadastre");

GEOR.Addons.Cadastrapp = Ext.extend(GEOR.Addons.Base, {

    control: null,

    window: null,

    /**
     * Method: init
     * 
     * @param: record - {Ext.data.record} a record with the addon parameters
     */
    init: function(record) {
        
        // Create closure to be able to create windows
        var initThis = this;
        
        // Get information for addons options
        GEOR.Addons.Cadastre.cadastrappWebappUrl = record.data.options.webapp.url+"services/";
        
        GEOR.Addons.Cadastre.WFSLayerSetting = record.data.options.WFSLayerSetting;
        
        var WMSSetting = record.data.options.WMSLayer;
        
        // Call the webapp configuration services
        Ext.Ajax.request({
            method: 'GET',
            url: GEOR.Addons.Cadastre.cadastrappWebappUrl + 'getConfiguration',
            success: function(response) {
                var configuration = Ext.decode(response.responseText);
                
                GEOR.Addons.Cadastre.cnil1RoleName = configuration.cnil1RoleName;
                GEOR.Addons.Cadastre.cnil2RoleName = configuration.cnil2RoleName;
                GEOR.Addons.Cadastre.minCharToSearch = configuration.minNbCharForSearch;
                
                GEOR.Addons.Cadastre.WFSLayerSetting.nameFieldIdParcelle = configuration.cadastreLayerIdParcelle;
                GEOR.Addons.Cadastre.WFSLayerSetting.wfsUrl = configuration.cadastreWFSURL;
                GEOR.Addons.Cadastre.WFSLayerSetting.typename = configuration.cadastreLayerName;
                
                WMSSetting.layerNameGeoserver = configuration.cadastreLayerName;
                WMSSetting.url =  configuration.cadastreWMSURL;
           
               
                // TODO check why click on global
                GEOR.Addons.Cadastre.click;
                
                var cadastrapp = new GEOR.Addons.Cadastre.Menu({
                    map: initThis.map,
                    popupOptions: {
                        unpinnable: false,
                        draggable: true
                    }
                });
        
                GEOR.Addons.Cadastre.addWMSLayer(WMSSetting);

                GEOR.Addons.Cadastre.selection=[];
                GEOR.Addons.Cadastre.selection.state=[];
                GEOR.Addons.Cadastre.selection.state.list = record.data.options.selectedStyle.colorState1;
                GEOR.Addons.Cadastre.selection.state.selected = record.data.options.selectedStyle.colorState2;
                GEOR.Addons.Cadastre.selection.state.details = record.data.options.selectedStyle.colorState3;
                
                GEOR.Addons.Cadastre.relevePropriete=[];
                GEOR.Addons.Cadastre.relevePropriete.maxProprietaire = 25;
                
                // Init gobal variables   
                GEOR.Addons.Cadastre.selectLayer;
                GEOR.Addons.Cadastre.result=[];
                GEOR.Addons.Cadastre.result.tabs;
                GEOR.Addons.Cadastre.result.window;
                
                GEOR.Addons.Cadastre.createSelectionControl(record.data.options.defautStyleParcelle , record.data.options.selectedStyle);
                GEOR.Addons.Cadastre.addPopupOnhover(record.data.options.popup);
        
                initThis.window = new Ext.Window({
                    title: OpenLayers.i18n('cadastrapp.cadastre_tools'),
                    width: 540,
                    closable: true,
                    closeAction: "hide",
                    resizable: false,
                    border: false,
                    constrainHeader: true,
                    cls: 'cadastrapp',
                    items: [ {
                        xtype: 'toolbar',
                        border: false,
                        items: cadastrapp.actions
                    } ],
                    listeners: {
                        "hide": function() {
                            initThis.item && initThis.item.setChecked(false);
                            initThis.components && initThis.components.toggle(false);
                        },
                        scope: initThis
                    }
                });
        
                if (initThis.target) {
                    // create a button to be inserted in toolbar:
                    initThis.components = initThis.target.insertButton(initThis.position, {
                        xtype: 'button',
                        tooltip: initThis.getTooltip(record),
                        iconCls: "addon-cadastrapp",
                        handler: initThis._onCheckchange,
                        scope: initThis
                    });
                    initThis.target.doLayout();
                    // create a menu item for the "tools" menu:
                    initThis.item = new Ext.menu.CheckItem({
                        text: initThis.getText(record),
                        qtip: initThis.getQtip(record),
                        iconCls: "addon-cadastrapp",
                        checked: false,
                        listeners: {
                            "checkchange": initThis._onCheckchange,
                            scope: initThis
                        }
                    });
                }
            },
            failure: function(result) {
                alert(OpenLayers.i18n('cadastrapp.connection.error'));
            }
        });
    },
    

    /**
     * Method: _onCheckchange Callback on checkbox state changed
     */
    _onCheckchange: function(item, checked) {
        if (checked) {
            this.window.show();
            this.window.alignTo(Ext.get(this.map.div), "t-t", [ 0, 5 ], true);
        } else {
            this.window.hide();
        }
    },

    /**
     * Method: destroy Called by GEOR_tools when deselecting this addon
     */
    destroy: function() {
        
        // Remove menu
        this.window.hide();
        this.control = null;
                
        if (GEOR.Addons.Cadastre.result.windows){
            GEOR.Addons.Cadastre.result.windows.close();
        }
        GEOR.Addons.Cadastre.tabs=null;
        
        // Remove WMS Layer
        layer.map.removeLayer(GEOR.Addons.Cadastre.WMSLayer);
        GEOR.Addons.Cadastre.WMSLayer.destroy();
        
        // Remove WFSLayer
        layer.map.removeLayer(GEOR.Addons.Cadastre.selectLayer);
        GEOR.Addons.Cadastre.selectLayer.destroy();

        GEOR.Addons.Base.prototype.destroy.call(this);

    }
    
});
