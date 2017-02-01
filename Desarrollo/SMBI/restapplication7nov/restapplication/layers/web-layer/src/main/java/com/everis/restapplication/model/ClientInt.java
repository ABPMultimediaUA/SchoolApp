package com.everis.restapplication.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "CLIENT")
public class ClientInt {

    @Id
    @Column(name = "CLIENT_ID", nullable = false)
    private Integer id;
    @Column(name = "CLIENT_NAME", nullable = false)
    private String name;
    @Column(name = "CLIENT_SURNAME", nullable = false)
    private String surname;
    @Column(name = "CLIENT_NIF", nullable = false)
    private String nif;
    @Column(name = "CLIENT_DIRECTION", nullable = false)
    private String direction;
    @Column(name = "CLIENT_PHONE")
    private String phone;
    @Column(name = "CLIENT_EMAIL")
    private String email;

    public ClientInt(){}

    public ClientInt(Integer id, String name, String email) {
        this.id = id;
        this.name = name;
        this.surname = surname;
        this.nif = nif;
        this.direction = direction;
        this.phone = phone;
        this.email = email;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getSurname() {
        return surname;
    }

    public void setSurname(String surname) {
        this.surname = surname;
    }

    public String getNif() {
        return nif;
    }

    public void setNif(String nif) {
        this.nif = nif;
    }

    public String getDirection() {
        return direction;
    }

    public void setDirection(String direction) {
        this.direction = direction;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }
}
