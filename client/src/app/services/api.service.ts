import { Injectable } from '@angular/core';
import { Apollo, QueryRef } from 'apollo-angular';

@Injectable({
    providedIn: 'root',
})
export class ApiService {
    public API_SERVER = 'http://localhost/graphql';

    private postsQuery!: QueryRef<any>;
    constructor(private apollo: Apollo) {}

    // public readAll<T>(item: string) {
    //   return this.httpClient.get<T>(`${this.API_SERVER}/${item}`);
    // }
    // public create<T>(value: any, item: string) {
    //   return this.httpClient.post<T>(`${this.API_SERVER}/${item}`, value);
    // }
    // public update<T>(id: string, value: any, item: string) {
    //   return this.httpClient.patch<T>(`${this.API_SERVER}/${item}/${id}`, value);
    // }
    // public delete<T>(id: string, item: string) {
    //   return this.httpClient.delete<T>(`${this.API_SERVER}/${item}/${id}`);
    // }

    public getAll<T>(q: any) {
        this.postsQuery = this.apollo.watchQuery<T>({
            query: q,
        });
        return this.postsQuery.valueChanges;
    }
    public getAllById<T>(q: any, id: string) {
        this.postsQuery = this.apollo.watchQuery<T>({
            query: q,
            variables: {
                id,
            },
        });
        return this.postsQuery.valueChanges;
    }
    public refetch() {
        this.postsQuery.refetch();
    }

    public create<T>(q: any, input: T) {
        return this.apollo.mutate<any>({
            mutation: q,
            variables: {
                input,
            },
        });
    }

    public delete<T>(q: any, input: T) {
        return this.apollo.mutate<any>({
            mutation: q,
            variables: {
               input,
            },
        });
    }

    public update<T>(q: any, input: T) {
        return this.apollo.mutate<any>({
            mutation: q,
            variables: {
                input,
            },
        });
    }
}
