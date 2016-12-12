package com.everis.javaschool.inventory;

import java.util.Arrays;
import java.util.EnumMap;
import java.util.List;

public class InventoryStore {

    private static final Product MEMORY_RAM = new Product("Memoria RAM 16GB");
    private static final Product COMPUTER_GPU = new Product("Nvidea Gforce 3GB");
    private static final Product OFFICE_SUITE_APP = new Product("Office Standard edition");
    private static final Product GAME = new Product("Colin Mcrae 2015");
    private static final Product PIZZA_PROSCUITTO = new Product("Dr. Oetker Pizza Proscuitto");
    private static final Product COCA_COLA = new Product("Coca Cola Zero");
    private static final Product SUDADERA = new Product("Sudadera Addidas Negra");
    private static final Product CALCETINES = new Product("Calcetines Lana Blancos");
    private static final Product FAIRY = new Product("Fairy 500ml");
    private static final Product COLONIA = new Product("Colonia Hugo Boss 100ml");
    private static final Product CORREA_MASCOTA = new Product("Correa para Mascota");
    private static final Product FUNDA_SOFA = new Product("Funca para Sofa");
    private static final Product DISCO_40_PRINCIPALES = new Product("Disco Éxtos 40 Principales");

    private static final EnumMap<ProductType, List<Product>> MAPA = new EnumMap<ProductType, List<Product>>(ProductType.class);

    static{
        MAPA.put(ProductType.HARDWARE, Arrays.asList(MEMORY_RAM, COMPUTER_GPU));
        MAPA.put(ProductType.SOFTWARE, Arrays.asList(OFFICE_SUITE_APP, GAME));
        MAPA.put(ProductType.FOOD, Arrays.asList(PIZZA_PROSCUITTO));
        MAPA.put(ProductType.DRINKS, Arrays.asList(COCA_COLA));
        MAPA.put(ProductType.CLOTHES, Arrays.asList(SUDADERA));
        MAPA.put(ProductType.UNDERWEAR, Arrays.asList(CALCETINES));
        MAPA.put(ProductType.CLEANING, Arrays.asList(FAIRY));
        MAPA.put(ProductType.BEAUTY, Arrays.asList(COLONIA));
        MAPA.put(ProductType.PETS, Arrays.asList(CORREA_MASCOTA));
        MAPA.put(ProductType.HOME, Arrays.asList(FUNDA_SOFA));
        MAPA.put(ProductType.MUSIC, Arrays.asList(DISCO_40_PRINCIPALES));
    }


    public static List<Product> retrieveProductsFor(ProductType productType) {

        return MAPA.get(productType);
    }
}
