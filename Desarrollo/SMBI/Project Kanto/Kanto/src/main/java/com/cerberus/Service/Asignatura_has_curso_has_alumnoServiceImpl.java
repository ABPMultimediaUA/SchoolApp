package com.cerberus.Service;
import com.cerberus.Store.Asignatura_has_curso_has_alumnoStore;
import com.cerberus.Model.Asignatura_has_curso_has_alumno;

import javax.ejb.Stateless;
import javax.ejb.TransactionManagement;
import javax.ejb.TransactionManagementType;
import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;
/**
 * Create/**
 * Created by Manuel on 09/12/2016.
 * ESTA TABLA ES UNA TABLA DE RELACIONES ENTRE ENTIDADES
 * NO SE PUEDE BUSCAR (FIND) PORQUE NO TIENE CLAVE PRIMARIA QUE LA DEFINA
 * NO SE PUEDE ALTERAR ESTA TABLA DIRECTAMENTE
 * PARA CAMBIAR LOS VALORES SE DEBEN MODIFICAR DESDE SUS ENTIDADES DE ORIGEN
 * GRACIAS POR SU COMPRENSION.
 * CERBERUS LES DESEA UN BUEN DIA.
 */


@Stateless
@TransactionManagement(value = TransactionManagementType.CONTAINER)
public class Asignatura_has_curso_has_alumnoServiceImpl implements Asignatura_has_curso_has_alumnoService{




}


