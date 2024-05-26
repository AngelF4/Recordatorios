import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, User } from '@angular/fire/auth';
import { Recordatorio } from '../interfaces/recordatorio';
import { collection, addDoc, query, orderBy, doc, deleteDoc, setDoc, CollectionReference } from 'firebase/firestore';
import { Firestore, collectionData } from '@angular/fire/firestore';
import { ToastController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { getAuth } from 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class UserService {private currentUser: User | null = null;

  constructor(private auth: Auth,
    private firestore: Firestore,
    private toastController: ToastController) {
this.auth.onAuthStateChanged(user => {
this.currentUser = user;
});
}

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

  async addRecordatorio(recordatorio: Recordatorio) {
    if (this.currentUser) {
      const recordatorioRef = collection(this.firestore, `Usuarios/${this.currentUser.uid}/Recordatorios`); 
      return addDoc(recordatorioRef, recordatorio);
    } else {
      throw new Error('User not authenticated');
    }
  }
  
  getRecordatorios(): Observable<Recordatorio[]> {
    if (this.currentUser) {
      const recordatorioRef = collection(this.firestore, `Usuarios/${this.currentUser.uid}/Recordatorios`) as CollectionReference<Recordatorio>; 
      const orderedRecordatorioQuery = query(recordatorioRef, orderBy('date'));
      return collectionData(orderedRecordatorioQuery, { idField: 'id' }) as Observable<Recordatorio[]>;
    } else {
      throw new Error('User not authenticated');
    }
  }
  
  async deleteRecordatorio(recordatorio: Recordatorio) {
    if (this.currentUser) {
      try {
        const recordatorioDocRef = doc(this.firestore, `Usuarios/${this.currentUser.uid}/Recordatorios/${recordatorio.id}`); 
        await deleteDoc(recordatorioDocRef);
        return "Registro eliminado correctamente";
      } catch (error) {
        console.error("Error al eliminar el registro:", error);
        return "Error al eliminar el registro";
      }
    } else {
      throw new Error('User not authenticated');
    }
  }
}