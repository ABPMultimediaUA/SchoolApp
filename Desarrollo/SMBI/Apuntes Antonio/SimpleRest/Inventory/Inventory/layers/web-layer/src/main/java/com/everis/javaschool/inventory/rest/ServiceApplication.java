package com.everis.javaschool.inventory.rest;

import com.everis.javaschool.inventory.v1.InventoryService;

import javax.ws.rs.core.Application;
import java.util.HashSet;
import java.util.Set;

/**
 * Created by vrieraba on 06/10/2015.
 */
public class ServiceApplication extends Application {

    private Set<Object> singletons = new HashSet<Object>();

    public ServiceApplication() {
        singletons.add(new InventoryService());
    }

    @Override
    public Set<Object> getSingletons() {
        return singletons;
    }
}
