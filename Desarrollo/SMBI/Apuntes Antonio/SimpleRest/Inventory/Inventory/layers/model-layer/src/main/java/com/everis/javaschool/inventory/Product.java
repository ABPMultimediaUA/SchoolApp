package com.everis.javaschool.inventory;

import java.io.Serializable;
import java.util.Locale;

public class Product implements Serializable{
    private static final long serialVersionUID = 1L;

    private final String name;

    public Product(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public String getUpperCaseName() {
        return name.toUpperCase(Locale.getDefault());
    }

}
