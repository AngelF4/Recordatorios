import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from '@angular/fire/auth';
import { Recordatorio } from '../interfaces/recordatorio';
import { collection, addDoc, query, orderBy, doc, deleteDoc } from 'firebase/firestore';
import { Firestore, collectionData } from '@angular/fire/firestore';
import { ToastController } from '@ionic/angular';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private auth: Auth,
              private firestore: Firestore,
              private toastController: ToastController) { }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
                                                      message,
                                                      duration: 3000,
                                                      position: 'bottom',
                                                    });
                  await toast.present();
              }

  register({email, password}: any){
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  login({name, email,password}: any){
    return signInWithEmailAndPassword(this.auth,email,password)
  }

  addRecordatorio(recordatorio: Recordatorio){
    const recordatorioRef = collection(this.firestore, 'Recordatorio');
    return addDoc(recordatorioRef, recordatorio);
  }

  getRecordatorios(): Observable<Recordatorio[]>{
    const recordatorioRef = collection(this.firestore,'Recordatorio');
    const orderedRecordatorioQuery = query(recordatorioRef, orderBy('date'));
    return collectionData(orderedRecordatorioQuery, { idField: 'id' }) as Observable<Recordatorio[]>
  }

  async deleteRecordatorio(recordatorio: Recordatorio) {
    try {
      const recordatorioDocRef = doc(this.firestore, `Recordatorio/${recordatorio.id}`);
      await deleteDoc(recordatorioDocRef);
      return "Registro eliminado correctamente";
    } catch (error) {
      console.error("Error al eliminar el registro:", error);
      return "Error al eliminar el registro";
    }
  }
}
