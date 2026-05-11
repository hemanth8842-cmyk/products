sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageBox"
], function (Controller, MessageToast, JSONModel, MessageBox) {
    "use strict";

    return Controller.extend("products.controller.Cart", {

        _lastDeletedItem: null,
        _lastDeletedIndex: null,

        // ✅ NEW: Load cart from localStorage
        onInit: function () {
            var oModel = this.getOwnerComponent().getModel("cart");

            var savedCart = localStorage.getItem("cartItems");
            if (savedCart) {
                oModel.setProperty("/cartItems", JSON.parse(savedCart));
            }
        },

        // ✅ NEW: Save cart to localStorage
        _saveCart: function () {
            var oModel = this.getView().getModel("cart");
            var aItems = oModel.getProperty("/cartItems");
            localStorage.setItem("cartItems", JSON.stringify(aItems));
        },

        onNavBack: function () {
            this.getOwnerComponent().getRouter().navTo("master");
        },

        onIncrease: function (oEvent) {
            var oContext = oEvent.getSource().getBindingContext("cart");
            var oItem = oContext.getObject();

            // ✅ NEW: Stock Validation
            if (oItem.Quantity >= oItem.UnitsInStock) {
                MessageToast.show("Stock limit reached");
                return;
            }

            if (oItem.Quantity < 6) {
                oItem.Quantity++;
            } else {
                MessageToast.show("Max 6 allowed");
            }

            oContext.getModel().refresh(true);
            this._saveCart(); // NEW
        },

        onDecrease: function (oEvent) {
            var oContext = oEvent.getSource().getBindingContext("cart");
            var oItem = oContext.getObject();

            if (oItem.Quantity > 1) {
                oItem.Quantity--;
            } else {
                this.onRemove(oEvent);
                return;
            }

            oContext.getModel().refresh(true);
            this._saveCart(); // NEW
        },

        onRemove: function (oEvent) {
            var oContext = oEvent.getSource().getBindingContext("cart");
            var oModel = oContext.getModel();
            var aItems = oModel.getProperty("/cartItems") || [];

            var iIndex = oContext.getPath().split("/").pop();

            this._lastDeletedItem = aItems[iIndex];
            this._lastDeletedIndex = iIndex;

            aItems.splice(iIndex, 1);

            oModel.setProperty("/cartItems", aItems);

            if (this.byId("undoStrip")) {
                this.byId("undoStrip").setVisible(true);
            }

            MessageToast.show("Item removed");
            this._saveCart(); // NEW
        },

        onUndoDelete: function () {
            if (!this._lastDeletedItem) return;

            var oModel = this.getView().getModel("cart");
            var aItems = oModel.getProperty("/cartItems") || [];

            aItems.splice(this._lastDeletedIndex, 0, this._lastDeletedItem);

            oModel.setProperty("/cartItems", aItems);

            if (this.byId("undoStrip")) {
                this.byId("undoStrip").setVisible(false);
            }

            this._lastDeletedItem = null;
            this._lastDeletedIndex = null;

            MessageToast.show("Item restored");
            this._saveCart(); // NEW
        },

        formatLineTotal: function (price, qty) {
            return (price && qty)
                ? "Total: " + (price * qty).toFixed(2)
                : "Total: 0.00";
        },

        // ✅ UPDATED: Discount Logic ADDED (no removal)
        getGrandTotal: function (items) {
            if (!items || !items.length) {
                return "Grand Total: 0.00";
            }

            var total = items.reduce(function (sum, item) {
                return sum + (item.Price * item.Quantity);
            }, 0);

            var discount = 0;

            // NEW: Discount based on quantity
            var totalQty = items.reduce(function (sum, item) {
                return sum + item.Quantity;
            }, 0);

            if (totalQty >= 10) {
                discount = total * 0.20; // 20%
            } else if (totalQty >= 5) {
                discount = total * 0.10; // 10%
            }

            var finalTotal = total - discount;

            return "Total: " + total.toFixed(2) +
                " | Discount: -" + discount.toFixed(2) +
                " | Pay: " + finalTotal.toFixed(2);
        },

        // BUY FLOW

        onOpenBuyDialog: function () {
            var oModel = new JSONModel({
                address: "",
                pincode: "",
                mobile: ""
            });

            this.getView().setModel(oModel, "buy");
            this.byId("buyDialog").open();
        },

        onCloseBuyDialog: function () {
            this.byId("buyDialog").close();
        },

        onConfirmBuy: function () {
            var oData = this.getView().getModel("buy").getData();

            if (!oData.address || !oData.pincode || !oData.mobile) {
                MessageToast.show("Please fill all details");
                return;
            }

            this.byId("buyDialog").close();
            MessageBox.success("🎉 Order placed successfully!");
        }

    });
});