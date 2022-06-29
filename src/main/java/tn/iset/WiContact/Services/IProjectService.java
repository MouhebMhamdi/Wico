package tn.iset.WiContact.Services;

import org.springframework.http.ResponseEntity;
import tn.iset.WiContact.DAO.UrlVerif;
import tn.iset.WiContact.Entites.Payement;
import tn.iset.WiContact.Entites.Projects;
import tn.iset.WiContact.Entites.Technologies;

import java.util.List;

public interface IProjectService {
    List<Projects> getAllProjects();
    List<Projects> getAllProjectsByUser(int idUser);
    Projects addProjectAndAssignToUser(Projects projects, List<Integer> techid, int idUser);

    ResponseEntity<Projects> takeProject(int idDev, int idProject) throws Exception;
    Projects ConcelProject(int idDev,int idProject) throws Exception;

    Projects getProjectById(int id);
    Projects updateProject(Projects projects,int id,List<Integer> idTech);

    void deleteProject(int id);

    List<Technologies> getAllTechnologies();

    List<Projects> getHistoriqueByUser(int idUser);

    void payer(int idUser,String method,int idProject,String token);

    List<Projects> getAllProjectsByidDevelopper(int idDev);

    void ProjectCompleted(int idPro);

    void setfinishedProject(int idProject, UrlVerif link);

    void ajoutTechnologies(List<Technologies> technologies);

    void ajoutTechnologie(Technologies technologies);

    void deleteTechnologies(int idTech);

}
