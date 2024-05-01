package com.example.oblig3_6;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class BestillingRepository {
    @Autowired
    private JdbcTemplate db;

    public void lagreBestilling(Bestilling bestilling) {
        String sql = "INSERT INTO Bestilling (film, antall, fornavn, etternavn, adresse, telefonnr, epost) VALUES(?,?,?,?,?,?,?)";
        db.update(sql, bestilling.getFilm(), bestilling.getAntall(), bestilling.getFornavn(), bestilling.getEtternavn(), bestilling.getAdresse(), bestilling.getTelefonnr(), bestilling.getEpost());
    }

    public List<Bestilling> hentAlleBestillinger() {
        String sql = "SELECT * FROM Bestilling";
        List<Bestilling> alleBestillinger = db.query(sql, new BeanPropertyRowMapper<>(Bestilling.class));
        return alleBestillinger;
    }

    public void slettAlleBestillinger() {
        String sql = "DELETE FROM Bestilling";
        db.update(sql);
    }
}
