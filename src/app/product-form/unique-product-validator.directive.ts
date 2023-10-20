import { Injectable } from "@angular/core";
import { AbstractControl, AsyncValidator, AsyncValidatorFn, ValidationErrors } from "@angular/forms";
import { ProductsService } from "../products.service";
import { Observable, map } from "rxjs";


@Injectable({ providedIn: 'root' })
export class UniqueProductIdValidator implements AsyncValidator  {

  constructor(private productService: ProductsService) {}

  validate(
    control: AbstractControl
  ): Observable<ValidationErrors | null> {
    return this.productService.validProductId(control.value).pipe(
      map(exist => (exist ? {uniqueProductIdValidator:true} : null))
    );
  }

}