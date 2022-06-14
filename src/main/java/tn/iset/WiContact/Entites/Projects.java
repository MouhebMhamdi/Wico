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

    @Lob
    @Column( length=800)
    private String Description;

    @ManyToMany(fetch = FetchType.EAGER, cascade = {CascadeType.MERGE,CascadeType.PERSIST})
    private List<Technologies> technologies;

    @OneToOne(fetch = FetchType.EAGER, cascade = {CascadeType.MERGE,CascadeType.PERSIST})
    @JsonIgnore
    private Historique historique;

    @ManyToOne
    @JsonIgnore
    private User users;

    private int idDevelopper;

    @Column(nullable = false)
    private boolean payed=false;

    @OneToOne(mappedBy = "projects")
    @JsonIgnore
    private Payement payement;




}
