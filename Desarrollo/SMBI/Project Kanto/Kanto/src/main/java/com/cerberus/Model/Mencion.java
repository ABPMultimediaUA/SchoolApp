package com.cerberus.Model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
/**
 * Created by Manuel on 09/12/2016.
 */
@Entity
@Table (name="Mencion")
public class Mencion {
    //Primary Key
    @Id
    @Column(name = "IDMENCION", nullable = false)
    private int idMencion;
    @Column(name = "TITULO", nullable = true)
    private String titulo;
    @Column(name = "DESCRIPCION", nullable = true)
    private String descripcion;
    @Column (name = "ASIGNATURA_HAS_CURSO_HAS_ALUMNO_IDASIGNATURA", nullable = true)
    private int idAsignatura;
    @Column (name = "ASIGNATURA_HAS_CURSO_HAS_ALUMNO_IDCURSO", nullable = true)
    private int idCurso;
    @Column (name = "ASIGNATURA_HAS_CURSO_HAS_ALUMNO_IDALUMNO", nullable = true)
    private int idAlumno;


    public Mencion() {

    }

    public Mencion(int idMencion, String titulo, String descripcion, int idAsignatura, int idCurso, int idAlumno){
        this.idMencion = idMencion;
        this.titulo = titulo;
        this.descripcion = descripcion;
        this.idAsignatura = idAsignatura;
        this.idCurso = idCurso;
        this.idAlumno = idAlumno;
    }

    public int getIdMencion() {
        return idMencion;
    }

    public void setIdMencion(int idMencion) {
        this.idMencion = idMencion;
    }

    public String getTitulo() {
        return titulo;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;

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
        sb.append("Mencion{")
                .append(" idMencion=").append(idMencion)
                .append(", titulo=").append(titulo)
                .append(", descripcion=").append(descripcion)
                .append(" idAsignatura=").append(idAsignatura)
                .append(" idCurso=").append(idCurso)
                .append(" idAlumno=").append(idAlumno)
                .append(" }");
        return sb.toString();
    }
}