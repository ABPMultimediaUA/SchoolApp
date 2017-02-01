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

}
