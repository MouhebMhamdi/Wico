package tn.iset.WiContact.Services;

import tn.iset.WiContact.Entites.Payement;
import tn.iset.WiContact.Entites.Projects;
import tn.iset.WiContact.Entites.Technologies;

import java.util.List;

public interface IProjectService {
    List<Projects> getAllProjects();
    List<Projects> getAllProjectsByUser(int idUser);
    Projects addProjectAndAssignToUser(Projects projects, List<Integer> techid, int idUser);

    Projects takeProject(int idDev,int idProject) throws Exception;
    Projects ConcelProject(int idDev,int idProject) throws Exception;

    Projects getProjectById(int id);
    Projects updateProject(Projects projects,int id,List<Integer> idTech);

    void deleteProject(int id);

    List<Technologies> getAllTechnologies();

    List<Projects> getHistoriqueByUser(int idUser);

    void payer(int idUser,String method,int idProject,String token);
}
