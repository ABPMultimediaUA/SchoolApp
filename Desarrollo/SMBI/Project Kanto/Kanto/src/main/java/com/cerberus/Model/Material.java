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
@Table(name = "material")
public class Material {

    //Primary Key
    @Id
    @Column(name = "IDMATERIAL", nullable = false)
    private int idMaterial;
    @Column(name = "CONTENIDO", nullable = false)
    private Blob contenido;
    @Column(name = "ASIGNATURA_HAS_CURSO_ASIGNATURA_ID_ASIGNATURA", nullable = false)
    private int asignatura_has_curso_Asignatura_id_Asignatura;
    @Column(name = "ASIGNATURA_HAS_CURSO_CURSO_ID_CURSO", nullable = false)
    private int asignatura_has_curso_Curso_id_Curso;

    public Material() {
    }

    public Material(int idMaterial, Blob contenido, int asignatura_has_curso_Asignatura_id_Asignatura, int asignatura_has_curso_Curso_id_Curso) {
        this.idMaterial = idMaterial;
        this.contenido = contenido;
        this.asignatura_has_curso_Asignatura_id_Asignatura = asignatura_has_curso_Asignatura_id_Asignatura;
        this.asignatura_has_curso_Curso_id_Curso = asignatura_has_curso_Curso_id_Curso;
    }

    public int getIdMaterial() {
        return idMaterial;
    }

    public void setIdMaterial(int idMaterial) {
        this.idMaterial = idMaterial;
    }

    public Blob getContenido() {
        return contenido;
    }

    public void setContenido(Blob contenido) {
        this.contenido = contenido;
    }

    public int getAsignatura_has_curso_Asgnatura_id_Asignatura() {
        return asignatura_has_curso_Asignatura_id_Asignatura;
    }

    public void setAsignatura_has_curso_Asgnatura_id_Asignatura(int asignatura_has_curso_Asgnatura_id_Asignatura) {
        this.asignatura_has_curso_Asignatura_id_Asignatura = asignatura_has_curso_Asgnatura_id_Asignatura;
    }

    public int getAsignatura_has_curso_Curso_id_Curso() {
        return asignatura_has_curso_Curso_id_Curso;
    }

    public void setAsignatura_has_curso_Curso_id_Curso(int asignatura_has_curso_Curso_id_Curso) {
        this.asignatura_has_curso_Curso_id_Curso = asignatura_has_curso_Curso_id_Curso;
    }

    @Override
    public String toString(){
        StringBuilder sb = new StringBuilder();
        sb.append("Material{")
                .append(" ID=").append(idMaterial)
                .append(", contenido=").append(contenido)
                .append(", Asignatura=").append(asignatura_has_curso_Asignatura_id_Asignatura)
                .append(", Curso=").append(asignatura_has_curso_Curso_id_Curso)
                .append(" }");
        return sb.toString();
    }
}
