package com.cerberus.Model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
/**
 * Created by Manuel on 09/12/2016.
 */
@Entity
@Table (name="Comentarios_sobre_el_alumno")
public class Comentarios_sobre_el_alumno {
    //Primary Key
    @Id
    @Column(name = "IDCOMENTARIOS_SOBRE_EL_ALUMNO", nullable = false)
    private int idComentarios_sobre_el_alumno;
    @Column(name = "TITULO", nullable = true)
    private String titulo;
    @Column(name = "TEXTO", nullable = false)
    private String texto;
    @Column (name = "ASIGNATURA_HAS_CURSO_HAS_ALUMNO_IDASIGNATURA", nullable = false)
    private int idAsignatura;
    @Column (name = "ASIGNATURA_HAS_CURSO_HAS_ALUMNO_IDCURSO", nullable = false)
    private int idCurso;
    @Column (name = "ASIGNATURA_HAS_CURSO_HAS_ALUMNO_IDALUMNO", nullable = false)
    private int idAlumno;


    public Comentarios_sobre_el_alumno() {

    }

    public Comentarios_sobre_el_alumno(int idComentarios_sobre_el_alumno, String titulo, String texto, int idAsignatura, int idCurso, int idAlumno){
        this.idComentarios_sobre_el_alumno = idComentarios_sobre_el_alumno;
        this.titulo = titulo;
        this.texto = texto;
        this.idAsignatura = idAsignatura;
        this.idCurso = idCurso;
        this.idAlumno = idAlumno;
    }

    public int getIdComentarios_sobre_el_alumno() {
        return idComentarios_sobre_el_alumno;
    }

    public void setIdComentarios_sobre_el_alumno(int idComentarios_sobre_el_alumno) {
        this.idComentarios_sobre_el_alumno = idComentarios_sobre_el_alumno;
    }

    public String getTitulo() {
        return titulo;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public String getTexto() {
        return texto;
    }

    public void setTexto(String texto) {
        this.texto = texto;

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
        sb.append("Comentarios_sobre_el_alumno{")
                .append(" idComentarios_sobre_el_alumno=").append(idComentarios_sobre_el_alumno)
                .append(", titulo=").append(titulo)
                .append(", texto=").append(texto)
                .append(" idAsignatura=").append(idAsignatura)
                .append(" idCurso=").append(idCurso)
                .append(" idAlumno=").append(idAlumno)
                .append(" }");
        return sb.toString();
    }
}