package com.everis.javaschool.inventory;

import java.util.List;

/**
 * Created by admin on 12/12/2016.
 */
public abstract class ParentInventoryController {

    public static InventoryResponse getInventoryFor(ProductType productType) {
        List<Product> products = InventoryStore.retrieveProductsFor(productType);
        return new InventoryResponse(products);
    }

    public static String dummyMethodForDuplication(ProductType productType) {
        String response;
        if (ProductType.HARDWARE.equals(productType)) {
            response = "It´s just a dummy method for duplication";
        } else if (ProductType.SOFTWARE.equals(productType)) {
            response = "It´s just a dummy method for duplication";
        } else if (ProductType.BEAUTY.equals(productType)) {
            response = "It´s just a dummy method for duplication";
        } else if (ProductType.CLEANING.equals(productType)) {
            response = "It´s just a dummy method for duplication";
        } else if (ProductType.FOOD.equals(productType)) {
            response = "It´s just a dummy method for duplication";
        } else if (ProductType.DRINKS.equals(productType)) {
            response = "It´s just a dummy method for duplication";
        } else {
            response = null;
        }
        return response;
    }

}
