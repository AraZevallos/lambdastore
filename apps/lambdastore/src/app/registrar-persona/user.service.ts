import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';
import { firstValueFrom, map, Observable } from 'rxjs';
import { User } from './user';
import { UsersFacade } from 'libs/users/src/lib/state/users.facade';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  apiURLUsers = environment.apiURL + 'users/';
  constructor(private http: HttpClient, private userFacade: UsersFacade) {}

  getUsers(): Promise<User[]> {
    return firstValueFrom(this.http.get<User[]>(this.apiURLUsers));
  }

  getUser(userId: string): Observable<User> {
    return this.http.get<User>(`${this.apiURLUsers}/${userId}`);
  }

  createUser(user: User): Promise<User> {
    return firstValueFrom(this.http.post<User>(this.apiURLUsers, user));
  }

  updateUser(user: User, id: String): Observable<User> {
    return this.http.put<User>(this.apiURLUsers + id, user);
  }

  deleteUser(userId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiURLUsers}${userId}`);
  }

  getUsersCount(): Observable<number> {
    return this.http
      .get<number>(`${this.apiURLUsers}get/count`)
      .pipe(map((objectValue: any) => objectValue.count));
  }

  initAppSession() {
    this.userFacade.buildUserSession();
  }

  observeCurrentUser() {
    return this.userFacade.currentUser$;
  }

  isCurrentUserAuth() {
    return this.userFacade.isAuthenticate$;
  }
}
