package com.cerberus.Model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * Created by Naiara on 12/12/2016.
 */

@Entity
@Table(name = "profesor")
public class Profesor {


    /**
     * @Throws esta mal definido en BD, profesor necesitaria un user y pass como Padre y Alumno
     * */

    //Primary Key
    @Id
    @Column(name = "idProfesor", nullable = false)
    private Integer idProfesor;
    @Column(name = "nombre", nullable = false)
    private String nombre;
    @Column(name = "apellidos")
    private String apellidos;

    //@Column(name = "user", nullable = false)
    //private String user;
    //@Column(name = "password", nullable = false)
    //private String password;

    @Column(name = "email")
    private String email;
    @Column(name = "telefono")
    private Integer telefono;
    @Column(name = "dni")
    private String dni;

    public Profesor(){

    }

    public Profesor(Integer idProfesor, Integer expediente, String nombre, String apellidos, String user, String password, String email, Integer telefono, String dni) {
        this.idProfesor = idProfesor;
        this.nombre = nombre;
        this.apellidos = apellidos;
        //this.user = user;
        //this.password = password;
        this.email = email;
        this.telefono = telefono;
        this.dni = dni;
    }

    public Integer getIdProfesor() {
        return idProfesor;
    }

    public String getNombre() {
        return nombre;
    }

    public String getApellidos() {
        return apellidos;
    }

    public String getEmail() {
        return email;
    }

    public Integer getTelefono() {
        return telefono;
    }

    public String getDni() {
        return dni;
    }

    public void setIdProfesor(Integer idProfesor) {
        this.idProfesor = idProfesor;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public void setApellidos(String apellidos) {
        this.apellidos = apellidos;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setTelefono(Integer telefono) {
        this.telefono = telefono;
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
        sb.append("Profesor{")
                .append(" id=").append(idProfesor)
                .append(", nombre=").append(nombre)
                .append(", apellidos=").append(apellidos)
                //.append(", user=").append(user)
                //.append(", pass=").append(password)
                .append(" }");
        return sb.toString();
    }
}
