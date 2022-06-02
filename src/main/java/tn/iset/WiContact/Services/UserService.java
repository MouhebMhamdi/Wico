package tn.iset.WiContact.Services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.iset.WiContact.Entites.User;
import tn.iset.WiContact.Repositories.UserReposotiry;
import java.util.List;

@Service
public class UserService  implements IUserService {
    @Autowired
    private UserReposotiry userRepository;
    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @Override
    public User getUserById(int Id) {
        return userRepository.findById(Id).get();
    }

    @Override
    public List<User> addUsers(User user) {
        userRepository.save(user);
        return this.getAllUsers();
    }

    @Override
    public void deleteById(int Id) {
        userRepository.deleteById(Id);

    }

    @Override
    public User updateById(int Id, User user) {
        User us = this.getUserById(Id);
        if (user.getNom()!= null) us.setNom(user.getNom());
        if (user.getPrenom()!= null) us.setPrenom(user.getPrenom());
        if (user.getAdress()!= null) us.setAdress(user.getAdress());
        if (user.getEtat()!= null) us.setEtat(user.getEtat());
        if (user.getEmail()!= null) us.setEmail(user.getEmail());
        if (user.getPhoto()!= null) us.setPhoto(user.getPhoto());
        if (user.getRole()!= null) us.setRole(user.getRole());

        return null;
    }
}
