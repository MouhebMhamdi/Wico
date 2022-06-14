package tn.iset.WiContact.Services;

import org.springframework.web.multipart.MultipartFile;
import tn.iset.WiContact.Entites.User;

import java.io.IOException;
import java.util.List;

public interface IUserService {

    public List<User> getAllUsers();
    public User getUserById(int Id);

    public List<User> addUsers(User user) throws Exception;
    public void deleteById(int Id);
    public User updateById(int Id , User user);
    public User login(String email,String password) throws Exception;

    public User addImage(MultipartFile file,int idUser)throws IOException;

    public User getUserByprojectDevelopper(int idDev,int idProject);
}
