import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from '@frontend/users';

import { Routes } from '@angular/router';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { AccordionModule } from 'primeng/accordion';
import { NavComponent } from './shared/nav/nav.component';
import { ProductsModule } from '@frontend/products';
import { UiModule } from '@frontend/ui';

import { OrdersModule } from '../../../../libs/orders/src/lib/orders.module';
import { MessagesComponent } from './shared/messages/messages.component';
import { MessageService } from 'primeng/api';
import { UsersModule } from '../../../../libs/users/src/lib/users.module';
import { ToastModule } from 'primeng/toast';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { NgxStripeModule } from 'ngx-stripe';
import { RegistrarPersonaComponent } from './registrar-persona/registrar-persona.component';
import { RegistrarForm } from './registrar-persona/registrar.form';

// PRIMENG
import { InputTextModule } from 'primeng/inputtext';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputMaskModule } from 'primeng/inputmask';
import { TagModule } from 'primeng/tag';
import { FieldsetModule } from 'primeng/fieldset';
import { ContactoComponent } from './contacto/contacto.component';
import { ComentarioForm } from './contacto/comentario.form';
import { EditorModule } from 'primeng/editor';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { SeguimientoComponent } from './seguimiento/seguimiento.component';
import { ProgressBarModule } from 'primeng/progressbar';
import { TableModule } from 'primeng/table';
import { CardModule } from 'primeng/card';
import { SeguimientoDetalleComponent } from './seguimiento/seguimiento-detalle/seguimiento-detalle.component';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'register', component: RegistrarPersonaComponent },
  { path: 'contact', component: ContactoComponent },
  { path: 'seguimiento', component: SeguimientoComponent },
  { path: 'seguimiento/:id', component: SeguimientoDetalleComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    HeaderComponent,
    FooterComponent,
    NavComponent,
    MessagesComponent,
    RegistrarPersonaComponent,
    ContactoComponent,
    SeguimientoComponent,
    SeguimientoDetalleComponent,
  ],
  imports: [
    InputTextModule,
    DropdownModule,
    ButtonModule,
    TagModule,
    FieldsetModule,
    InputMaskModule,
    BrowserModule,
    InputTextareaModule,
    CardModule,
    EditorModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    AccordionModule,
    ReactiveFormsModule,
    ProductsModule,
    UiModule,
    TableModule,
    OrdersModule,
    ToastModule,
    ProgressBarModule,
    UsersModule,
    NgxStripeModule.forRoot(
      'pk_test_51LN2VQG9VZofBzhLBPYsbVZ3sXrfdgruGjU3xYaBDcZjq8cC4EokTuHP9cMxU3iYniJV2IW9WgNMx8XWSE1Z7N7700B4Ky1RbC'
    ),
  ],
  providers: [
    RegistrarForm,
    ComentarioForm,
    MessageService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
