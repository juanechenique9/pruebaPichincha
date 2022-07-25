import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Ipokemon } from '../model/pokemon';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  private urlApi: string;

  constructor(private http: HttpClient) { 
    this.urlApi = `${environment.urlPokemon}`;
  }

  public getPokemon():Observable<any>{
      return this.http.get<any>(`${this.urlApi}?idAuthor=1`);
  }

  public addPokemon(pokemon:Ipokemon): Observable<Ipokemon> {
    return this.http.post<Ipokemon>(`${this.urlApi}`, pokemon);
  }

  public deletePokemon(pokemon:Ipokemon): Observable<Ipokemon> {
    return this.http.delete<Ipokemon>(`${this.urlApi}${pokemon.id}`)
  }

  public updatePokemon(pokemon:Ipokemon): Observable<Ipokemon> {
    return this.http.put<Ipokemon>(`${this.urlApi}${pokemon.id}`,pokemon)
  }
}
