package com.cerberus.Service;

import com.cerberus.Model.Chat;

import javax.ejb.Local;
import java.util.List;

/**
 * Created by Naiara on 12/12/2016.
 */

@Local
public interface ChatService {

    /**
     * Interfaz para el EJB donde definimos los metodos que vamos a implementar en la clase de implementacion
     * posteriormente
     * */

    public void addChat(Chat alumno);
    public boolean updateChat(Chat chatOld, Chat chatNew);
    public boolean deleteChat(Chat chat);
    public List<Chat> findChatAll();
}
