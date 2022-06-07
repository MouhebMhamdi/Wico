package tn.iset.WiContact.Services;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tn.iset.WiContact.Entites.Projects;

@Repository
public interface ProjectsRepository extends JpaRepository<Projects, Integer> {
}
