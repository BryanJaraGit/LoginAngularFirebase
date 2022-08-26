import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FirebaseCodeErrorService } from 'src/app/services/firebase-code-error.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-recuperar-password',
  templateUrl: './recuperar-password.component.html',
  styleUrls: ['./recuperar-password.component.css']
})
export class RecuperarPasswordComponent implements OnInit {

  recuperarUsuario: FormGroup;
  loading: boolean = false;

  constructor(private fb:FormBuilder, private afAuth:AngularFireAuth, private router:Router, private firebaseError: FirebaseCodeErrorService) {
    this.recuperarUsuario = this.fb.group({
      correo: ['', [Validators.required, Validators.email]]
    })
   }

  ngOnInit(): void {
  }

  recuperar() {
    const email = this.recuperarUsuario.value.correo;
    this.loading = true;

    this.afAuth.sendPasswordResetEmail(email).then(() => {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Le hemos enviado un correo para restablecer su contraseña',
        showConfirmButton: false,
        timer: 1500
      })
      this.router.navigate(['/loin']);

    }).catch((error) => {
      this.loading = false;
      alert (this.firebaseError.codeError(error.code));
    }) 
  }

}
