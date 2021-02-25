import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { ProjectCreate } from "../models";
import { ProjectEntity } from "../reducers/projects.reducer";

@Injectable()
export class ProjectsDataService {

  readonly baseUrl = environment.apiUrl + 'projects/';

  constructor(private client: HttpClient) {}

  addProject(project: ProjectCreate): Observable<ProjectEntity> {
    const entity = { name: project.name } as ProjectPostRequest;
    return this.client.post<ProjectEntity>(this.baseUrl, entity);
  }

  getAllProjects(): Observable<ProjectEntity[]> {
    return this.client.get<GetProjectsResponse>(this.baseUrl).pipe(
      map(response => response.data)
    )
  }
}

interface ProjectPostRequest {
  name: string;
}

interface GetProjectsResponse {
  data: ProjectEntity[];
}
