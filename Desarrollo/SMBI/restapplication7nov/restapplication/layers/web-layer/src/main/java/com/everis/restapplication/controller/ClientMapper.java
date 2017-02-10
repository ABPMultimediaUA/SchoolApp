package com.everis.restapplication.controller;

import com.everis.restapplication.contract.Client;
import com.everis.restapplication.model.ClientInt;

import java.util.ArrayList;
import java.util.List;

public class ClientMapper {

    public List<Client> toClients(List<ClientInt> clientInts) {
        //TODO
        List<Client> retorno = new ArrayList<>();
        Client retornoCliente = null;
        for (int i = 0; i < clientInts.size(); i++) {
            retornoCliente = new Client();
            retornoCliente.setId(clientInts.get(i).getId());
            retornoCliente.setName(clientInts.get(i).getName());
            retornoCliente.setEmail(clientInts.get(i).getEmail());
            retorno.add(retornoCliente);
        }

        return retorno;
    }

    public ClientInt toClientInt(Client client) {
        //TODO

        ClientInt retorno = new ClientInt();
        retorno.setEmail(client.getEmail());
        retorno.setId(client.getId());
        retorno.setName(client.getName());

        return retorno;
    }

    public Client toClient(ClientInt clientInt) {
        //TODO

        Client retorno = new Client();
        retorno.setEmail(clientInt.getEmail());
        retorno.setName(clientInt.getName());
        retorno.setId(clientInt.getId());

        return retorno;
    }
}
