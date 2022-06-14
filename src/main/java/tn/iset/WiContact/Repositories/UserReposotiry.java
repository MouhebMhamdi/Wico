package tn.iset.WiContact.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import tn.iset.WiContact.Entites.User;
@Repository
public interface UserReposotiry extends JpaRepository<User,Integer> {
    User getUserByEmail(String email);

    @Query("SELECT U FROM Projects P,User U where P.idDevelopper=:idDev and U.id=P.idDevelopper and P.id=:idProject")
    User getUserByprojectDevelopper(int idDev,int idProject);
}
