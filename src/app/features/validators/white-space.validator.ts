import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Observable, of } from 'rxjs';

export function whitespaceValidator(
  control: AbstractControl
): Observable<ValidationErrors | null> {
  if (control.value && control.value.trim() === '')
    return of({ whitespace: true });
  return of(null);
}
