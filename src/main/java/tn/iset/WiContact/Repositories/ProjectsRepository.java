package tn.iset.WiContact.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import tn.iset.WiContact.Entites.Projects;
import tn.iset.WiContact.Entites.User;

import java.util.List;

@Repository
public interface ProjectsRepository extends JpaRepository<Projects, Integer> {

    @Query("SELECT P FROM Projects P ,User U join P.users PS on PS.id=U.id   WHERE U.id=:id")
    List<Projects> getAllProjectsByidUser(int id);



}
