import { Injectable } from '@angular/core'
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Challenge } from "./challenge";

@Injectable({
  providedIn: 'root'
})

export class InMemoryDataService implements InMemoryDbService {

  createDb() {
    const challenges = [
      {id: 2, title: 'Clean beach', description: "Collect garbage at the beach.", solved: false},
      {
        id: 3,
        title: 'F+F knowledge',
        description: "Learn about your local flora and fauna. Which animals live in your surroundings, " +
          "which plants do grow? How many species can you count? Compare with your friends. Together you can find more than on your own." +
          " You can also organise a special event at your school for example. You can get extra credit, if you motivate others to do" +
          " these challenges! And so on, and so on, and so on. Now, what else can we talk about?",
        solved: true
      },
      {id: 1, title: 'Clean woods', description: 'Collect gargabe in the woods.', solved: true},
    ];
    return {challenges};
  }

  genId(challenges: Challenge[]): number {
    return challenges.length > 0 ? Math.max(...challenges.map(challenge => challenge.id)) + 1 : 1;
  }

}
