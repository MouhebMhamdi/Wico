package tn.iset.WiContact.Entites;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

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

}
