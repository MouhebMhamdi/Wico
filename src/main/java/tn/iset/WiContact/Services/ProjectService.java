package tn.iset.WiContact.Services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import tn.iset.WiContact.Entites.*;
import tn.iset.WiContact.Repositories.*;

import javax.swing.text.html.parser.Entity;
import javax.transaction.Transactional;
import java.util.Date;
import java.util.List;

@Service
public class ProjectService implements IProjectService{

    @Autowired
    private ProjectsRepository projectsRepository;

    @Autowired
    private UserReposotiry userReposotiry;

    @Autowired
    private TechnologiesRepository technologiesRepository;

    @Autowired
    private HistoriqueRepository historiqueRepository;

    @Autowired
    private PayementRepository payementRepository;

    @Override
    public List<Projects> getAllProjects() {
        return projectsRepository.findAll();
    }

    @Override
    public List<Projects> getAllProjectsByUser(int iduser) {
        return projectsRepository.getAllProjectsByidUser(iduser);
    }

    @Override
    public Projects addProjectAndAssignToUser(Projects projects, List<Integer> techid ,int idUser) {
        projects.setPayed(false);
        projects.setIdDevelopper(0);
        projects.setUsers(userReposotiry.findById(idUser).get());
        projects.setTechnologies(technologiesRepository.findAllById(techid));
        return projectsRepository.save(projects);
    }

    @Override
    public ResponseEntity<Projects> takeProject(int idDev, int idProject) throws Exception {
        Projects pr=projectsRepository.findById(idProject).get();
        User us=userReposotiry.findById(idDev).get();
        Historique historique=new Historique();
        if(us.getRole()!= Role.PERSONNELS){
            throw new ResponseStatusException(HttpStatus.BAD_GATEWAY,"You are not a personnel please contact the admin");

        }
        List<Projects> prL=projectsRepository.getAllProjectByDevelopper(idDev);
        if(!prL.isEmpty()){
            throw new ResponseStatusException(HttpStatus.EXPECTATION_FAILED,"You have no right to take other projects please complete your mession");
        }

        historique.setProjects(pr);
        historique.setUser(us);
        historiqueRepository.save(historique);

        pr.setIdDevelopper(idDev);
        return ResponseEntity.status(HttpStatus.ACCEPTED).body(projectsRepository.save(pr));
    }

    @Override
    public Projects ConcelProject(int idDev, int idProject) throws Exception {
        Projects pr=projectsRepository.findById(idProject).get();
        User us=userReposotiry.findById(idDev).get();
        if(us.getRole()!= Role.PERSONNELS || pr.getIdDevelopper()!=us.getId()){
            throw new Exception("Error");
        }
        Historique his=historiqueRepository.getHistorique(pr.getId());
        historiqueRepository.deleteById(his.getId());


        pr.setIdDevelopper(0);
        return projectsRepository.save(pr);
    }

    @Override
    public Projects getProjectById(int id) {
        return projectsRepository.findById(id).get();
    }

    @Override
    public Projects updateProject(Projects projects, int id,List<Integer> idTech) {
        Projects p=projectsRepository.findById(id).get();
        p.setTechnologies(technologiesRepository.findAllById(idTech));
        if(projects.getDeadLine()!=null)p.setDeadLine(projects.getDeadLine());
        if(projects.getDescription()!=null)p.setDescription(projects.getDescription());
        if(projects.getStartDate()!=null)p.setStartDate(projects.getStartDate());
        if(projects.getHistorique()!=null)p.setHistorique(projects.getHistorique());
        if(projects.getIdDevelopper()!=0)p.setIdDevelopper(projects.getIdDevelopper());
        if(projects.getPayement()!=null)p.setPayement(projects.getPayement());
        if(projects.getPrice()!=null)p.setPrice(projects.getPrice());
        if(projects.getTechnologies()!=null)p.setTechnologies(projects.getTechnologies());
        if(projects.getTitle()!=null)p.setTitle(projects.getTitle());
        if(projects.getUsers()!=null)p.setUsers(projects.getUsers());
        return projectsRepository.save(p);
    }

    @Override
    @Transactional
    public void deleteProject(int id) {
        projectsRepository.deleteById(id);
    }

    @Override
    public List<Technologies> getAllTechnologies() {
        return technologiesRepository.findAll();
    }

    @Override
    public List<Projects> getHistoriqueByUser(int idUser) {
        return historiqueRepository.getHistoriqueWithUser(idUser);
    }

    @Override
    public void payer( int idUser,String method, int idProject,String token) {
        Payement payement =new Payement();
        User us=userReposotiry.findById(idUser).get();
        Projects pr=projectsRepository.findById(idProject).get();
        payement.setUser(us);
        payement.setProjects(pr);
        payement.setAmount(pr.getPrice());
        payement.setDateTransuction(new Date());
        payement.setCurrency("TND");
        payement.setMethod(method);
        payement.setToken(token);
        pr.setPayed(true);
        projectsRepository.save(pr);
        payementRepository.save(payement);
    }

    @Override
    public List<Projects> getAllProjectsByidDevelopper(int idDev) {
        return projectsRepository.getAllProjectByDevelopper(idDev);
    }
}
