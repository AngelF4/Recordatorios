import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from '@angular/fire/auth';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private auth: Auth, private toastController: ToastController) { }

  register({email, password}: any){
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  login({name, email,password}: any){
    return signInWithEmailAndPassword(this.auth,email,password)
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 3000,
      position: 'bottom',
    });
    await toast.present();
  }
}
