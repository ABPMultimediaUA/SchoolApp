package com.cerberus.Service;

import com.cerberus.Store.MensajeStore;
import com.cerberus.Model.Mensaje;

import javax.ejb.Stateless;
import javax.ejb.TransactionManagement;
import javax.ejb.TransactionManagementType;
import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

/**
 * Created by Naiara on 12/12/2016.
 */

@Stateless
@TransactionManagement(value = TransactionManagementType.CONTAINER)

public class MensajeServiceImpl implements MensajeService {

    //Inyectamos el controlador
    @Inject
    private MensajeStore mensajeStore;

    //Definimos el EntityManager
    @PersistenceContext(unitName = "KantoJPA")
    EntityManager entityManager;

    public MensajeServiceImpl(){

    }

    //Operaciones CRUD basicas que tendran todas las clases relacionadas con entidades de la BD

    public void addMensaje(Mensaje mensaje) {
        mensajeStore.addMensaje(mensaje, entityManager);
    }

    public boolean updateMensaje(Mensaje mensajeOld, Mensaje mensajeNew) {
        return mensajeStore.updateMensaje(mensajeOld, mensajeNew, entityManager);
    }

    public boolean deleteMensaje(Mensaje mensaje) {
        return mensajeStore.deleteMensaje(mensaje, entityManager);
    }

    public List<Mensaje> findMensajeAll() {
        return mensajeStore.findMensajeAll(entityManager);
    }
}
