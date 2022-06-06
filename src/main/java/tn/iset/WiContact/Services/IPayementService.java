package tn.iset.WiContact.Services;

import tn.iset.WiContact.Entites.Payement;

import java.util.List;

public interface IPayementService {

   List<Payement> getAllPayements();

   Payement getPayementById(int id);

   List<Payement> getPayementByMethodPay(String method);

   Payement affectPayementToClient(int idClient,int idPayment);

   void deletePayementById(int id);

   Payement updatePayement(int id,Payement payement);

   List<Payement> addPayement(Payement payement);


}
