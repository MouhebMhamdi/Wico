package tn.iset.WiContact.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import tn.iset.WiContact.Entites.Payement;

import java.util.List;

@Repository
public interface PayementRepository extends JpaRepository<Payement, Integer> {


}
