import { Component } from '@angular/core';
import { Modelfood} from '../models/modelfood';
import { AuthService } from '../services/auth/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  ingredients: string[] = [];
  myform: FormGroup;

  constructor(private fb: FormBuilder, private service: AuthService) { this.validate(); }

  newIngredient() {
    const ingredient = this.myform.get('ingredient').value;

    if (ingredient !== '') {
      this.ingredients.push(ingredient);
      this.myform.get('ingredient').setValue('');
    } else {
      this.service.showMessageAlert('Advertencia', 'Ingrese un ingrediente o desactive ingredientes');
    }
  }
  validate() {
    this.myform = this.fb.group({
      name: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      price: ['', Validators.compose([Validators.required, Validators.pattern('[0-9]+.[0-9]{2}')])],
      check: [false],
      ingredient: ['']
    });
  }
  newProduct() {
    let food: Modelfood;

    if (!this.myform.valid) {
      this.service.showMessageAlert('Alerta', 'valores incorrectos');
      return;
    }

    if (this.ingredients.length !== 0) {
      food = {
        name: this.myform.get('name').value,
        price: parseFloat(this.myform.get('price').value),
        ingredients: this.ingredients
      };
    } else {
      food = {
        name: this.myform.get('name').value,
        price: parseFloat(this.myform.get('price').value)
      };
    }

    this.service.saveFoodtoGo(food)
      .then(() => {
        this.myform.get('name').setValue('');
        this.myform.get('price').setValue('');
        this.ingredients = [];
      })
      .catch(() => {
        this.service.showMessageAlert('Alerta', 'Error');
      });
  }

  deleteIngredient(i: number) {
    this.ingredients.splice(i, 1);
  }

  arrayIngredients() {
    if (!this.myform.get('ingredient').value) {
      this.ingredients = [];
    }
  }
}
