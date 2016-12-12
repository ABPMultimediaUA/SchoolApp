package com.cerberus.Model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.sql.Blob;

/**
 * Created by Ricardo on 10/12/2016.
 */
@Entity
@Table(name = "tipocentro")
public class TipoCentro {

    //Primary Key
    @Id
    @Column(name = "TIPO", nullable = false)
    private String tipo;

    public TipoCentro(){

    }

    public TipoCentro(String tipo) {
        this.tipo = tipo;
    }

    public String getTipo() {
        return tipo;
    }

    public void setTipo(String tipo) {
        this.tipo = tipo;
    }

    @Override
    public String toString(){
        StringBuilder sb = new StringBuilder();
        sb.append("Tipo de centro{")
                .append(" Tipo=").append(tipo)
                .append(" }");
        return sb.toString();
    }
}
