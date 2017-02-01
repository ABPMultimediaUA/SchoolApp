package com.everis.javaschool.inventory;

import java.io.Serializable;
import java.util.List;

/**
 * Created by Manuel on 14/12/2016.
 */
public class AlumnoResponse implements Serializable {
    private static final long serialVersionUID = 1L;

    private final List<Alumno> alumnos;

    public AlumnoResponse(List<Alumno> alumnos) {
        this.alumnos = alumnos;
    }

    public List<Alumno> getAlumnos() {
        return alumnos;
    }
}
