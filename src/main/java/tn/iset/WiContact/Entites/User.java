package tn.iset.WiContact.Entites;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private  int id;
    private  String Nom;
    private  String Prenom;
    private  String email;
    private  String password;
    private   int Phone;
    private  String Adress;
    private  String photo;
    @Enumerated(EnumType.STRING)
    private  Role role ;
    private Boolean Etat;
    
    @OneToMany(mappedBy = "user",cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Payement> payement;

    @ManyToMany
    @JsonIgnore
    private List<Projects> projects;

    @OneToOne(mappedBy = "user")
    @JsonIgnore
    private CV cv;
}
