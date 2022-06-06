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
public class Formation {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)

    private int id;

    private String FromationName;

    private String UnivercityName;

    @Temporal(TemporalType.DATE)
    private Date StartDate;

    @Temporal(TemporalType.DATE)
    private Date EndDate;


    @ManyToOne
    @JsonIgnore
    private CV cv;
}
