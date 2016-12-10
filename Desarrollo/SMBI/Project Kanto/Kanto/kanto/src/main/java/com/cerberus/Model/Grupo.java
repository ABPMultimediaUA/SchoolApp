package com.cerberus.Model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * Created by Ricardo on 03/12/2016.
 */

@Entity
@Table(name = "grupo")
public class Grupo {

    //Primary Key
    @Id
    @Column(name = "ID", nullable = false)
    private int id;
    @Column(name = "NOMBRE", nullable = false)
    private String nombre;

    public Grupo(){}

    public Grupo(int id, String nombre){
        this.id = id;
        this.nombre = nombre;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }
}
