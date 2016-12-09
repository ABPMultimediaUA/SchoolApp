package com.cerberus.Model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
/**
 * Created by Manuel on 09/12/2016.
 */
@Entity
@Table (name="Asignatura_has_curso_has_alumno")
public class Asignatura_has_curso_has_alumno {

    @Column (name = "ASIGNATURA_HAS_CURSO_HAS_ALUMNO_IDASIGNATURA", nullable = true)
    private int idAsignatura;
    @Column (name = "ASIGNATURA_HAS_CURSO_HAS_ALUMNO_IDCURSO", nullable = true)
    private int idCurso;
    @Column (name = "ASIGNATURA_HAS_CURSO_HAS_ALUMNO_IDALUMNO", nullable = true)
    private int idAlumno;


    public Asignatura_has_curso_has_alumno() {

    }

    public Asignatura_has_curso_has_alumno(int idAsignatura, int idCurso, int idAlumno){
        this.idAsignatura = idAsignatura;
        this.idCurso = idCurso;
        this.idAlumno = idAlumno;
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
        sb.append("Asignatura_has_curso_has_alumno{")
                .append(" idAsignatura=").append(idAsignatura)
                .append(" idCurso=").append(idCurso)
                .append(" idAlumno=").append(idAlumno)
                .append(" }");
        return sb.toString();
    }
}