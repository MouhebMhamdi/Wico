package tn.iset.WiContact.Services;

import tn.iset.WiContact.Entites.User;

import java.util.List;

public interface IUserService {

    public List<User> getAllUsers();
    public User getUserById(int Id);

    public List<User> addUsers(User user);
    public void deleteById(int Id);
    public User updateById(int Id , User user);
    public User login(String email,String password) throws Exception;
}
