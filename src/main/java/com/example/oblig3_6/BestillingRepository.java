package com.example.oblig3_2;

import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;
@Repository
public interface BestillingRepository extends JpaRepository<Bestilling,Long> {

}