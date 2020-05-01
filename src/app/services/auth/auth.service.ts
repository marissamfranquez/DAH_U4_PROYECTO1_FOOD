import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Modelfood } from '../../models/modelfood';
import { Router, NavigationExtras } from '@angular/router';
import { AlertController } from '@ionic/angular';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private alertController: AlertController, public fAuth: AngularFireAuth,
              private router: Router, private firestore: AngularFirestore) {}

   // registro
   OnRegister(email: string, password: string) {
    this.fAuth.signInWithEmailAndPassword(email, password)
      .then(() => {
        this.goTo('/tabs');
      })
      .catch(() => {
        this.showMessageAlert('Alerta', 'No se puede ingresar, verifique sus ingresos en correo o contraseña');
      });
  }
  signOut() {
    this.fAuth.signOut()
      .then(() => {
        this.goTo('/login');
      })
      .catch(() => {
        console.log('error');
      });
  }
  Auth() {
    this.fAuth.onAuthStateChanged((user) => {
      if (user) {
        this.goTo('/tabs');
      }
    });
  }
  goTo(traslado: string) {
    this.router.navigate([traslado]);
  }

  saveFoodtoGo(product: Modelfood) {
    return this.firestore.collection('foodtogo').add(product);
  }

  getProducts() {
    return this.firestore.collection('foodtogo').snapshotChanges();
  }
  async showMessageAlert(titleAlert: string, messageAlert: string) {
    const alert = await this.alertController.create({
      header: titleAlert,
      message: messageAlert,
      buttons: ['Aceptar']
    });
    await alert.present();
  }

}
