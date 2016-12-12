package com.everis.javaschool.inventory.bootstrap;

import javax.servlet.http.HttpServlet;

/**
 * Created by vrieraba on 23/09/2015.
 */
public class BootstrapServlet extends HttpServlet {

    private static final long serialVersionUID = 1L;

    private static final String BOOTSTRAP_MESSAGE_INIT = "Bootstrapping .....";
    private static final String BOOTSTRAP_MESSAGE_END = "Bootstrapping finished!";

    public void init() {
        System.out.println(BOOTSTRAP_MESSAGE_INIT);
        System.out.println(BOOTSTRAP_MESSAGE_END);
    }
}
