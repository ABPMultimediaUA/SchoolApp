package com.cerberus.Service;

import com.cerberus.Model.Chat;
import com.cerberus.Store.ChatStore;

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
public class ChatServiceImpl implements ChatService{

    //Inyectamos el controlador
    @Inject
    private ChatStore chatStore;

    //Definimos el EntityManager
    @PersistenceContext(unitName = "KantoJPA")
    EntityManager entityManager;

    public ChatServiceImpl(){

    }

    //Operaciones CRUD basicas que tendran todas las clases relacionadas con entidades de la BD

    public void addChat(Chat chat) {
        chatStore.addChat(chat, entityManager);
    }

    public boolean updateChat(Chat chatOld, Chat chatNew) {
        return chatStore.updateChat(chatOld, chatNew, entityManager);
    }

    public boolean deleteChat(Chat chat) {
        return chatStore.deleteChat(chat, entityManager);
    }

    public List<Chat> findChatAll() {
        return chatStore.findChatAll(entityManager);
    }
}
