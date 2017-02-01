package com.everis.javaschool.inventory;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by Manuel on 14/12/2016.
 */
public class AlumnoStore {

    private static final com.everis.javaschool.inventory.Alumno uno = new com.everis.javaschool.inventory.Alumno("Juan", "Carmelitas", 10);
    private static final com.everis.javaschool.inventory.Alumno dos = new com.everis.javaschool.inventory.Alumno("Pedro", "Carmelitas", 13);
    private static final com.everis.javaschool.inventory.Alumno tres = new com.everis.javaschool.inventory.Alumno("Juan", "Municipal", 7);
    private static final com.everis.javaschool.inventory.Alumno cuatro = new com.everis.javaschool.inventory.Alumno("Carlos", "Metropolitano", 14);
    private static final com.everis.javaschool.inventory.Alumno cinco = new com.everis.javaschool.inventory.Alumno("Pablo", "Municipal", 8);

    private static final List<com.everis.javaschool.inventory.Alumno> list = new ArrayList<com.everis.javaschool.inventory.Alumno>();

    static {
        list.add(uno);list.add(dos);list.add(tres);list.add(cuatro);list.add(cinco);
    }


    public static List<com.everis.javaschool.inventory.Alumno> retrieveProductsFor(String name) {

        List<com.everis.javaschool.inventory.Alumno> retorno = new ArrayList<>();

        for (int i = 0; i < list.size(); i++) {
            if(list.get(i).getName().equals(name)){
                retorno.add(list.get(i));
            }
        }
        return retorno;
    }
}
