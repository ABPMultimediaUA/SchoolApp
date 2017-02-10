package com.everis.restapplication.store;

import com.everis.restapplication.model.ClientInt;

import javax.enterprise.context.ApplicationScoped;
import javax.persistence.EntityManager;
import java.util.List;

@ApplicationScoped
public class ClientIntStore {

    public List<ClientInt> findAll(EntityManager entityManager) {

        String query = "SELECT c FROM ClientInt c";
        List<ClientInt> list = entityManager.createQuery(query).getResultList();

        return list;
    }

    public ClientInt findById(Integer id, EntityManager entityManager) {

        String query = "SELECT c FROM ClientInt c WHERE c.id = :idParameter";

        ClientInt queryResponse = (ClientInt) entityManager.createQuery(query)
                .setParameter("idParameter", id).getSingleResult();

        return queryResponse;
    }

    public ClientInt create(ClientInt clientInt, EntityManager entityManager) {

        entityManager.persist(clientInt);
        return clientInt;
    }

    public ClientInt update(ClientInt clientInt, EntityManager entityManager){

        ClientInt aUpdatear = entityManager.find(ClientInt.class, clientInt.getId());

        aUpdatear.setName(clientInt.getName());
        aUpdatear.setSurname(clientInt.getSurname());
        aUpdatear.setNif(clientInt.getNif());
        aUpdatear.setDirection(clientInt.getDirection());
        aUpdatear.setPhone(clientInt.getDirection());
        aUpdatear.setEmail(clientInt.getEmail());
        entityManager.merge(aUpdatear);

        return aUpdatear;
    }

    public boolean delete(ClientInt clientInt, EntityManager entityManager) {

        boolean control = false;
        ClientInt aBorrar = entityManager.find(ClientInt.class, clientInt.getId());

        if(aBorrar!=null){
            entityManager.remove(aBorrar);
            control = true;
        }

        return control;
    }
}
