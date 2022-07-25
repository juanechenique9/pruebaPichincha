import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';


//// Componentes//////
import { AppComponent } from './app.component';
import { SearchPokemonComponent } from './component/search-pokemon/search-pokemon.component';
import { AddPokemonComponent } from './component/add-pokemon/add-pokemon.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//////Servicios////////
import {PokemonService} from './services/pokemon.service'

@NgModule({
  declarations: [
    AppComponent,
    SearchPokemonComponent,
    AddPokemonComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
    PokemonService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
