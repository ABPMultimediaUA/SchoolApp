package com.cerberus.Model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * Created by Ricardo on 03/12/2016.
 */

@Entity
@Table(name = "expediente")
public class Expediente {

    //Primary Key
    @Id
    @Column(name = "NUMEXPEDIENTE", nullable = false)
    private String numExpediente;
    @Column(name = "CALIFICACIONES", nullable = false)
    private String calificaciones;
    @Column(name = "NOTAMEDIA", nullable = false)
    private double notaMedia;

    public Expediente(){}

    public Expediente(String numExpediente, String calificaciones, double notaMedia){
        this.numExpediente = numExpediente;
        this.calificaciones = calificaciones;
        this.notaMedia = notaMedia;
    }

    public String getNumExpediente() {
        return numExpediente;
    }

    public void setNumExpediente(String numExpediente) {
        this.numExpediente = numExpediente;
    }

    public String getCalificaciones() {
        return calificaciones;
    }

    public void setCalificaciones(String calificaciones) {
        this.calificaciones = calificaciones;
    }

    public double getNotaMedia() {
        return notaMedia;
    }

    public void setNotaMedia(double notaMedia) {
        this.notaMedia = notaMedia;
    }
}
