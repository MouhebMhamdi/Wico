package tn.iset.WiContact.Services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import org.springframework.web.multipart.MultipartFile;
import tn.iset.WiContact.Entites.Role;
import tn.iset.WiContact.Entites.User;

import tn.iset.WiContact.Repositories.UserReposotiry;

import java.io.IOException;
import java.util.List;

@Service
public class UserService  implements IUserService {
    @Autowired
    private UserReposotiry userRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;


    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @Override
    public User getUserById(int Id) {
        return userRepository.findById(Id).get();
    }

    @Override
    public List<User> addUsers(User user) throws Exception {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        User u=userRepository.getUserByEmail(user.getEmail());
        if(u!=null) throw  new Exception("This email exist");
        User us=userRepository.save(user);
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
        if(user.getAdress2()!=null)us.setAdress2(user.getAdress2());
        if(user.getZipcode()!=0) us.setZipcode(user.getZipcode());
        if(user.getRole()!=null)us.setRole(user.getRole());
        if(user.getProjects()!=null)us.setProjects(user.getProjects());
        if(user.getArea()!=null)us.setArea(user.getArea());
        if(user.getPayement()!=null)us.setPayement(user.getPayement());
        if(user.getPhotoName()!=null)us.setPhotoName(user.getPhotoName());
        if(user.getPhotoType()!=null)us.setPhotoType(user.getPhotoType());
        if(user.getState()!=null)us.setState(user.getState());
        if(user.getCvpdf()!=null)us.setCvpdf(user.getCvpdf());
        if(user.getCvpdfName()!=null)us.setCvpdfName(user.getCvpdfName());
        if(user.getCvpdfType()!=null)us.setCvpdfType(user.getCvpdfType());

        return userRepository.save(us);
    }

    @Override
    public User login(String email, String password) throws Exception {
        User us=userRepository.getUserByEmail(email);
        if(us==null) throw new Exception("error login");
        if(!passwordEncoder.matches(password,us.getPassword())) throw new Exception("login failed");
        if(us.getRole()== Role.PERSONNELS && us.getEtat()==false) throw new Exception("login failed");
        return us;
    }

    @Override
    public User addImage(MultipartFile file, int idUser) throws IOException {
        User us=userRepository.findById(idUser).orElse(null);
        us.setPhotoName(file.getOriginalFilename());
        us.setPhotoType(file.getContentType());
        us.setPhoto(file.getBytes());
        return userRepository.save(us);
    }

    @Override
    public User getUserByprojectDevelopper(int idDev, int idProject) {
        return userRepository.getUserByprojectDevelopper(idDev,idProject);
    }
}
