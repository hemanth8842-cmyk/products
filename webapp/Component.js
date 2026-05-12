sap.ui.define([
    "sap/ui/core/UIComponent",
    "sap/ui/dom/includeStylesheet",
    "products/model/models"
], function (UIComponent, includeStylesheet, models) {
    "use strict";

    return UIComponent.extend("products.Component", {

        metadata: {
            manifest: "json",
            interfaces: [
                "sap.ui.core.IAsyncContentCreation"
            ]
        },

        init: function () {

            // CALL PARENT INIT
            UIComponent.prototype.init.apply(this, arguments);

            // LOAD CSS
            includeStylesheet("css/style.css");

            // CART MODEL
            var oCartModel = new sap.ui.model.json.JSONModel({
                cartItems: []
            });

            this.setModel(oCartModel, "cart");

            // INITIALIZE ROUTER
            this.getRouter().initialize();
        }

    });
});