package com.example.oblig3_2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collections;
import java.util.Comparator;
import java.util.List;

@RestController
public class BestillingController {
    @Autowired
    private BestillingRepository rep;

    // Lagre bestillinger
    @PostMapping("/lagreBestillinger")
    public String lagreBestillinger(Bestilling innBestilling) {
        try {
            rep.save(innBestilling);
            return "Bestillingen ble sendt!";
        } catch (Exception e) {
            return "Bestillingen ble ikke sendt!" + e.getMessage();
        }
    }

    // Hente bestillinger
    @GetMapping("/henteBestillinger")
    public void henteBestillinger() {
        rep.findAll();
    }

    public void sorterBestilling(List<Bestilling> innBestilling) {
        Collections.sort(innBestilling, new Comparator<Bestilling>() {
            @Override
            public int compare(Bestilling o1, Bestilling o2) {
                return o1.getEtternavn().compareTo(o2.getEtternavn());
            }
        });
    }

    // Slette betillinger
    @DeleteMapping("/slettBestillinger")
    public String slettBestillinger() {
        try {
            rep.deleteAll();
            return "Sletting ble gjennomført!";
        } catch (Exception e) {
            return "Bestillingen ble ikke gjennomført!" + e.getMessage();
        }
    }
}