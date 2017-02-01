package com.everis.restapplication.service;

import com.everis.restapplication.model.ClientInt;

import javax.ejb.Local;
import java.util.List;

@Local
public interface ClientIntService {

    List<ClientInt> findAll();

    ClientInt create(ClientInt clientInt);

    ClientInt findById(Integer id);

    ClientInt update(ClientInt clientInt);

    boolean delete(ClientInt clientInt);

}
