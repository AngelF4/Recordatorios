import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

import { RecordatorioComponentComponent } from './pages/recordatorio-component/recordatorio-component.component';
@NgModule({
  declarations: [AppComponent,
    RecordatorioComponentComponent
  ],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, provideFirebaseApp(() => initializeApp({"projectId":"recordatorio-a6a35","appId":"1:436168261401:web:4859275f44113759b30f88","storageBucket":"recordatorio-a6a35.appspot.com","apiKey":"AIzaSyDGfOmhedGCAv5UODJPzDLEaubKZhv1J-8","authDomain":"recordatorio-a6a35.firebaseapp.com","messagingSenderId":"436168261401"})), provideAuth(() => getAuth()), provideFirestore(() => getFirestore())],
  bootstrap: [AppComponent],
})
export class AppModule {}
