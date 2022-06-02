package tn.iset.WiContact.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import tn.iset.WiContact.Entites.User;
import tn.iset.WiContact.Services.IUserService;

import java.util.List;

@RestController
public class UserController {
    @Autowired
     IUserService iUserService;
    @GetMapping("/All")
    public List<User> getAllUser() {
        return iUserService.getAllUsers();
    }
    @GetMapping("/{Id}")
    public User getUserById(@PathVariable int Id) {
        return iUserService.getUserById(Id);
    }
    @PostMapping("/add")
    public List<User> addUser(@RequestBody User user) {
        return iUserService.addUsers(user);
    }
    @DeleteMapping("/delete/{Id}")
    public String deleteUserById(@PathVariable int Id) {
        iUserService.deleteById(Id);
        return "User Deleted";
    }
}
