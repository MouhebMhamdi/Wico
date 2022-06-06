package tn.iset.WiContact.Entites;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CV {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    private String firstName;

    private String lastName;

    private Date BirthDate;

    private String Description;

    private int phone;

    private String Adress;

    private String email;

    private String ActuelJobTitle;

    @OneToMany(mappedBy = "cv",cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Experience> experience;

    @OneToMany(mappedBy = "cv" ,cascade = CascadeType.ALL)
    @JsonIgnore
    private  List<Formation> formations;

    private String hobies;

    @OneToOne(cascade = CascadeType.ALL)
    @JsonIgnore
    private User user;





}
