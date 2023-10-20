import { Routes } from '@angular/router';
import { ProductsListComponent } from './products-list/products-list.component';
import { ProductFormComponent } from './product-form/product-form.component';

const routeConfig: Routes = [
    {
      path: '',
      component: ProductsListComponent,
      title: 'Los productos'
    },
    {
      path: 'products/:id',
      component: ProductFormComponent,
      title: 'El producto'
    }
  ];
  
  export default routeConfig;