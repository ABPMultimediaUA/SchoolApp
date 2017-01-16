package com.cerberus.Model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * Created by Naiara on 12/12/2016.
 */

@Entity
@Table(name = "padre")
public class Padre {

    //Primary Key
    @Id
    @Column(name = "idPadre", nullable = false)
    private Integer idPadre;
    @Column(name = "Alumno_idAlumno", nullable = false)
    private Integer alumno;
    @Column(name = "nombre", nullable = false)
    private String nombre;
    @Column(name = "apellidos")
    private String apellidos;
    @Column(name = "user", nullable = false)
    private String user;
    @Column(name = "password", nullable = false)
    private String password;
    @Column(name = "email")
    private String email;
    @Column(name = "telefono")
    private String telefono;
    @Column(name = "dni")
    private String dni;


    public Padre() {

    }

    public Padre(Integer idPadre, Integer alumno, String nombre, String apellidos, String user, String password, String email, String telefono, String dni) {
        this.idPadre = idPadre;
        this.alumno = alumno;
        this.nombre = nombre;
        this.apellidos = apellidos;
        this.user = user;
        this.password = password;
        this.email = email;
        this.telefono = telefono;
        this.dni = dni;
    }

    public Integer getIdPadre() {
        return idPadre;
    }

    public void setIdPadre(Integer idPadre) {
        this.idPadre = idPadre;
    }

    public Integer getAlumno() {
        return alumno;
    }

    public void setAlumno(Integer alumno) {
        this.alumno = alumno;
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
        sb.append("Padre{")
                .append(" id=").append(idPadre)
                .append(", alumno=").append(alumno)
                .append(", nombre=").append(nombre)
                .append(", apellidos=").append(apellidos)
                .append(", user=").append(user)
                .append(", pass=").append(password)
                .append(" }");
        return sb.toString();
    }

}