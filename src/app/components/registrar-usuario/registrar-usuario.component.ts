import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FirebaseCodeErrorService } from 'src/app/services/firebase-code-error.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registrar-usuario',
  templateUrl: './registrar-usuario.component.html',
  styleUrls: ['./registrar-usuario.component.css']
})
export class RegistrarUsuarioComponent implements OnInit {

  registrarUsuario: FormGroup;
  loading: boolean = false;

  constructor(private fb:FormBuilder, private afAuth:AngularFireAuth, private router:Router, private firebaseError: FirebaseCodeErrorService) {
    this.registrarUsuario = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmarPassword: ['', Validators.required]
    })
   }

  ngOnInit(): void {
  }

  registrar() {
    const email = this.registrarUsuario.value.email;
    const password = this.registrarUsuario.value.password;
    const confirmarPassword = this.registrarUsuario.value.confirmarPassword;

    
    if(password !== confirmarPassword) {
      Swal.fire({
        icon: 'error',
        title: 'Diferentes contraseñas',
        text: 'La contraseñas ingresadas deben coincidir!',
      })
      return;
    }

    this.loading = true;

    this.afAuth.createUserWithEmailAndPassword(email, password).then(() => {
      
      this.verificarCorreo();
      
    }).catch((error) => {
      this.loading = false;
      alert (this.firebaseError.codeError(error.code));
    });
  }

  verificarCorreo(){
    this.afAuth.currentUser.then(user => user?.sendEmailVerification())
      .then(() => {
        Swal.fire({
          position: 'center',
          icon: 'info',
          title: 'Verificar correo',
          text: 'Te enviamos un correo electronico para verificarlo',
          showConfirmButton: false,
          timer: 1500
        });
        this.router.navigate(['/login']);
      })
  }
  

}
