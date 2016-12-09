package com.cerberus.Model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
/**
 * Created by Manuel on 09/12/2016.
 */
@Entity
@Table (name="Examen")
public class Examen {
    //Primary Key
    @Id
    @Column(name = "IDEXAMEN", nullable = false)
    private int idExamen;
    @Column(name = "FECHA", nullable = true)
    private String fecha;
    @Column(name = "NOTA", nullable = true)
    private float nota;
    @Column (name = "ASIGNATURA_HAS_CURSO_HAS_ALUMNO_IDASIGNATURA", nullable = false)
    private int idAsignatura;
    @Column (name = "ASIGNATURA_HAS_CURSO_HAS_ALUMNO_IDCURSO", nullable = false)
    private int idCurso;
    @Column (name = "ASIGNATURA_HAS_CURSO_HAS_ALUMNO_IDALUMNO", nullable = false)
    private int idAlumno;


    public Examen() {

    }

    public Examen(int idExamen, String fecha, float nota, int idAsignatura, int idCurso, int idAlumno){
        this.idExamen = idExamen;
        this.fecha = fecha;
        this.nota = nota;
        this.idAsignatura = idAsignatura;
        this.idCurso = idCurso;
        this.idAlumno = idAlumno;
    }

    public int getIdExamen() {
        return idExamen;
    }

    public void setIdExamen(int idExamen) {
        this.idExamen = idExamen;
    }

    public String getFecha() {
        return fecha;
    }

    public void setFecha(String fecha) {
        this.fecha = fecha;
    }

    public float getNota() {
        return nota;
    }

    public float setNota(float nota) {
        this.nota = nota;
        return nota;
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
        sb.append("Examen{")
                .append(" idExamen=").append(idExamen)
                .append(", fecha=").append(fecha)
                .append(", nota=").append(nota)
                .append(" idAsignatura=").append(idAsignatura)
                .append(" idCurso=").append(idCurso)
                .append(" idAlumno=").append(idAlumno)
                .append(" }");
        return sb.toString();
    }
}