package com.cerberus.Model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * Created by Ricardo on 02/12/2016.
 * Clase Modelo. Esta relacionada con la tabla Profesor de la BD. Esa relacion la definimos mediante las anotaciones
 * @Entity y @Table, propias de la Java Persistence API (JPA).
 *
 * Mediante estas relaciones no necesitamos definir mediante JDBC las operaciones de forma manual
 * sino que tendremos una persistencia manejada de forma automatica.
 */

@Entity
@Table(name = "profesor")
public class Profesor {

    //Primary Key
    @Id
    @Column(name = "DNI", nullable = false)
    private String dni;
    @Column(name = "NOMBRE", nullable = false)
    private String nombre;
    @Column(name = "APELLIDOS", nullable = false)
    private String apellidos;
    @Column(name = "EMAIL", nullable = false)
    private String email;
    @Column(name = "TELEFONO", nullable = false)
    private String telefono;

    public Profesor(){}

    public Profesor(String dni, String nombre, String apellidos, String email, String telefono){
        this.dni = dni;
        this.nombre = nombre;
        this.apellidos = apellidos;
        this.email = email;
        this.telefono = telefono;
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

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getTelefono() {
        return telefono;
    }

    public void setTelefono(String telefono) {
        this.telefono = telefono;
    }
}
