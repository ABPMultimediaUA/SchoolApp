package com.cerberus.Model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * Created by Naiara on 12/12/2016.
 */

@Entity
@Table(name = "mensaje")
public class Mensaje {

    //Primary Key
    @Id
    @Column(name = "idmensaje", nullable = false)
    private Integer idmensaje;
    @Column(name = "texto", nullable = false)
    private String texto;
    @Column(name = "chat_Profesor_idProfesor", nullable = false)
    private Integer chat_Profesor;
    @Column(name = "chat_Padre_idPadre")
    private Integer chat_Padre;
    @Column(name = "profesor")
    private Integer profesor;


    public Mensaje(){

    }

    public Mensaje(Integer idmensaje, String texto, Integer chat_Profesor, Integer chat_Padre, Integer profesor) {
        this.idmensaje = idmensaje;
        this.texto = texto;
        this.chat_Profesor = chat_Profesor;
        this.chat_Padre = chat_Padre;
        this.profesor = profesor;
    }

    public Integer getIdmensaje() {
        return idmensaje;
    }

    public String getTexto() {
        return texto;
    }

    public Integer getChat_Profesor() {
        return chat_Profesor;
    }

    public Integer getChat_Padre() {
        return chat_Padre;
    }

    public Integer getProfesor() {
        return profesor;
    }

    public void setIdmensaje(Integer idmensaje) {
        this.idmensaje = idmensaje;
    }

    public void setTexto(String texto) {
        this.texto = texto;
    }

    public void setChat_Profesor(Integer chat_Profesor) {
        this.chat_Profesor = chat_Profesor;
    }

    public void setChat_Padre(Integer chat_Padre) {
        this.chat_Padre = chat_Padre;
    }

    public void setProfesor(Integer profesor) {
        this.profesor = profesor;
    }

    /**
     * @Override method to String(). Preferimos que nos devuelva la informacion de las variables de instancia
     * del objeto a simplemente su posicion en memoria.
     * */
    @Override
    public String toString(){
        StringBuilder sb = new StringBuilder();
        sb.append("Mensaje{")
                .append(" id=").append(idmensaje)
                .append(", texto=").append(texto)
                .append(", chat_Profesor_idProfesor=").append(chat_Profesor)
                .append(", chat_Padre_idPadre=").append(chat_Padre)
                .append(", profesor=").append(profesor)
                .append(" }");
        return sb.toString();
    }
}
