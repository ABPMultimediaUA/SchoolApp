package com.everis.javaschool.inventory.v1;

import com.everis.javaschool.inventory.InventoryResponse;
import com.everis.javaschool.inventory.ProductType;
import com.everis.javaschool.inventory.StoreInventoryController;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;

/**
 * Created by vrieraba on 23/09/2015.
 */
@Path("/v1")
public class InventoryService {

    @GET
    @Path("/find")
    @Produces("application/json")
    public InventoryResponse find(@QueryParam("type") ProductType type) {
        return StoreInventoryController.getInventoryFor(type);
    }
}

