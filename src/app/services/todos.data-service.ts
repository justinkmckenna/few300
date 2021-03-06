import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { TodoCreate } from "../models";
import { TodoEntity } from "../reducers/todos.reducer";

@Injectable()
export class TodosDataService {

  readonly baseUrl = environment.apiUrl + 'todos/';

  constructor(private client: HttpClient) {}

  addTodo(todo: TodoCreate): Observable<TodoEntity> {
    const entity = { name: todo.name, project: todo.project, dueDate: todo.dueDate, completed: todo.completed } as TodoPostRequest;
    return this.client.post<TodoEntity>(this.baseUrl, entity);
  }

  toggleTodo(todo: TodoEntity): Observable<any> {
    const previousCompletedStatus = todo.completed;
    if (previousCompletedStatus === true) {
      return this.client.post<any>(this.baseUrl + 'incomplete', todo);
    } else {
      return this.client.post<any>(this.baseUrl + 'completed', todo);
    }
  }

  updateItemProject(id: string, project: string): Observable<any> {
    const body = {"value": project};
    return this.client.post<any>(this.baseUrl + id + '/project', body);
  }

  getAllTodos(): Observable<TodoEntity[]> {
    return this.client.get<GetTodosResponse>(this.baseUrl).pipe(
      map(response => response.data)
    )
  }
}

interface TodoPostRequest {
  name: string;
  project: string;
  dueDate: string;
  completed: boolean;
}

interface GetTodosResponse {
  data: TodoEntity[];
}
