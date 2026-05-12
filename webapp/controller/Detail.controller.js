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

            oView.setModel(oModel);

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
        },

        // ✅ IMAGE FORMATTER
        getProductImage: function (productId) {

            var mImages = {
                1: "https://images.unsplash.com/photo-1587731556938-38755b4803a6?auto=format&fit=crop&w=400&q=80",
                2: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=400&q=80",
                3: "https://images.unsplash.com/photo-1587049352851-8d4e89133924?auto=format&fit=crop&w=400&q=80",
                4: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=400&q=80",
                5: "https://images.unsplash.com/photo-1546069901-5ec6a79120b0?auto=format&fit=crop&w=400&q=80",
                6: "https://images.unsplash.com/photo-1478145046317-39f10e56b5e9?auto=format&fit=crop&w=400&q=80",
                7: "https://images.unsplash.com/photo-1589927986089-35812388d1f4?auto=format&fit=crop&w=400&q=80",
                8: "https://images.unsplash.com/photo-1604908812753-64f6bfa5f7f3?auto=format&fit=crop&w=400&q=80",
                9: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80",
                10: "https://images.unsplash.com/photo-1526318472351-bc6f0a3d2c0d?auto=format&fit=crop&w=400&q=80",
                11: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=400&q=80",
                12: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=400&q=80",
                13: "https://images.unsplash.com/photo-1506084868230-bb9d95c24759?auto=format&fit=crop&w=400&q=80",
                14: "https://images.unsplash.com/photo-1514517220031-ff1b3d6f53c3?auto=format&fit=crop&w=400&q=80",
                15: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=400&q=80",
                16: "https://images.unsplash.com/photo-1525755662778-989d0524087e?auto=format&fit=crop&w=400&q=80",
                17: "https://images.unsplash.com/photo-1600891963935-cf3a07d8f9a3?auto=format&fit=crop&w=400&q=80",
                18: "https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&w=400&q=80",
                19: "https://images.unsplash.com/photo-1505253213348-cd54cfc1f6b3?auto=format&fit=crop&w=400&q=80",
                20: "https://images.unsplash.com/photo-1532635241-17e820acc59f?auto=format&fit=crop&w=400&q=80",
                21: "https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&w=400&q=80",
                22: "https://images.unsplash.com/photo-1484981138541-b1b8b6e36d8b?auto=format&fit=crop&w=400&q=80",
                23: "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?auto=format&fit=crop&w=400&q=80",
                24: "https://images.unsplash.com/photo-1512058564366-c9e3e0464b0d?auto=format&fit=crop&w=400&q=80",
                25: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=400&q=80",
                26: "https://images.unsplash.com/photo-1565299507177-b0ac66763828?auto=format&fit=crop&w=400&q=80",
                27: "https://images.unsplash.com/photo-1562967916-eb82221dfb92?auto=format&fit=crop&w=400&q=80",
                28: "https://images.unsplash.com/photo-1516685018646-549d4d1c8c3c?auto=format&fit=crop&w=400&q=80",
                29: "https://images.unsplash.com/photo-1498579809087-ef1e558fd1da?auto=format&fit=crop&w=400&q=80",
                30: "https://images.unsplash.com/photo-1505253758473-96b7015fcd40?auto=format&fit=crop&w=400&q=80",
                31: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=400&q=80",
                32: "https://images.unsplash.com/photo-1529042410759-befb1204b468?auto=format&fit=crop&w=400&q=80",
                33: "https://images.unsplash.com/photo-1540189549336-4f1a09e9d3b4?auto=format&fit=crop&w=400&q=80",
                34: "https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=400&q=80",
                35: "https://images.unsplash.com/photo-1523987355523-c7b5b0723c07?auto=format&fit=crop&w=400&q=80",
                36: "https://images.unsplash.com/photo-1505253210343-2df4df0d7f84?auto=format&fit=crop&w=400&q=80",
                37: "https://images.unsplash.com/photo-1473093226795-af9932fe5856?auto=format&fit=crop&w=400&q=80",
                38: "https://images.unsplash.com/photo-1529042410759-2e9cbfae0c3e?auto=format&fit=crop&w=400&q=80",
                39: "https://images.unsplash.com/photo-1490818387583-1baba5e638af?auto=format&fit=crop&w=400&q=80",
                40: "https://images.unsplash.com/photo-1512058454905-6b841e7ad132?auto=format&fit=crop&w=400&q=80",
                41: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=400&q=80",
                42: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80",
                43: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=400&q=80",
                44: "https://images.unsplash.com/photo-1523987355523-c7b5b0723c07?auto=format&fit=crop&w=400&q=80",
                45: "https://images.unsplash.com/photo-1529042410759-befb1204b468?auto=format&fit=crop&w=400&q=80",
                46: "https://images.unsplash.com/photo-1514517220031-ff1b3d6f53c3?auto=format&fit=crop&w=400&q=80",
                47: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=400&q=80",
                48: "https://images.unsplash.com/photo-1484981138541-b1b8b6e36d8b?auto=format&fit=crop&w=400&q=80",
                49: "https://images.unsplash.com/photo-1526318472351-bc6f0a3d2c0d?auto=format&fit=crop&w=400&q=80",
                50: "https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&w=400&q=80",
                51: "https://images.unsplash.com/photo-1506084868230-bb9d95c24759?auto=format&fit=crop&w=400&q=80",
                52: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=400&q=80",
                53: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=400&q=80",
                54: "https://images.unsplash.com/photo-1505253758473-96b7015fcd40?auto=format&fit=crop&w=400&q=80",
                55: "https://images.unsplash.com/photo-1478145046317-39f10e56b5e9?auto=format&fit=crop&w=400&q=80",
                56: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80",
                57: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=400&q=80",
                58: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=400&q=80",
                59: "https://images.unsplash.com/photo-1512058454905-6b841e7ad132?auto=format&fit=crop&w=400&q=80",
                60: "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?auto=format&fit=crop&w=400&q=80"
            };

            return mImages[productId] || "https://via.placeholder.com/250";
        }

    });
});