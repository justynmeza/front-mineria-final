import { Component, Inject, Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SESSION_STORAGE, WebStorageService } from 'ngx-webstorage-service';
import { MessageService } from 'primeng/api';
import { UsersService } from 'src/app/services/users.service';

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  cargando : boolean = false;
  formLogin !: FormGroup;
  mostrarPass : boolean = false;

  constructor(private frmBuilder : FormBuilder,
                private router : Router,
                  @Inject(SESSION_STORAGE) private storage: WebStorageService,
                    private usuarioService : UsersService,
                      private messageService : MessageService) {
    this.formLogin = this.frmBuilder.group({
      User : [null, Validators.required],
      Pass : [null, Validators.required],
    })
  }

  ngOnInit(): void {
  }

  // Funcion que va a validar los datos de inicio de sesion
  iniciarSesion() {
    let user : string = this.formLogin.value.User;
    let pass : string = this.formLogin.value.Pass;

    this.usuarioService.login({ "username" : user, "password" : pass}).subscribe(datos => {      
      for (let i = 0; i < datos.length; i++) {
        if (datos[i].username == user && datos[i].password == pass) {
          this.storage.set('User', this.formLogin.value.User);
          this.router.navigate(['/dashboard']);
        } else this.messageService.add({ severity: 'error', summary: '¡Ha ocurrido un error!', detail: '¡El usuario y la contraseña son incorrectos!' });
      }
    }, error => { this.messageService.add({ severity: 'error', summary: '¡Ha ocurrido un error!', detail: '¡El usuario y la contraseña son incorrectos!' }); });
  }

  invitado(){
    this.router.navigate(['/dashboard']);
  }
}
