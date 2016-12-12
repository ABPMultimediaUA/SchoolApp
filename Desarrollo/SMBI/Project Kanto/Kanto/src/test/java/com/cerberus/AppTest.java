package com.cerberus;

import com.cerberus.Model.Alumno;
import com.cerberus.Service.AlumnoService;
import junit.framework.Test;
import junit.framework.TestCase;
import junit.framework.TestSuite;
import org.apache.log4j.Logger;
import org.apache.openejb.jee.Application;

import javax.ejb.embeddable.EJBContainer;
import javax.naming.NamingException;
import java.util.List;

import static org.testng.Assert.assertTrue;

/**
 * Unit test for simple App.
 */
public class AppTest 
    extends TestCase
{
    /**
     * Create the test case
     *
     * @param testName name of the test case
     */
    public AppTest( String testName )
    {
        super( testName );
    }

    /**
     * @return the suite of tests being tested
     */
    public static Test suite()
    {
        return new TestSuite( AppTest.class );
    }

    /**
     * Rigourous Test :-)
     */
    public void testApp()
    {
        assertTrue( true );
    }






    //Para pruebas en las que necesitemos un Logger, tenemos importado desde el pom de Maven Log4J
    //En el caso que quisieramos almacenar los resultados de las consultas en un archivo de logs y no por consola
    //lo podriamos hacer cambiando 2 lineas.
    private static final Logger LOGGER = Logger.getLogger(Application.class);
    //Empleamos un contenedor de EJBs para gestionar transaccionalidad, seguridad e implementación en un servidor de aplicaciones
    private static EJBContainer ejbContainer;

    public static void main( String[] args )
    {
        try{
            //Creamos el contenedor de EJB y ejecutamos
            ejbContainer = EJBContainer.createEJBContainer();
            execute();
        } catch (NamingException e){
            LOGGER.error(e);
        } finally {
            //Paramos el contenedor
            stopTheContainer();
        }


    }
    public static void execute() throws NamingException{
        AlumnoService alumnoService = lookupAAlumnoService();
        List<Alumno> lista;




        /*
        * Anyadimos un alumno a la base de datos. Para ver los resultados, podemos o bien
        * hacer una select en el gestor de la Bd, o realizar la operacion findAlumnoAll desde aqui.
        *
        * ATENCION: Si volvemos a intentar anyadir el mismo alumno, la BD lanzara una excepcion, EVIDENTEMENTE.
        * No me seais burros y anyadais algo que ya estaba, borradlo primero o anyadid otro, con que cambieis la PK
        * es suficiente.
        * */


        Alumno alumnoAnyadir = new Alumno("6738555-X", "mmme", "Testimonio");

        alumnoService.addAlumno(alumnoAnyadir);


        /*
        * Cambiamos los datos del alumno que hemos introducido antes
        * */

//        Alumno alumnoActualizar = new Alumno("6738561-X", "Juan", "Boronat"); //Introducimos mal antes el apellido
//        alumnoService.updateAlumno(alumnoAnyadir, alumnoActualizar);


        /*
        * Borramos un alumno de la Bd.
        * */

//        alumnoService.deleteAlumno(alumnoAnyadir); //Juan Perez se ha desmatriculado


        /*
        * Mostramos por consola una seleccion de todos los alumnos
        * */

        lista = alumnoService.findAlumnoAll();
        System.out.println();
        System.out.println("Estos son todos los alumnos matriculados:");
        for(int i=0; i<lista.size(); i++){
            System.out.println(lista.get(i).toString());
        }
        System.out.println();


        /*
        * Podriamos hacer las mismas operaciones con Asignatura. Podeis crear vosotros test para ello de la misma
        * forma que he hecho yo con alumno. Cuando haya claves ajenas habra bastante mas dificultad, pero son asi.
        *
        * Podeis ir haciendo en las clases de esta tarde Viernes 2 de Diciembre otros modelos, servicios y controladores
        * para las tablas para las que no me ha dado tiempo a mi.
        * */
    }

    public static AlumnoService lookupAAlumnoService() throws NamingException{
        //Traemos al contenedor una instancia de implementacion de la interfaz de metodos de la clase Alumno
        Object object = ejbContainer.getContext().lookup("java:global/kanto/AlumnoServiceImpl");
        assertTrue(object instanceof AlumnoService);
        return (AlumnoService) object;
    }

    public static void stopTheContainer(){
        if(ejbContainer!=null){
            ejbContainer.close();
        }
    }
}
