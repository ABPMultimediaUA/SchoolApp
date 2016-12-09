package com.cerberus.Service;

import com.cerberus.Model.Tarea;

import javax.ejb.Local;
import java.util.List;

/**
 * Created by Manuel on 09/12/2016.
 */
@Local
public interface TareaService {


    public void addTarea(Tarea tarea);
    public boolean updateTarea(Tarea tareaOld, Tarea tareaNew);
    public boolean deleteTarea(Tarea tarea);
    public List<Tarea> findTareaAll();
}