package com.cerberus.Service;

import com.cerberus.Model.Grupo;

import javax.ejb.Local;
import java.util.List;

/**
 * Created by Ricardo on 03/12/2016.
 */
public interface GrupoService {

    public void addGrupo(Grupo grupo);
    public boolean updateGrupo(Grupo grupoOld, Grupo grupoNew);
    public boolean deleteGrupo(Grupo grupo);
    public List<Grupo> findGrupoAll();
}
