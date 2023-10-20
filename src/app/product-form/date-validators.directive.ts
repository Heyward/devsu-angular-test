import { AbstractControl } from '@angular/forms';

export function currentDateOrFuture(control: AbstractControl): { [key: string]: boolean } | null {
  const inputDate = new Date(control.value);
  const currentDate = new Date();

  if (inputDate < currentDate) {
    return { 'currentDateOrFuture': true };
  }
  return null;
}

export function oneYearLater(control: AbstractControl): { [key: string]: boolean } | null {
  const inputDate = new Date(control.value);
  const releaseDate = new Date(control.root.get('date_release')?.value);
  
  if (isNaN(inputDate.getTime()) || isNaN(releaseDate.getTime())) {
    return { 'oneYearLater': true };
  }

  const oneYearLaterDate = new Date(releaseDate);
  oneYearLaterDate.setFullYear(oneYearLaterDate.getFullYear() + 1);

  if (inputDate.getTime() !== oneYearLaterDate.getTime()) {
    return { 'oneYearLater': true };
  }

  return null;
}
