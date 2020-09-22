import { Injectable } from '@angular/core';
import { ApiService } from '@core/services/api.service';
import { Profile } from '@shared/models/profile';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private _URL_SEGMENT: string = 'profiles';

  constructor(private apiService: ApiService) {}

  get(): Observable<Profile> {
    return this.apiService.get<Profile>(`${this._URL_SEGMENT}`);
  }

  update(profile: Profile): Observable<Profile> {
    return this.apiService.put<Profile>(`${this._URL_SEGMENT}`, profile);
  }
}
