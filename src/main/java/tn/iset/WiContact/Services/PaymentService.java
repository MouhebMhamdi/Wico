package tn.iset.WiContact.Services;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.iset.WiContact.Entites.Payement;
import tn.iset.WiContact.Entites.User;
import tn.iset.WiContact.Repositories.PayementRepository;
import tn.iset.WiContact.Repositories.UserReposotiry;

import java.util.List;

@Service
public class PaymentService implements IPayementService{
    @Autowired
    private PayementRepository payementRepository;


    @Autowired
    private UserReposotiry userReposotiry;

    @Override
    public List<Payement> getAllPayements() {
        return payementRepository.findAll();
    }

    @Override
    public Payement getPayementById(int id) {
        return payementRepository.findById(id).orElse(null);
    }

    @Override
    public List<Payement> getPayementByMethodPay(String method) {
        return null;
    }

    @Override
    public Payement affectPayementToClient(int idClient, int idPayment) {
        User c=userReposotiry.findById(idClient).orElse(null);
        Payement p=payementRepository.findById(idPayment).orElse(null);
        p.setUser(c);
        return payementRepository.save(p);
    }

    @Override
    public void deletePayementById(int id) {
        payementRepository.deleteById(id);
    }

    @Override
    public Payement updatePayement(int id, Payement payement) {

        Payement p=payementRepository.findById(id).get();
        if(payement.getAmount()!=null)p.setAmount(payement.getAmount());
        if(payement.getMethod()!=null) p.setMethod(payement.getMethod());
        if(payement.getDateTransuction()!=null)p.setDateTransuction(payement.getDateTransuction());

        return payementRepository.save(p);
    }

    @Override
    public List<Payement> addPayement(Payement payement) {
        payementRepository.save(payement);
        return this.getAllPayements();
    }
}
