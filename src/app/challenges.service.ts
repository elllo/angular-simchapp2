import { Injectable } from '@angular/core';
import { Observable, of } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";

import {Challenge} from "./challenge";
import {error} from "selenium-webdriver";
import NoSuchAlertError = error.NoSuchAlertError;

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
}

@Injectable({
  providedIn: 'root'
})

export class ChallengesService {

  // private challenges: Challenge[];
  private challengesUrl = 'api/challenges';

  constructor(
    // this.challenges = JSON.parse(localStorage.getItem('challenge')) || this.mockChallenges;
    // this.update();
    private http: HttpClient,
  ) {}

  getChallenges(): Observable<Challenge[]> {
    return this.http.get<Challenge[]>(this.challengesUrl);
  }

  getChallenge(id: number): Observable<Challenge> {
    const url = `${this.challengesUrl}/${id}}`;
    return this.http.get<Challenge>(url);
  }

  /** CRUD operations */

  /** POST */
   addChallenge(challenge: Challenge): Observable<Challenge> {
    return this.http.post<Challenge>(this.challengesUrl, challenge, httpOptions);
  }

   /** PUT */
  updateChallenge (challenge: Challenge): Observable<any> {
    return this.http.put(this.challengesUrl, challenge, httpOptions);
   }


  /** DELETE: delete the challenge from the server */
  deleteChallenge(challenge: Challenge | number): Observable<Challenge> {
    const id = typeof challenge === 'number' ? challenge : challenge.id;
    const url = `${this.challengesUrl}/${id}`;

    return this.http.delete<Challenge>(url, httpOptions);
      /*.pipe(
      tap(_ => this.log(`deleted hero id=${id}`)),
      catchError(this.handleError<Challenge>('deleteChallenge'))*/
  }

  /** this will store the challenges in the browser storage */
  updateLocalStorage(challenges: Challenge[]) {
    localStorage.setItem('challenges', JSON.stringify(challenges));
    console.log(JSON.parse(localStorage.getItem('challenges')));
  }

/*  private findIndex(id: number): number {
    for (let i=0; i<this.challenges.length; i++) {
      if (this.challenges[i].id === id) return i;
    }
    throw new Error(`Challenge with id ${id} was not found`);
  }*/
}
