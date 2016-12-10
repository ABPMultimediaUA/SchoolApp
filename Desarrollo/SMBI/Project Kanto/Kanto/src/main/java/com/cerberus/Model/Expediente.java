package com.cerberus.Model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * Created by IO on 12/10/2016.
 */

@Entity
@Table(name = "expediente")
public class Expediente {

    //Primary key
    @Id
    @Column(name = "numExpediente")
    private Integer numExpediente;

    public Expediente(){}

    public Expediente(Integer numExpediente) {
        this.numExpediente = numExpediente;
    }

    public Integer getNumExpediente() {
        return numExpediente;
    }

    public void setNumExpediente(Integer numExpediente) {
        this.numExpediente = numExpediente;
    }

    @Override
    public String toString(){
        StringBuilder sb = new StringBuilder();
        sb.append("Expediente{")
                .append(" num.expediente=").append(numExpediente)
                .append(" }");
        return sb.toString();
    }
}
