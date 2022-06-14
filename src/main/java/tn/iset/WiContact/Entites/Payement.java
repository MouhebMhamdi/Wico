package tn.iset.WiContact.Entites;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.Date;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Payement {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)

    private int id;

    private String Method;

    private Double amount;

    private Date DateTransuction;

    private String currency;

    private String token;

    @ManyToOne
    @JsonIgnore
    private User user;

    @OneToOne
    @JsonIgnore
    private Projects projects;
}
