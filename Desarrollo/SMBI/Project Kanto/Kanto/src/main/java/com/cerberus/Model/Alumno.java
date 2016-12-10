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
    @Column(name = "idAlumno", nullable = false)
    private Integer idAlumno;
    @Column(name = "InformeAlumno_numExpediente", nullable = false)
    private Integer expediente;
    @Column(name = "nombre", nullable = false)
    private String nombre;
    @Column(name = "apellidos") //No deberia ser no nulo?
    private String apellidos;
    @Column(name = "user", nullable = false)
    private String user;
    @Column(name = "password", nullable = false)
    private String password;
    @Column(name = "email") //No deberia ser no nulo tmb?
    private String email;
    @Column(name = "telefono")
    private String telefono;
    @Column(name = "dni")
    private String dni;

    public Alumno(){

    }

    public Alumno(Integer idAlumno, Integer expediente, String nombre, String apellidos, String user, String password, String email, String telefono, String dni) {
        this.idAlumno = idAlumno;
        this.expediente = expediente;
        this.nombre = nombre;
        this.apellidos = apellidos;
        this.user = user;
        this.password = password;
        this.email = email;
        this.telefono = telefono;
        this.dni = dni;
    }

    public Integer getIdAlumno() {
        return idAlumno;
    }

    public void setIdAlumno(Integer idAlumno) {
        this.idAlumno = idAlumno;
    }

    public Integer getExpediente() {
        return expediente;
    }

    public void setExpediente(Integer expediente) {
        this.expediente = expediente;
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

    public String getUser() {
        return user;
    }

    public void setUser(String user) {
        this.user = user;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
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

    public String getDni() {
        return dni;
    }

    public void setDni(String dni) {
        this.dni = dni;
    }

    /**
     * @Override method to String(). Preferimos que nos devuelva la informacion de las variables de instancia
     * del objeto a simplemente su posicion en memoria.
     * */
    @Override
    public String toString(){
        StringBuilder sb = new StringBuilder();
        sb.append("Alumno{")
                .append(" id=").append(idAlumno)
                .append(", num. exp.=").append(expediente)
                .append(", nombre=").append(nombre)
                .append(", apellidos=").append(apellidos)
                .append(", user=").append(user)
                .append(", pass=").append(password)
                .append(" }");
        return sb.toString();
    }
}
