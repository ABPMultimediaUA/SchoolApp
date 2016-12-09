package com.cerberus.Service;

import com.cerberus.Model.Asistencia;

import javax.ejb.Local;
import java.util.List;

/**
 * Created by Manuel on 09/12/2016.
 */
@Local
public interface AsistenciaService {


    public void addAsistencia(Asistencia asistencia);
    public boolean updateAsistencia(Asistencia asistenciaOld, Asistencia asistenciaNew);
    public boolean deleteAsistencia(Asistencia asistencia);
    public List<Asistencia> findAsistenciaAll();
}