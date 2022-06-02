package tn.iset.WiContact.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tn.iset.WiContact.Entites.User;
@Repository
public interface UserReposotiry extends JpaRepository<User,Integer> {

}
