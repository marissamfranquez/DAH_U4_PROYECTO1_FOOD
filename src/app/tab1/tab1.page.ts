import { Component } from '@angular/core';
import { Modelfood } from '../models/modelfood';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  food: Modelfood[] = [];

  constructor(private firestore: AuthService) {
    this.firestore.getProducts().subscribe(data => {
      this.food = data.map(p => {
        return {
          id: p.payload.doc.id,
          name: p.payload.doc.get('name'),
          price: p.payload.doc.get('price'),
        } as Modelfood;
      });
    });
  }
  signOut() {
    this.firestore.signOut();
  }
}
