package com.everis.javaschool.inventory.v1;

import com.everis.javaschool.inventory.AlumnoController;
import com.everis.javaschool.inventory.AlumnoResponse;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;

/**
 * Created by vrieraba on 23/09/2015.
 */
@Path("/v1")
public class AlumnoService {

    @GET
    @Path("/findalumno")
    @Produces("application/json")
    public AlumnoResponse find(@QueryParam("name") String name) {
        return AlumnoController.getAlumnoFor(name);
    }
}

