import { Observable, delay, of } from "rxjs";
import { PostInterface } from "../types/posts.interface";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})

export class PostsService {

    getPosts(): Observable<PostInterface[]> {

        const posts: PostInterface[] = [
            {
                id: '1',
                title: 'first post'
            },
            {
                id: '2',
                title: 'second post'
            },
            {
                id: '3',
                title: 'third post'
            }
        ];

        return of(posts).pipe(delay(2000));
    }
}
