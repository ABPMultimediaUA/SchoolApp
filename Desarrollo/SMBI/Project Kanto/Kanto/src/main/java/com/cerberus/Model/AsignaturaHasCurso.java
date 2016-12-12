package com.cerberus.Model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * Created by Ricardo on 10/12/2016.
 */

@Entity
@Table(name = "asignatura_has_curso")
public class AsignaturaHasCurso {

    @Id
    @Column(name = "ASIGNATURA_IDASIGNATURA", nullable = false)
    private int Asignatura_idAsignatura;
    @Id
    @Column(name = "CURSO_IDCURSO", nullable = false)
    private int Curso_idCurso;
    @Column(name = "PROFESOR_IDPROFESOR", nullable = false)
    private int Profesor_idProfesor;

    public AsignaturaHasCurso() {

    }

    public AsignaturaHasCurso(int Asignatura_idAsignatura, int Curso_idCurso, int Profesor_idProfesor){
        this.Asignatura_idAsignatura = Asignatura_idAsignatura;
        this.Curso_idCurso = Curso_idCurso;
        this.Profesor_idProfesor = Profesor_idProfesor;
    }

    public int getAsignatura_idAsignatura() {
        return Asignatura_idAsignatura;
    }

    public void setAsignatura_idAsignatura(int asignatura_idAsignatura) {
        Asignatura_idAsignatura = asignatura_idAsignatura;
    }

    public int getCurso_idCurso() {
        return Curso_idCurso;
    }

    public void setCurso_idCurso(int curso_idCurso) {
        Curso_idCurso = curso_idCurso;
    }

    public int getProfesor_idProfesor() {
        return Profesor_idProfesor;
    }

    public void setProfesor_idProfesor(int profesor_idProfesor) {
        Profesor_idProfesor = profesor_idProfesor;
    }

    @Override
    public String toString(){
        StringBuilder sb = new StringBuilder();
        sb.append("Asignatura tiene {")
                .append(" ID de Asignatura:=").append(Asignatura_idAsignatura)
                .append(", ID de Curso=").append(Curso_idCurso)
                .append(", ID de Profesor=").append(Profesor_idProfesor)
                .append(" }");
        return sb.toString();
    }
}
