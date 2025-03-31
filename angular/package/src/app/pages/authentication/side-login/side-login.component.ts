import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, UntypedFormGroup, UntypedFormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthenticationService } from 'src/app/core/service/authentication.service';
import { ToastrService } from 'ngx-toastr';
import { UserLogged } from 'src/app/core/utils/user-logged';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
 interface role {
  name : string,
  value : number
}
@Component({
  selector: 'app-side-login',
  imports: [RouterModule, MaterialModule, FormsModule, ReactiveFormsModule,NgxSpinnerModule],
  templateUrl: './side-login.component.html',
})
export class AppSideLoginComponent {
  public form : UntypedFormGroup;
  constructor( private router: Router,
    fb: UntypedFormBuilder,
    private loginService : AuthenticationService,
    private toastService: ToastrService,
    private spinnerService : NgxSpinnerService
  ) {
    this.form = fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: [
        '',
        Validators.compose([Validators.required, Validators.minLength(2)]),
      ]
    });


  }


  get f() {
    return this.form.controls;
  }
  onChangeSelected(value: any){
    this.form.value.role = value;
    console.log("value",value);
  }
  onSubmit(event: any) {
       this.spinnerService.show();
    console.log(event.value);
    let formData = {
      email: event.value.email,
      password: event.value.password
    };
    this.loginService.Login(formData).subscribe((result: any) => {
     console.log(result);
     if(result == null){
       setTimeout(() => {

             this.spinnerService.hide();
         }, 2000);
      this.toastService.error("Tên tài khoản hoặc mật khẩu không chính xác","Thất bại")

  }
  else{
    if(result.status == true){
      let userLogged: UserLogged = new UserLogged();
        userLogged.setCurrentUser(
          result.token,
          JSON.stringify(result.role)
        );
            this.routingPage('/home');

    }
    else{
      this.routingPage('/authentication/login');
     this.toastService.error("Tài khoản chưa được kích hoạt","Thất bại")

    }
  }

},(err)=>{

    this.routingPage('/authentication/login');
    this.toastService.error("Thông tin tài khoản hoặc mật khẩu chưa chính xác!","Thất bại")
}
);
  }
  routingPage(url : string){

     this.router.navigate([url]);
           setTimeout(() => {

             this.spinnerService.hide();
         }, 2000);


  }

}
