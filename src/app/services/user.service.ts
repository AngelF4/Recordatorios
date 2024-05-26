import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@angular/fire/auth';
import { Recordatorio } from '../interfaces/recordatorio';
import { collection, addDoc, query, orderBy, doc, deleteDoc, setDoc } from 'firebase/firestore';
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

  async register({ name, email, password, user_image }: any) {
    try {
      const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
      const user = userCredential.user;
      if (user) {
        const userDocRef = doc(this.firestore, `Usuarios/${user.uid}`);
        await setDoc(userDocRef, {
          id: user.uid,
          name: name,
          email: email,
          user_image: user_image
        });
      }
      return userCredential;
    } catch (error) {
      this.presentToast('Error al registrar usuario');
      throw error;
    }
  }

  login({ email, password }: any) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  addRecordatorio(recordatorio: Recordatorio) {
    const recordatorioRef = collection(this.firestore, 'Recordatorio');
    return addDoc(recordatorioRef, recordatorio);
  }

  getRecordatorios(): Observable<Recordatorio[]> {
    const recordatorioRef = collection(this.firestore, 'Recordatorio');
    const orderedRecordatorioQuery = query(recordatorioRef, orderBy('date'));
    return collectionData(orderedRecordatorioQuery, { idField: 'id' }) as Observable<Recordatorio[]>;
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
