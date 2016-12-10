package com.cerberus;

import com.cerberus.Model.Grupo;
import com.cerberus.Service.GrupoService;
import junit.framework.Test;
import junit.framework.TestCase;
import junit.framework.TestSuite;
import org.apache.log4j.Logger;
import org.apache.openejb.jee.Application;

import javax.ejb.embeddable.EJBContainer;
import javax.naming.NamingException;
import java.util.List;

/**
 * Created by Ricardo on 03/12/2016.
 */
public class GrupoTest extends TestCase{

    /**
     * Create the test case
     *
     * @param testName name of the test case
     */
    public GrupoTest(String testName) {
        super(testName);
    }

    /**
     * @return the suite of tests being tested
     */
    public static Test suite() {
        return new TestSuite(AppTest.class);
    }

    /**
     * Rigourous Test :-)
     */
    public void testApp() {
        assertTrue(true);
    }

    //Para pruebas en las que necesitemos un Logger, tenemos importado desde el pom de Maven Log4J
    //En el caso que quisieramos almacenar los resultados de las consultas en un archivo de logs y no por consola
    //lo podriamos hacer cambiando 2 lineas.
    private static final Logger LOGGER = Logger.getLogger(Application.class);
    //Empleamos un contenedor de EJBs para gestionar transaccionalidad, seguridad e implementación en un servidor de aplicaciones
    private static EJBContainer ejbContainer;

    public static void main(String[] args) {
        try {
            //Creamos el contenedor de EJB y ejecutamos
            ejbContainer = EJBContainer.createEJBContainer();
            execute();
        } catch (NamingException e) {
            LOGGER.error(e);
        } finally {
            //Paramos el contenedor
            stopTheContainer();
        }

    }

    public static void execute() throws NamingException{
        GrupoService grupoService = lookupAGrupoService();
        List<Grupo> lista;

        /*
        * Anyadimos un grupo a la base de datos. Para ver los resultados, podemos o bien
        * hacer una select en el gestor de la Bd, o realizar la operacion findProfesorll desde aqui.
        *
        * ATENCION: Si volvemos a intentar anyadir el mismo grupo, la BD lanzara una excepcion, EVIDENTEMENTE.
        * No me seais burros y anyadais algo que ya estaba, borradlo primero o anyadid otro, con que cambieis la PK
        * es suficiente.
        * */


        Grupo grupoAux = new Grupo(6, "Hrupo 6");

 //       grupoService.addGrupo(grupoAux);

        /*
        * Cambiamos los datos del grupo que hemos introducido antes
        * */

        Grupo grupoActualizar = new Grupo(6, "Grupo 6");
        grupoService.updateGrupo(grupoAux, grupoActualizar);
//

        /*
        * Borramos un grupo de la Bd.
        * */

//        grupoService.deleteGrupo(grupoAux); //se ha borrado el grupo


        /*
        * Mostramos por consola una seleccion de todos los grupo
        * */

        lista = grupoService.findGrupoAll();
        System.out.println();
        System.out.println("Estos son todos los grupos:");
        for(int i=0; i<lista.size(); i++){
            System.out.println(lista.get(i).toString());
        }
        System.out.println();


        /*
        * Podeis ir haciendo en las clases de esta tarde Viernes 2 de Diciembre otros modelos, servicios y controladores
        * para las tablas para las que no me ha dado tiempo a mi.
        * */
    }

    public static GrupoService lookupAGrupoService() throws NamingException{
        //Traemos al contenedor una instancia de implementacion de la interfaz de metodos de la clase Grupo
        Object object = ejbContainer.getContext().lookup("java:global/kanto/GrupoServiceImpl");
        assertTrue(object instanceof GrupoService);
        return (GrupoService) object;
    }

    public static void stopTheContainer(){
        if(ejbContainer!=null){
            ejbContainer.close();
        }
    }

}
