package com.everis.restapplication.contract;

import com.everis.restapplication.contract.Client;

import javax.ejb.Remove;
import javax.persistence.PostUpdate;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.MatrixParam;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import java.io.Serializable;
import java.util.List;

@Produces({"application/json; charset=UTF-8"})
@Consumes({"application/json; charset=UTF-8"})
@Path("/client")
public interface ClientService extends Serializable{

    @GET
    List<Client> findAll();

    @GET
    @Path("/{id}")
    Client find(@PathParam("id")Integer id);

    @POST
    Client create(Client client);

    @PUT
    Client update(Client client);

    @DELETE
    boolean delete(Client client);

}
