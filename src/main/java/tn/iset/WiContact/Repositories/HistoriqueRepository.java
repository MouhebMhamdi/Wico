package tn.iset.WiContact.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import tn.iset.WiContact.Entites.Historique;
import tn.iset.WiContact.Entites.Projects;

import java.util.List;

@Repository
public interface HistoriqueRepository extends JpaRepository<Historique, Integer> {
    @Query("SELECT H FROM Historique H WHERE H.projects.id=:id")
    Historique getHistorique(int id);

    @Query("SELECT H.projects FROM Historique  H where H.user.id=:id")
    List<Projects> getHistoriqueWithUser(int id);
}
