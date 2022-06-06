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
public class Projects {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)

    private int id;

    private String title;

    @Temporal(TemporalType.DATE)
    private Date startDate;

    @Temporal(TemporalType.DATE)
    private Date DeadLine;

    private Double price;

    @OneToMany(mappedBy = "projects",cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Technologies> technologies;

    @OneToOne(mappedBy = "projects" ,cascade = CascadeType.ALL)
    @JsonIgnore
    private Historique historique;

    @ManyToMany(mappedBy = "projects",cascade = CascadeType.ALL)
    @JsonIgnore
    private List<User> users;







}
