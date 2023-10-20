import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../product';
import { ProductsService } from '../products.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-products-list',
  standalone: true,
  imports: [CommonModule, RouterModule, ],
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css'],
})
export class ProductsListComponent {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  total = 0;
  initRow = 0;
  amount = 5;
  pages = 0;
  currentPage = 0;
  showPrev = false;
  showNext = false;

  constructor(private productService: ProductsService) {
    this.getProducts();
    this.initValues();
  }

  updatePages(){
    this.showNext = (this.currentPage < this.pages - 1);
    this.showPrev = (this.currentPage >= 1);
  }

  initValues(){
    this.initRow = 0;
    this.amount = 5;
    this.pages = 0;
    this.currentPage = 0;
  }

  getProducts(text?: string){
    this.productService.getAll()?.subscribe((products: Product[]) => {
      if (text){
        products = products.filter(product => product?.name.toLocaleLowerCase().includes(text.toLocaleLowerCase()));
      }

      this.products = products.slice(this.initRow, this.amount + this.initRow);
      this.filteredProducts = this.products;

      this.total = products.length;
      this.pages = Math.ceil(products.length / this.amount);
      this.updatePages();
    });
  }

  filterResults(text: string){
    this.initValues();
    this.getProducts(text);
  }


  delete(product:Product) {
    this.productService.deleteProduct(product).subscribe(response => {this.getProducts();});
  }

  updateAmount(event: any){
    this.initValues();
    this.amount = parseInt(event.target.value);
    this.getProducts();
  }

  next(){
    if (this.showNext){
      this.currentPage++;
      this.initRow = this.currentPage * this.amount;
      this.getProducts();
    }
    
  }

  prev(){
    if (this.showPrev){
      this.currentPage--;
      this.initRow = this.currentPage * this.amount;
      this.getProducts();
    }
  }

}
