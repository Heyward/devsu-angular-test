import { Component, inject } from '@angular/core';
import { CommonModule, formatDate } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../products.service';
import { Product } from '../product';
import { RouterModule } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { UniqueProductIdValidator } from './unique-product-validator.directive';
import { currentDateOrFuture, oneYearLater } from './date-validators.directive';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule], 
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent {
  route: ActivatedRoute = inject(ActivatedRoute);

  product: Product | undefined;
  edit: boolean = true;
  productId = '0';

  form:FormGroup = new FormGroup({});

  get id() { return this.form.get('id'); }
  get name() { return this.form.get('name'); }
  get description() { return this.form.get('description'); }
  get logo() { return this.form.get('logo'); }
  get date_release() { return this.form.get('date_release'); }
  get date_revision() { return this.form.get('date_revision'); }


  constructor(private productService: ProductsService, private uniqueProductIdValidator: UniqueProductIdValidator) {
    this.form = new FormGroup({
      id: new FormControl('',[
        Validators.required, 
        Validators.minLength(3),
        Validators.maxLength(10) 
      ], [
        this.uniqueProductIdValidator.validate.bind(this)
      ]),
      name: new FormControl('',
      [
        Validators.required, 
        Validators.minLength(5),
        Validators.maxLength(100) 
      ]),
      description: new FormControl('',
      [
        Validators.required, 
        Validators.minLength(10),
        Validators.maxLength(200) 
      ]),
      logo: new FormControl('', [
        Validators.required, 
      ]),
      date_release: new FormControl('', [
        Validators.required, currentDateOrFuture
      ]),
      date_revision: new FormControl('', [
        Validators.required, oneYearLater
      ]),
    });

    this.productId = this.route.snapshot.params['id'];
    this.edit = this.productId != '0';

    if (this.edit){
      this.getProduct();
    }
  }

  reset(){
    this.form.reset();

    if (this.edit){
      this.form.get('id')?.setValue(this.productId);
    }
  }

  getProduct() {
    this.productService.getProductById(this.productId).subscribe((product) => {
      this.product = product;

      this.form.get('id')?.disable();
      this.form.get('id')?.setValue(product ? product.id : '');
      this.form.get('name')?.setValue(product ? product.name : '');
      this.form.get('description')?.setValue(product ? product.description : '');
      this.form.get('logo')?.setValue(product ? product.logo : '');
      this.form.get('date_release')?.setValue(product ? formatDate(product.date_release.toString(), 'yyyy-MM-dd', 'en') : '');
      this.form.get('date_revision')?.setValue(product ? formatDate(product.date_revision.toString(), 'yyyy-MM-dd', 'en') : '');
    });
  }

  submit() {
    const id = (this.edit) ? this.product?.id : this.form.value.id;
    const product: Product = {
      id: id ?? '',
      name: this.form.value.name ?? '',
      description: this.form.value.description ?? '',
      logo: this.form.value.logo ?? '',
      date_release: new Date(this.form.value.date_release ?? ''),
      date_revision: new Date(this.form.value.date_revision ?? ''),
    };

    if (this.edit){
      this.productService.editProduct(product).subscribe();
    } else {
      this.productService.saveProduct(product).subscribe();
    }
  }

}
