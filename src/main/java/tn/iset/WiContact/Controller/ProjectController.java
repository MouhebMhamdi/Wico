package tn.iset.WiContact.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tn.iset.WiContact.Entites.Payement;
import tn.iset.WiContact.Entites.Projects;
import tn.iset.WiContact.Entites.Technologies;
import tn.iset.WiContact.Services.IPayementService;
import tn.iset.WiContact.Services.IProjectService;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.Charge;
import tn.iset.WiContact.Services.IUserService;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/project")
@CrossOrigin(origins = "*", maxAge = 3600)
public class ProjectController {
    @Autowired
    private IProjectService projectService;

    @Autowired
    private IUserService iUserService;

    @Autowired
    private IPayementService iPayementService;


    public ProjectController(@Value("${stripe.apikey}") String apiKey){
        Stripe.apiKey = apiKey;
    }

    @GetMapping("/all")
    public List<Projects> getAllProjects(){
        return projectService.getAllProjects();
    }
    @GetMapping("getProjectById/{id}")
    public Projects getProjectById(@PathVariable int id){
        return projectService.getProjectById(id);
    }
    @GetMapping("/all/{idUser}")
    public List<Projects> getAllProjectsByUser(@PathVariable int idUser){
        return projectService.getAllProjectsByUser(idUser);
    }

    @PostMapping("/add/{idUser}/{techid}")
    public Projects addProjectAndAssignToUser(@RequestBody Projects projects,@PathVariable List<Integer> techid, @PathVariable int idUser){
        return projectService.addProjectAndAssignToUser(projects,techid,idUser);
    }

    @GetMapping("takeProject/{idProject}/{idDev}")
    public Projects takeProject(@PathVariable int idProject,@PathVariable int idDev) throws Exception {
        return projectService.takeProject(idDev,idProject);
    }
    @GetMapping("ConcelProject/{idProject}/{idDev}")
    public Projects ConcelProject(@PathVariable int idProject,@PathVariable int idDev) throws Exception {
        return projectService.ConcelProject(idDev,idProject);
    }

    @PostMapping(value="/charges/{idUser}/{idProject}", consumes = "application/json")
    public ResponseEntity<?> chargeCard(@RequestBody Payement chargeForm,@PathVariable int idUser,@PathVariable int idProject) {

        try {
            Map<String, Object> params = new HashMap<>();
            params.put("amount", chargeForm.getAmount());
            params.put("currency", chargeForm.getCurrency());
            params.put("source", chargeForm.getToken());
            Charge charge = Charge.create(params);
            Payement response = new Payement();
            response.setUser(iUserService.getUserById(idUser));
            response.setDateTransuction(new Date());
            response.setProjects(projectService.getProjectById(idProject));
            iPayementService.addPayement(response);
            return ResponseEntity.ok(response);
        } catch(StripeException e) {
            return ResponseEntity.badRequest().body(e.getStripeError().getMessage());
        }
    }
    @PutMapping("/update/{id}/{idTech}")
    public Projects updateProject(@RequestBody Projects projects,@PathVariable int id,@PathVariable List<Integer> idTech){
        return projectService.updateProject(projects,id,idTech);
    }

    @DeleteMapping("/delete/{id}")
    public List<Projects> deleteById(@PathVariable int id){
         projectService.deleteProject(id);

         return this.getAllProjects();
    }

    @GetMapping("/tech/all")
    public List<Technologies> getAllTech(){
        return projectService.getAllTechnologies();
    }

    @GetMapping("/history/{idUser}")
    public List<Projects> getHistoryByUser(@PathVariable  int idUser){
        return projectService.getHistoriqueByUser(idUser);
    }

    @GetMapping("/pay/{idUser}/{idProject}/{method}/{token}")
    public String pay(@PathVariable int idUser,@PathVariable int idProject,@PathVariable String method,@PathVariable String token){
         projectService.payer(idUser,method,idProject,token);
         return "Payement effectuer";

    }
}
