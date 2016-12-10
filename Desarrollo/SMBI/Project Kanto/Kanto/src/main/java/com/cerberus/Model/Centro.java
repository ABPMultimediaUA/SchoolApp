package com.cerberus.Model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * Created by Ricardo on 10/12/2016.
 */

@Entity
@Table(name = "centro")
public class Centro {

    //Primary Key
    @Id
    @Column(name = "IDCENTRO", nullable = false)
    private int idCentro;
    @Column(name = "NOMBRE", nullable = false)
    private String nombre;
    @Column(name = "DIRECCION", nullable = false)
    private String direccion;
    @Column(name = "TIPOCENTRO_TIPO", nullable = false)
    private String TipoCentro_tipo;
    @Column(name = "ADMINISTRADOR_IDADMINISTRADOR", nullable = false)
    private int Administrador_idAdministrador;

    public Centro() {
    }

    public Centro(int idCentro, String nombre, String direccion, String tipoCentro_tipo, int administrador_idAdministrador) {
        this.idCentro = idCentro;
        this.nombre = nombre;
        this.direccion = direccion;
        TipoCentro_tipo = tipoCentro_tipo;
        Administrador_idAdministrador = administrador_idAdministrador;
    }

    public int getIdCentro() {
        return idCentro;
    }

    public void setIdCentro(int idCentro) {
        this.idCentro = idCentro;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getDireccion() {
        return direccion;
    }

    public void setDireccion(String direccion) {
        this.direccion = direccion;
    }

    public String getTipoCentro_tipo() {
        return TipoCentro_tipo;
    }

    public void setTipoCentro_tipo(String tipoCentro_tipo) {
        TipoCentro_tipo = tipoCentro_tipo;
    }

    public int getAdministrador_idAdministrador() {
        return Administrador_idAdministrador;
    }

    public void setAdministrador_idAdministrador(int administrador_idAdministrador) {
        Administrador_idAdministrador = administrador_idAdministrador;
    }

    @Override
    public String toString(){
        StringBuilder sb = new StringBuilder();
        sb.append("Centro{")
                .append(" ID=").append(idCentro)
                .append(", nombre=").append(nombre)
                .append(", direccion=").append(direccion)
                .append(", Tipo de Centro=").append(TipoCentro_tipo)
                .append(", Administrador=").append(Administrador_idAdministrador)
                .append(" }");
        return sb.toString();
    }
}
