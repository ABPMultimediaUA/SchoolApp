package com.cerberus.Service;

import com.cerberus.Model.Comentario_Profesor;

import javax.ejb.Local;
import java.util.List;

/**
 * Created by Naiara on 12/12/2016.
 */

@Local
public interface Comentario_ProfesorService {

    /**
     * Interfaz para el EJB donde definimos los metodos que vamos a implementar en la clase de implementacion
     * posteriormente
     * */

    public void addComentario_Profesor(Comentario_Profesor comentario_profesor);
    public boolean updateComentario_Profesor(Comentario_Profesor comentario_profesorOld, Comentario_ProfesorService comentario_profesorNew);
    public boolean deleteComentario_Profesor(Comentario_Profesor comentario_profesor);
    public List<Comentario_Profesor> findComentario_ProfesorAll();
}
