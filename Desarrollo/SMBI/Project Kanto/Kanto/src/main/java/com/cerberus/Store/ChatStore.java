package com.cerberus.Store;

import com.cerberus.Model.Chat;

import javax.enterprise.context.ApplicationScoped;
import javax.persistence.EntityManager;
import java.util.List;

/**
 * Created by Naiara on 12/12/2016.
 *
*/

@ApplicationScoped
public class ChatStore {

    public ChatStore(){}

    public void addChat(Chat chat, EntityManager entityManager){

        if(!entityManager.contains(chat)){
            entityManager.persist(chat);
        }
    }

    /**
     * Hay que hacer un find con Padre??
     * */

    public boolean updateChat(Chat chatOld, Chat chatNew, EntityManager entityManager){

        boolean control = false;

        Chat aUpdatear = entityManager.find(Chat.class, chatOld.getProf_idProfesor());

        if(aUpdatear!=null){
            aUpdatear.setProf_idProfesor(chatNew.getProf_idProfesor());
            aUpdatear.setPad_idPadre(chatNew.getPad_idPadre());

            control = true;
        }

        return control;
    }

    public boolean deleteChat(Chat chat, EntityManager entityManager){

        boolean control = false;
        Chat aBorrar = entityManager.find(Chat.class, chat.getProf_idProfesor());

        if(aBorrar!=null){
            entityManager.remove(aBorrar);
            control = true;
        }

        return control;
    }

    public List<Chat> findChatAll(EntityManager entityManager){

        String query = "SELECT ch FROM Chat ch";

        List<Chat> list = entityManager.createQuery(query).getResultList();

        return list;
    }
}
