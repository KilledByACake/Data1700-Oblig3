package com.example.oblig3_6;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class BestillingController {
    @Autowired
    private BestillingRepository rep;

    @PostMapping("/lagre")
    public void lagreBestilling(Bestilling innBestilling){
        rep.lagreBestilling(innBestilling);
    }
    @GetMapping("/hentAlle")
    public List<Bestilling> hentAlle(){
        return rep.hentAlleBestillinger();
    }
    @GetMapping("/slettAlle")
    public void slettAlle(){
        rep.slettAlleBestillinger();
    }
}