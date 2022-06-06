package tn.iset.WiContact.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import tn.iset.WiContact.Entites.User;
import tn.iset.WiContact.Services.IUserService;

import java.util.List;

@RestController
@RequestMapping("/api/user")
@CrossOrigin(origins = "*", maxAge = 3600)
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

    @PutMapping("/update/{id}")
    public User updateUserById(@PathVariable int id , @RequestBody User user){
        return iUserService.updateById(id,user);
    }

    @PostMapping("/signin/{email}/{password}")
    public User login(@PathVariable String email,@PathVariable String password) throws Exception {
        return iUserService.login(email,password);
    }
}
