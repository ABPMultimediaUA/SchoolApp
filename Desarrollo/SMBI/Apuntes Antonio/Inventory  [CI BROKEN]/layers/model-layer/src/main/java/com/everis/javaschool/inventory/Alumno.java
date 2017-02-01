package com.everis.javaschool.inventory;

import java.io.Serializable;
import java.util.Locale;

/**
 * Created by Manuel on 14/12/2016.
 */
public class Alumno implements Serializable {
    private static final long serialVersionUID = 1L;

    private String name;
    private String colegio;
    private Integer edad;

    public Alumno(String name, String colegio, Integer edad) {
        this.name = name;
        this.colegio = colegio;
        this.edad = edad;
    }

    public String getName() {
        return name;
    }

    public String getUpperCaseName() {
        return name.toUpperCase(Locale.getDefault());
    }

    public String getColegio() {
        return colegio;
    }

    public Integer getEdad() {
        return edad;
    }
}
