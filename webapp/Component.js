sap.ui.define([
    "sap/ui/core/UIComponent",
    "products/model/models"
], (UIComponent, models) => {
    "use strict";

    return UIComponent.extend("products.Component", {
        metadata: {
            manifest: "json",
            interfaces: [
                "sap.ui.core.IAsyncContentCreation"
            ]
        },

      init: function () {
    UIComponent.prototype.init.apply(this, arguments);

    
  var oCartModel = new sap.ui.model.json.JSONModel({
    cartItems: []  
});

this.setModel(oCartModel, "cart");
    this.setModel(oCartModel, "cart");

    this.getRouter().initialize();
}
    });
});