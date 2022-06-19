import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ICharacter } from '@interfaces/character.interface';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root',
})
export class BreakingBadApiService {

  private readonly URL = `${environment.baseUrl}characters`;

  constructor(private http: HttpClient) {}

  public getCharacter(): Observable<ICharacter[]> {
    return this.http.get<ICharacter[]>(this.URL);
  }

}
