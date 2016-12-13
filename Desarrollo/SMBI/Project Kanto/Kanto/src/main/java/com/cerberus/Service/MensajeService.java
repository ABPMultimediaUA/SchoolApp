package com.cerberus.Service;

import com.cerberus.Model.Mensaje;

import javax.ejb.Local;
import java.util.List;

/**
 * Created by Naiara on 12/12/2016.
 */

@Local
public interface MensajeService {

    /**
     * Interfaz para el EJB donde definimos los metodos que vamos a implementar en la clase de implementacion
     * posteriormente
     * */

    public void addMensaje(Mensaje mensaje);
    public boolean updateMensaje(Mensaje mensajeOld, Mensaje mensajeNew);
    public boolean deleteMensaje(Mensaje mensaje);
    public List<Mensaje> findMensajeAll();
}
