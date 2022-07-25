import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Ipokemon } from '../model/pokemon';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  private urlApi: string;

  constructor(private http: HttpClient) {
    this.urlApi = `${environment.urlPokemon}`;
  }

  // Metodo que comunica con la api de obtener listado de pokemon

  public getPokemon(): Observable<any> {
    return this.http.get<any>(`${this.urlApi}?idAuthor=1`);
  }

  // Metodo que comunica con la api de agregar pokemon

  public addPokemon(pokemon: Ipokemon): Observable<Ipokemon> {
    return this.http.post<Ipokemon>(`${this.urlApi}`, pokemon);
  }

  // Metodo que comunica con la api de eliminar pokemon

  public deletePokemon(pokemon: Ipokemon): Observable<Ipokemon> {
    return this.http.delete<Ipokemon>(`${this.urlApi}${pokemon.id}`);
  }

  // Metodo que comunica con la api de actualizar pokemon

  public updatePokemon(pokemon: Ipokemon): Observable<Ipokemon> {
    return this.http.put<Ipokemon>(`${this.urlApi}${pokemon.id}`, pokemon);
  }
}
