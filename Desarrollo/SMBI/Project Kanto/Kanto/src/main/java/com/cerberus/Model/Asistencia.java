package com.cerberus.Model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
/**
 * Created by Manuel on 09/12/2016.
 */
@Entity
@Table (name="Asistencia")
public class Asistencia {
    //Primary Key
    @Id
    @Column(name = "IDASISTENCIA", nullable = false)
    private int idAsistencia;
    @Column(name = "FECHA", nullable = false)
    private String fecha;
    @Column(name = "DESCRIPCION", nullable = true)
    private String descripcion;
    @Column(name = "FALTA", nullable = true)
    private boolean falta;
    @Column (name = "ASIGNATURA_HAS_CURSO_HAS_ALUMNO_IDASIGNATURA", nullable = false)
    private int idAsignatura;
    @Column (name = "ASIGNATURA_HAS_CURSO_HAS_ALUMNO_IDCURSO", nullable = false)
    private int idCurso;
    @Column (name = "ASIGNATURA_HAS_CURSO_HAS_ALUMNO_IDALUMNO", nullable = false)
    private int idAlumno;


    public Asistencia() {

    }

    public Asistencia(int idAsistencia, String fecha, String descripcion, Boolean falta, int idAsignatura, int idCurso, int idAlumno){
        this.idAsistencia = idAsistencia;
        this.fecha = fecha;
        this.descripcion = descripcion;
        this.falta = falta;
        this.idAsignatura = idAsignatura;
        this.idCurso = idCurso;
        this.idAlumno = idAlumno;
    }

    public int getIdAsistencia() {
        return idAsistencia;
    }

    public void setIdAsistencia(int idAsistencia) {
        this.idAsistencia = idAsistencia;
    }

    public String getFecha() {
        return fecha;
    }

    public void setFecha(String fecha) {
        this.fecha = fecha;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;

    }

    public boolean getFalta() {
        return falta;
    }

    public void setFalta(boolean falta) {
        this.falta = falta;
    }


    public int getIdAsignatura() {
        return idAsignatura;
    }


    public int getIdCurso() {
        return idCurso;
    }


    public int getIdAlumno() {
        return idAlumno;
    }


    @Override
    public String toString(){
        StringBuilder sb = new StringBuilder();
        sb.append("Asistencia{")
                .append(" idAsistencia=").append(idAsistencia)
                .append(", fecha=").append(fecha)
                .append(", descripcion=").append(descripcion)
                .append(" falta=").append(falta)
                .append(" idAsignatura=").append(idAsignatura)
                .append(" idCurso=").append(idCurso)
                .append(" idAlumno=").append(idAlumno)
                .append(" }");
        return sb.toString();
    }
}