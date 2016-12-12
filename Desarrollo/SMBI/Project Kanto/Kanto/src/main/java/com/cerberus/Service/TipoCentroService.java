package com.cerberus.Service;

import com.cerberus.Model.TipoCentro;

import javax.ejb.Local;
import java.util.List;

/**
 * Created by Ricardo on 10/12/2016.
 */

@Local
public interface TipoCentroService {

    public void addTipoCentro(TipoCentro tipoCentro);
    public boolean updateTipoCentro(TipoCentro tipoCentroOld, TipoCentro tipoCentroNew);
    public boolean deleteTipoCentro(TipoCentro tipoCentro);
    public List<TipoCentro> findTipoCentroAll();
}
