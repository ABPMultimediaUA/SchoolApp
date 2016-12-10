package com.cerberus;

import com.cerberus.Model.Profesor;
import com.cerberus.Service.ProfesorService;
import junit.framework.Test;
import junit.framework.TestCase;
import junit.framework.TestSuite;
import org.apache.log4j.Logger;
import org.apache.openejb.jee.Application;

import javax.ejb.embeddable.EJBContainer;
import javax.naming.NamingException;
import java.util.List;

/**
 * Created by Ricardo on 02/12/2016.
 */
public class ProfesorTest extends TestCase {

    /**
     * Create the test case
     *
     * @param testName name of the test case
     */
    public ProfesorTest(String testName) {
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
        ProfesorService profesorService = lookupAProfesorService();
        List<Profesor> lista;

        /*
        * Anyadimos un profesor a la base de datos. Para ver los resultados, podemos o bien
        * hacer una select en el gestor de la Bd, o realizar la operacion findProfesorll desde aqui.
        *
        * ATENCION: Si volvemos a intentar anyadir la misma asignatura, la BD lanzara una excepcion, EVIDENTEMENTE.
        * No me seais burros y anyadais algo que ya estaba, borradlo primero o anyadid otro, con que cambieis la PK
        * es suficiente.
        * */


        Profesor profesorAux = new Profesor("45892651-C", "Neville", "Chamberlain", "nc@gmail.com", "555486923");

//        profesorService.addProfesor(profesorAux);


        /*
        * Cambiamos los datos del profesor que hemos introducido antes
        * */

//        Profesor profesorActualizar = new Profesor("45892651-C", "Neville", "Chamberlain el hdp", "nc@gmail.com", "555486923");
//        profesorService.updateProfesor(profesorAux, profesorActualizar);


        /*
        * Borramos un profesor de la Bd.
        * */

        profesorService.deleteProfesor(profesorAux); //se ha borrado el porofesor


        /*
        * Mostramos por consola una seleccion de todos los profesores
        * */

        lista = profesorService.findProfesorAll();
        System.out.println();
        System.out.println("Estos son todos los profesores:");
        for(int i=0; i<lista.size(); i++){
            System.out.println(lista.get(i).toString());
        }
        System.out.println();


        /*
        * Podeis ir haciendo en las clases de esta tarde Viernes 2 de Diciembre otros modelos, servicios y controladores
        * para las tablas para las que no me ha dado tiempo a mi.
        * */
    }

    public static ProfesorService lookupAProfesorService() throws NamingException{
        //Traemos al contenedor una instancia de implementacion de la interfaz de metodos de la clase Profesor
        Object object = ejbContainer.getContext().lookup("java:global/kanto/ProfesorServiceImpl");
        assertTrue(object instanceof ProfesorService);
        return (ProfesorService) object;
    }

    public static void stopTheContainer(){
        if(ejbContainer!=null){
            ejbContainer.close();
        }
    }

}
