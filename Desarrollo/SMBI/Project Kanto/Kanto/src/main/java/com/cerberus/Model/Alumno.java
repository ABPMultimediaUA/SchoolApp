package com.cerberus.Model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * Created by Antonio on 01/12/2016.
 *
 * Clase Modelo. Esta relacionada con la tabla Alumno de la BD. Esa relacion la definimos mediante las anotaciones
 * @Entity y @Table, propias de la Java Persistence API (JPA).
 *
 * Mediante estas relaciones no necesitamos definir mediante JDBC las operaciones de forma manual
 * sino que tendremos una persistencia manejada de forma automatica.
 */

@Entity
@Table(name = "alumno")
public class Alumno {

    //Primary Key
    @Id
    @Column(name = "DNI", nullable = false)
    private String dni;
    @Column(name = "NOMBRE", nullable = false)
    private String nombre;
    @Column(name = "APELLIDOS", nullable = false)
    private String apellidos;

    public Alumno(){

    }

    public Alumno(String dni, String nombre, String apellidos){
        this.dni = dni;
        this.nombre = nombre;
        this.apellidos = apellidos;
    }

    public String getDni() {
        return dni;
    }

    public void setDni(String dni) {
        this.dni = dni;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getApellidos() {
        return apellidos;
    }

    public void setApellidos(String apellidos) {
        this.apellidos = apellidos;
    }

    /**
     * @Override method to String(). Preferimos que nos devuelva la informacion de las variables de instancia
     * del objeto a simplemente su posicion en memoria.
     * */
    @Override
    public String toString(){
        StringBuilder sb = new StringBuilder();
        sb.append("Alumno{")
                .append(" DNI=").append(dni)
                .append(", nombre=").append(nombre)
                .append(", apellidos=").append(apellidos)
                .append(" }");
        return sb.toString();
    }
}
