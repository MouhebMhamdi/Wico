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
    private  String Adress2;
    private int zipcode;
    private String state;
    private String area;

    @Lob
    @Column( length=800)
    private  byte[] photo;
    private String photoName;

    private String photoType;

    @Lob
    private  byte[] Cvpdf;
    private String CvpdfName;
    private String CvpdfType;

    @Enumerated(EnumType.STRING)
    private  Role role ;
    private Boolean Etat;
    
    @OneToMany(mappedBy = "user",cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Payement> payement;

    @OneToMany(mappedBy = "users",cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Projects> projects;



    @OneToMany(mappedBy = "user",cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Historique>historiques;
}
