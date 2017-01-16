package com.everis.javaschool.inventory;

import java.io.Serializable;
import java.util.List;

public final class InventoryResponse implements Serializable {
    private static final long serialVersionUID = 1L;

    private final List<Product> products;

    public InventoryResponse(List<Product> products) {
        this.products = products;
    }

    public List<Product> getProducts() {
        return products;
    }
}
