// Angular
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

// RXJS
import { Observable, Subject } from 'rxjs';

// Project
import { Question } from '../questions.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: "root"
})
export class QuestionsService {
  private questions: Question[] = [];
  private answers: string[] = [];
  private questionsUpdated = new Subject<Question[]>();

  constructor(private http: HttpClient) {}

  /**GET: fetch all questions */
  getQuestions() {
    this.http.get<{message: string, questions: any}>(environment.apiUrl + "/questions")
      .pipe(map((questionData) => {
        return questionData.questions.map(question => {
          return {
            question: question.question,
            answer: question.answer,
            id: question._id
          }
        });
      })).subscribe((transformedData) => {
        this.questions = transformedData;
        this.questionsUpdated.next([...this.questions]);
      });
  }

  getQuestionUpdateListener() {
    return this.questionsUpdated.asObservable();
}

/**GET: first question from the collection */
getFirstQuestion(): Observable<Question> {
 return this.http.get<Question>(environment.apiUrl+ "/question");
}

/**GET: fetch next question from the collection */
getNextQuestion(questionNumber: string): Observable<Question> {
  return this.http.get<Question>(environment.apiUrl + "/nextquestion/" + questionNumber);
}

/**GET: fetch previous question from the collection */
getPreviousQuestion(questionNumber: string): Observable<Question> {
  return this.http.get<Question>(environment.apiUrl + "/previousquestion/" + questionNumber);
}

  /**POST: add questions  */
  addQuestions(questionNumber: number, question: string, answer: string[]) {
    const questionPayLoad: Question = {
      id: null,
      questionNumber: questionNumber,
      question: question,
      answer: answer,
      correctAnswer: null
    };
    this.http.post<Question[]>(environment.apiUrl + "/questions", questionPayLoad)
        .subscribe((data) => {
          console.log(data);
          this.questions.push(questionPayLoad);
        });
  }

  deleteQuestions(id: string) {
    this.http.delete(environment.apiUrl + "/questions/" + id).subscribe(() => {
      console.log('Deleted');
      const updatedQuestions = this.questions.filter(question => question.id !== id);
      this.questions = updatedQuestions;
      this.questionsUpdated.next([...this.questions]);
    });
  }
}
