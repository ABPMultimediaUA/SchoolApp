package com.cerberus.Model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * Created by Ricardo on 10/12/2016.
 */

@Entity
@Table(name = "administrador")
public class Administrador {

    //Primary Key
    @Id
    @Column(name = "IDADMINISTRADOR", nullable = false)
    private int idAdministrador;
    @Column(name = "NOMBRE", nullable = false)
    private String nombre;
    @Column(name = "APELLIDOS", nullable = false)
    private String apellidos;
    @Column(name = "USER", nullable = false)
    private String user;
    @Column(name = "PASSWORD", nullable = false)
    private String password;
    @Column(name = "EMAIL", nullable = false)
    private String email;
    @Column(name = "TELEFONO", nullable = false)
    private int telefono;

    public Administrador() {
    }

    public Administrador(int idAdministrador, String nombre, String apellidos, String user, String password, String email, int telefono) {
        this.idAdministrador = idAdministrador;
        this.nombre = nombre;
        this.apellidos = apellidos;
        this.user = user;
        this.password = password;
        this.email = email;
        this.telefono = telefono;
    }

    public int getIdAdministrador() {
        return idAdministrador;
    }

    public void setIdAdministrador(int idAdministrador) {
        this.idAdministrador = idAdministrador;
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

    public int getTelefono() {
        return telefono;
    }

    public void setTelefono(int telefono) {
        this.telefono = telefono;
    }

    @Override
    public String toString(){
        StringBuilder sb = new StringBuilder();
        sb.append("Administrador{")
                .append(" ID=").append(idAdministrador)
                .append(", nombre=").append(nombre)
                .append(", apellidos=").append(apellidos)
                .append(", usuario=").append(user)
                .append(", contrasenya=").append(password)
                .append(", email=").append(email)
                .append(", telefono=").append(telefono)
                .append(" }");
        return sb.toString();
    }
}
