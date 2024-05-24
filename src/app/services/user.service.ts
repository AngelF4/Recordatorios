import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from '@angular/fire/auth';
import { Recordatorio } from '../interfaces/recordatorio';
import { collection, addDoc  } from 'firebase/firestore';
import { Firestore } from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private auth: Auth,
              private firestore: Firestore
  ) { }

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
}
