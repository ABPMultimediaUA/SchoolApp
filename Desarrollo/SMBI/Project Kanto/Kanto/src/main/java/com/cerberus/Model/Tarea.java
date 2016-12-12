package com.cerberus.Model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
/**
 * Created by Manuel on 09/12/2016.
 */
@Entity
@Table (name="Tarea")
public class Tarea {
    //Primary Key
    @Id
    @Column(name = "IDTAREA", nullable = false)
    private int idTarea;
    @Column(name = "FECHA_LIMITE", nullable = true)
    private String fecha_limite;
    @Column(name = "DESCRIPCION", nullable = false)
    private String descripcion;
    @Column(name = "COMPLETADA", nullable = false)
    private boolean completada;
    @Column (name = "ASIGNATURA_HAS_CURSO_HAS_ALUMNO_IDASIGNATURA", nullable = true)
    private int idAsignatura;
    @Column (name = "ASIGNATURA_HAS_CURSO_HAS_ALUMNO_IDCURSO", nullable = true)
    private int idCurso;
    @Column (name = "ASIGNATURA_HAS_CURSO_HAS_ALUMNO_IDALUMNO", nullable = true)
    private int idAlumno;


    public Tarea() {

    }

    public Tarea(int idTarea, String fecha_limite, String descripcion, Boolean completada, int idAsignatura, int idCurso, int idAlumno){
        this.idTarea = idTarea;
        this.fecha_limite = fecha_limite;
        this.descripcion = descripcion;
        this.completada = completada;
        this.idAsignatura = idAsignatura;
        this.idCurso = idCurso;
        this.idAlumno = idAlumno;
    }

    public int getIdTarea() {
        return idTarea;
    }

    public void setIdTarea(int idTarea) {
        this.idTarea = idTarea;
    }

    public String getFecha_limite() {
        return fecha_limite;
    }

    public void setFecha_limite(String fecha_limite) {
        this.fecha_limite = fecha_limite;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;

    }

    public boolean getCompletada() {
        return completada;
    }

    public void setCompletada(boolean completada) {
        this.completada = completada;
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
        sb.append("Tarea{")
                .append(" idTarea=").append(idTarea)
                .append(", fecha_limite=").append(fecha_limite)
                .append(", descripcion=").append(descripcion)
                .append(" completada=").append(completada)
                .append(" idAsignatura=").append(idAsignatura)
                .append(" idCurso=").append(idCurso)
                .append(" idAlumno=").append(idAlumno)
                .append(" }");
        return sb.toString();
    }
}