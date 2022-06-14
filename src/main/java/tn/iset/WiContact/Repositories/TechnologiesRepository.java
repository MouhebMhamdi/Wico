package tn.iset.WiContact.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tn.iset.WiContact.Entites.Technologies;

import java.util.List;

@Repository
public interface TechnologiesRepository extends JpaRepository<Technologies, Integer> {

}
