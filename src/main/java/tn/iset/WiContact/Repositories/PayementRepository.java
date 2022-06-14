package tn.iset.WiContact.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tn.iset.WiContact.Entites.Payement;


@Repository
public interface PayementRepository extends JpaRepository<Payement, Integer> {


}
