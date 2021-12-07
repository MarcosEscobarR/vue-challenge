export type ValidatorFn<T = string> = (value: T) => ValidationResult;
export type ValidationResult = true | string;

export class Validators {
  static required(value: string): ValidationResult {
    return !!value || 'Campo requerido';
  }


}
