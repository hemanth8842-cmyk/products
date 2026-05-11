sap.ui.define([
    "sap/ui/core/mvc/Controller"
], function (Controller) {
    "use strict";

    return Controller.extend("products.controller.Detail", {

        onInit: function () {
            var oRouter = this.getOwnerComponent().getRouter();
            oRouter.getRoute("detail").attachPatternMatched(this._onObjectMatched, this);
        },

        _onObjectMatched: function (oEvent) {
            var sProductId = oEvent.getParameter("arguments").productId;

            var oView = this.getView();
            var oModel = this.getOwnerComponent().getModel();

            // ✅ ensure model is set (important)
            oView.setModel(oModel);

            // ✅ bind element (your logic kept same)
            oView.bindElement({
                path: "/Products(" + sProductId + ")",

                events: {
                    dataRequested: function () {
                        oView.setBusy(true);
                    },
                    dataReceived: function () {
                        oView.setBusy(false);
                    }
                }
            });
        },

        onBack: function () {
            this.getOwnerComponent().getRouter().navTo("master");
        }

    });
});