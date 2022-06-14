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
public class Technologies {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    private String TechName;

    @Enumerated(EnumType.STRING)
    private Domain Domain;

    @ManyToMany(mappedBy = "technologies")
    @JsonIgnore
    private List<Projects> projects;


}
