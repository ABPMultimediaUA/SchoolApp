package com.everis.javaschool.inventory;

import org.testng.Assert;
import org.testng.annotations.Test;

public class ProductTest {

    @Test
    public void test() {
        //Given
        String aName = "A name";
        //When
        Product product = new Product(aName);
        //Then
        Assert.assertEquals(product.getName(), "A name");
        Assert.assertEquals(product.getUpperCaseName(), "A NAME");
    }
}
