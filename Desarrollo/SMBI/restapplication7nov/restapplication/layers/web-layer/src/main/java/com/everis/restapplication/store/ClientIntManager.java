package com.everis.restapplication.store;

import com.everis.restapplication.model.ClientInt;
import com.everis.restapplication.service.ClientIntService;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.persistence.EntityManager;
import java.util.List;

@ApplicationScoped
public class ClientIntManager {

    @Inject
    private ClientIntStore clientIntStore;

    public List<ClientInt> findAll(EntityManager entityManager) {
        return clientIntStore.findAll(entityManager);
    }

    public ClientInt create(ClientInt clientInt, EntityManager entityManager) {
        return clientIntStore.create(clientInt, entityManager);
    }

    public ClientInt findById(Integer id, EntityManager entityManager) {
        return clientIntStore.findById(id, entityManager);
    }

    public ClientInt update(ClientInt clientInt, EntityManager entityManager){
        return clientIntStore.update(clientInt, entityManager);
    }

    public boolean delete(ClientInt clientInt, EntityManager entityManager){
        return clientIntStore.delete(clientInt, entityManager);
    }
}
