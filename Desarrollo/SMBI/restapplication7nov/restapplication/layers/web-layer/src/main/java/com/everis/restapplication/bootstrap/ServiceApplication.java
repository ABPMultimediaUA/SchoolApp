package com.everis.restapplication.bootstrap;

import com.everis.restapplication.controller.ClientController;

import javax.enterprise.context.spi.CreationalContext;
import javax.enterprise.inject.spi.Bean;
import javax.enterprise.inject.spi.BeanManager;
import javax.naming.InitialContext;
import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

public class ServiceApplication extends javax.ws.rs.core.Application {

    private final Set<Object> singletons = new HashSet<>();

    public ServiceApplication() {
        singletons.addAll(buildRestControllers());

    }
    @Override
    public Set<Object> getSingletons() {
        return singletons;
    }
    private List<Object> buildRestControllers() {
        try {
            InitialContext context = new InitialContext();
            BeanManager beanManager = (BeanManager) context.lookup("java:module/BeanManager");
            return Arrays.asList(
                    (Object) getController(beanManager, ClientController.class)
            );

        } catch (Exception e) {
            throw new RuntimeException(e);
        }

    }

    private Object getController(BeanManager beanManager, Class<?> type){
        Bean<?> bean = (Bean<?>) beanManager.getBeans(type).iterator().next();
        CreationalContext<?> ctx = beanManager.createCreationalContext(bean);
        return beanManager.getReference(bean, type, ctx);
    }

}
