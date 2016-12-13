package com.cerberus.Model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * Created by Naiara on 12/12/2016.
 */

@Entity
@Table(name = "comentario_profesor")
public class Comentario_Profesor {

    //Primary Key
    @Id
    @Column(name = "idComentario", nullable = false)
    private Integer idComentario;
    @Column(name = "texto", nullable = false)
    private String texto;
    @Column(name = "foro_idForo", nullable = false)
    private Integer foro_idForo;
    @Column(name = "profesor_idProfesor") //No deberia ser no nulo?
    private Integer profesor_idProfesor;
    @Column(name = "fecha") //No deberia ser no nulo?
    private String fecha;


    public Comentario_Profesor(){

    }

    public Comentario_Profesor(Integer idComentario, Integer foro_idForo, Integer profesor_idProfesor, String texto, String fecha) {
        this.idComentario = idComentario;
        this.foro_idForo = foro_idForo;
        this.profesor_idProfesor = profesor_idProfesor;
        this.texto = texto;
        this.fecha = fecha;
    }

    public Integer getIdComentario() {
        return idComentario;
    }

    public String getTexto() {
        return texto;
    }

    public Integer getForo_idForo() {
        return foro_idForo;
    }

    public Integer getProfesor_idProfesor() {
        return profesor_idProfesor;
    }

    public String getFecha() {
        return fecha;
    }

    public void setIdComentario(Integer idComentario) {
        this.idComentario = idComentario;
    }

    public void setTexto(String texto) {
        this.texto = texto;
    }

    public void setForo_idForo(Integer foro_idForo) {
        this.foro_idForo = foro_idForo;
    }

    public void setProfesor_idProfesor(Integer profesor_idProfesor) {
        this.profesor_idProfesor = profesor_idProfesor;
    }

    public void setFecha(String fecha) {
        this.fecha = fecha;
    }

    /**
     * @Override method to String(). Preferimos que nos devuelva la informacion de las variables de instancia
     * del objeto a simplemente su posicion en memoria.
     * */
    @Override
    public String toString(){
        StringBuilder sb = new StringBuilder();
        sb.append("Comentario_Profesor{")
                .append(" id=").append(idComentario)
                .append(", Foro=").append(foro_idForo)
                .append(", Profesor=").append(profesor_idProfesor)
                .append(", Texto=").append(texto)
                .append(", Fecha=").append(fecha)

                .append(" }");
        return sb.toString();
    }
}
