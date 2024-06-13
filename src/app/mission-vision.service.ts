import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MissionVisionService {
  constructor(private http: HttpClient) { }

  updateMissionVision(mision: string, vision: string): Observable<any> {
    const payload = { mision, vision };
    return this.http.post<any>('http://localhost:3000/api/update-mission-vision', payload);
  }

  getMissionVision(): Observable<any> {
    return this.http.get<any>('http://localhost:3000/api/get-mission-vision');
  }
}
