package com.everis.restapplication.service;

import com.everis.restapplication.model.ClientInt;
import com.everis.restapplication.store.ClientIntManager;

import javax.ejb.Stateless;
import javax.ejb.TransactionManagement;
import javax.ejb.TransactionManagementType;
import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

@Stateless
@TransactionManagement(value = TransactionManagementType.CONTAINER)
public class ClientIntServiceBean implements ClientIntService{

    @Inject
    private ClientIntManager clientIntManager;

    @PersistenceContext(unitName = "ShopJPA")
    EntityManager entityManager;

    @Override
    public List<ClientInt> findAll() {
        return clientIntManager.findAll(entityManager);
    }

    @Override
    public ClientInt create(ClientInt clientInt) {
        return clientIntManager.create(clientInt, entityManager);
    }

    @Override
    public ClientInt findById(Integer id) {
        return clientIntManager.findById(id, entityManager);
    }

    @Override
    public ClientInt update(ClientInt clientInt) {
        return clientIntManager.update(clientInt, entityManager);
    }

    @Override
    public boolean delete(ClientInt clientInt) {
        return clientIntManager.delete(clientInt, entityManager);
    }
}
