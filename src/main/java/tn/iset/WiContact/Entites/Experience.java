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
public class Experience {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

   private String Title;

   @Temporal(TemporalType.DATE)
   private Date StartDate;

   @Temporal(TemporalType.DATE)
   private Date EndDate;


   @ManyToOne(cascade = CascadeType.ALL)
    @JsonIgnore
    private CV cv;




}
