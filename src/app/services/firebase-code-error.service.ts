import { Injectable } from '@angular/core';
import { FirebaseCodeErrorEnum } from '../utils/firebase-code-error';

@Injectable({
  providedIn: 'root'
})
export class FirebaseCodeErrorService {

  constructor() { }

  codeError(code: string) {

    switch(code) {

      // El correo ya existe
      case FirebaseCodeErrorEnum.EmailAlreadyInUse:
        return 'El usuario ya existe';

      // Contraseña debil
      case FirebaseCodeErrorEnum.WeakPassword:
        return 'La contraseña es muy debil';

      // Correo invalido
      case FirebaseCodeErrorEnum.InvalidEmail:
          return 'El correo es invalido';

      // Contraseña incorrecta
      case FirebaseCodeErrorEnum.WrongPassword:
          return 'La contraseña es incorrecta';

      // Usuario no existe
      case FirebaseCodeErrorEnum.UserNotFound:
          return 'El usuario no existe';

      default:
        return 'Error desconocido';
    }

    
  }
}
