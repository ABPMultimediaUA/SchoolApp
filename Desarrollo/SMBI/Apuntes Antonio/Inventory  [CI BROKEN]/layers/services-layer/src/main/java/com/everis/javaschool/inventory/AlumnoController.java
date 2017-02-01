package com.everis.javaschool.inventory;

import java.util.List;

/**
 * Created by Manuel on 14/12/2016.
 */
public abstract class AlumnoController {

        public static com.everis.javaschool.inventory.AlumnoResponse getAlumnoFor(String name) {
            List<com.everis.javaschool.inventory.Alumno> alumnos = AlumnoStore.retrieveProductsFor(name);
            return new AlumnoResponse(alumnos);
        }
}
