import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { SnakeCaseToTitleCasePipe } from './snake-case-to-title-case.pipe';
import { StoreModule } from '@ngrx/store';
import { userReducer } from './reducers/user.reducer';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    SnakeCaseToTitleCasePipe,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    StoreModule.forRoot({
      user: userReducer,
    }),
  ],
  providers: [{ provide: HttpClient, useClass: HttpClient }],
  bootstrap: [AppComponent],
})
export class AppModule {}
