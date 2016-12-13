package com.cerberus.Model;

import javax.persistence.Column;
import javax.persistence.Entity;
//import javax.persistence.Id;
import javax.persistence.Table;

/**
 * Created by Naiara on 12/12/2016.
 */
@Entity
@Table(name = "chat")
public class Chat {

        @Column(name = "Profesor_idProfesor", nullable = false)
        private Integer Prof_idProfesor;
        @Column(name = "Padre_idPadre", nullable = false)
        private Integer Pad_idPadre;

        public Chat() {

        }

    public Chat(Integer Prof_idProfesor, Integer Pad_idPadre) {
        this.Prof_idProfesor = Prof_idProfesor;
        this.Pad_idPadre = Pad_idPadre;
    }

    public Integer getProf_idProfesor() {
        return Prof_idProfesor;
    }

    public Integer getPad_idPadre() {
        return Pad_idPadre;
    }

    public void setProf_idProfesor(Integer prof_idProfesor) {
        Prof_idProfesor = prof_idProfesor;
    }

    public void setPad_idPadre(Integer pad_idPadre) {
        Pad_idPadre = pad_idPadre;
    }

    @Override
    public String toString(){
        StringBuilder sb = new StringBuilder();
        sb.append("Chat{")
                .append(" idProf=").append(Prof_idProfesor)
                .append(", idPad=").append(Pad_idPadre)
                .append(" }");
        return sb.toString();
    }
}
