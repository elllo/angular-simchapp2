import { Component, OnInit } from '@angular/core';

import { Challenge } from "../challenge";
import { ChallengesService } from "../challenges.service";

@Component({
  selector: 'app-challenges',
  templateUrl: './challenges.component.html',
  styleUrls: ['./challenges.component.css']
})

export class ChallengesComponent implements OnInit {

  challenges: Challenge[];
  locallyStoredChallenges: Challenge[];
  constructor(
    private challengesService: ChallengesService,
  ) { }

  ngOnInit() {
    this.getChallenges();
    this.locallyStoredChallenges = JSON.parse(localStorage.getItem('challenges'));
    console.log(this.locallyStoredChallenges);
    for (let challenge of this.locallyStoredChallenges) {
      console.log(challenge);
      this.challengesService.addChallenge(challenge);
    }
    for (let challenge of this.challenges) {
      console.log(challenge);
    }
  }

  getChallenges() {
    this.challengesService.getChallenges()
      .subscribe(challenges => this.challenges = challenges);
    console.log("This.challenges: (inside getChallenged() "+this.challenges);
  }

  add(title: string) {
    title = title.trim();
    if (!title) { return }
    this.challengesService.addChallenge({ title } as Challenge)
      .subscribe(challenge => { this.challenges.push(challenge);
      });
    this.challengesService.updateLocalStorage(this.challenges);
  }



  delete(challenge: Challenge) {
    this.challenges = this.challenges.filter(c => c !== challenge);
    this.challengesService.deleteChallenge(challenge).subscribe();
    this.challengesService.updateLocalStorage(this.challenges);
  }

}
