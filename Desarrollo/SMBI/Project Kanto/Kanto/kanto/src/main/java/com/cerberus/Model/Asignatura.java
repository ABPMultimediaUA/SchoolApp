package com.cerberus.Model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * Created by Antonio on 12/2/2016.
 */

@Entity
@Table(name = "asignatura")
public class Asignatura {

    @Id
    @Column(name = "ID", nullable = false)
    private Integer id;
    @Column(name = "NOMBRE", nullable = false)
    private String nombre;
    @Column(name = "PROFESOR", nullable = false)
    private String profesor;

    public Asignatura(){

    }

    public Asignatura(Integer id, String nombre, String profesor){
        this.id = id;
        this.nombre = nombre;
        this.profesor = profesor;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getProfesor() {
        return profesor;
    }

    public void setProfesor(String profesor) {
        this.profesor = profesor;
    }

    @Override
    public String toString(){
        StringBuilder sb = new StringBuilder();
        sb.append("Asignatura{")
                .append(" id=").append(id)
                .append(", nombre=").append(nombre)
                .append(", profesor=").append(profesor)
                .append(" }");
        return sb.toString();
    }
}
