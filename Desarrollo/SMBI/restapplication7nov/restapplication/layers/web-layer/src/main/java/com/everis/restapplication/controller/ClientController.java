package com.everis.restapplication.controller;

import com.everis.restapplication.contract.Client;
import com.everis.restapplication.contract.ClientService;
import com.everis.restapplication.model.ClientInt;
import com.everis.restapplication.service.ClientIntService;

import javax.ejb.EJB;
import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import java.util.ArrayList;
import java.util.List;

@ApplicationScoped
public class ClientController implements ClientService {

    @EJB
    private ClientIntService bean;

    @Inject
    private ClientMapper mapper;


    @Override
    public List<Client> findAll() {

        List<ClientInt> list = new ArrayList<>();
        List<Client> returnList = new ArrayList<>();
        list = bean.findAll();
        returnList = mapper.toClients(list);

        return returnList;
    }

    @Override
    public Client find(Integer id) {
        // validate id value
        ClientInt clientInt; //TODO call to service to obtain client
        Client client = null; // TODO call mapper to covert clientInt to Client
        if (id > 0) {
            clientInt = bean.findById(id);
            client = mapper.toClient(clientInt);
        }
        return client;
    }

    @Override
    public Client create(Client client) {
        // validate client value

        ClientInt clientInt; // TODO call mapper to covert client to ClientInt
        clientInt = mapper.toClientInt(client);
        ClientInt clientIntResponse; //TODO call to service to create client
        clientIntResponse = bean.create(clientInt);
        Client clientResponse; // TODO call mapper to covert clientIntResponse to Client
        clientResponse = mapper.toClient(clientIntResponse);
        return clientResponse;
    }

    @Override
    public Client update(Client client) {

        ClientInt clientInt;
        clientInt = mapper.toClientInt(client);
        ClientInt clientInt1;
        clientInt1 = bean.update(clientInt);
        Client clientResponse;
        clientResponse = mapper.toClient(clientInt1);

        return clientResponse;
    }

    @Override
    public boolean delete(Client client) {

        ClientInt clientInt;
        clientInt = mapper.toClientInt(client);
        boolean control;
        control = bean.delete(clientInt);

        return control;
    }

}
