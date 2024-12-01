import { CommonModule } from '@angular/common';
import { Component, OnInit, computed, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { PostsService } from './services/posts.service';
import { patchState, signalState, signalStore, withComputed, withMethods, withState, withHooks } from '@ngrx/signals';
import { PostInterface } from './types/posts.interface';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap, tap } from 'rxjs';

export interface PostsStateInterface {
    posts: PostInterface[];
    isLoading: boolean;
    error: string | null;
}

export const PostsStore = signalStore(
    { protectedState: false }, withState<PostsStateInterface>({
        posts: [],
        error: null,
        isLoading: false
    }),
    withComputed(store => ({
        postsCount: computed(() => store.posts().length)
    })),
    withMethods((store, postsService = inject(PostsService)) => ({
        addPost(title: string) {
            const newPost: PostInterface = {
                id: crypto.randomUUID(),
                title
            }
            const updatedPosts = [...store.posts(), newPost]
            patchState(store, { posts: updatedPosts })
        },
        removePost(id: string) {
            const updatedPosts = store.posts().filter((post: PostInterface) => {
                return post.id !== id
            })
            patchState(store, { posts: updatedPosts })
        },
        loadPosts: rxMethod<void>(
            pipe(
                switchMap(() => {
                    return postsService.getPosts().pipe(
                        tap((posts: PostInterface[]) => {
                            console.log(posts)
                            patchState(store, { posts })
                        }))
                })
            )
        ),
        addPosts(posts: PostInterface[]) {
            patchState(store, { posts })
        }
    })),
    // withHooks({
    //     onInit(store) {
    //         store.loadPosts()
    //     }
    // })
)

@Component({
    selector: 'app-monsterlessons',
    imports: [ReactiveFormsModule, CommonModule],
    templateUrl: './monsterlessons.component.html',
    styleUrl: './monsterlessons.component.scss',
    providers: [PostsStore]
})
export class MonsterlessonsComponent implements OnInit {
    fb = inject(FormBuilder)
    postsService = inject(PostsService)
    store = inject(PostsStore)
    addForm = this.fb.nonNullable.group({
        title: ''
    })




    ngOnInit(): void {
        this.postsService.getPosts().subscribe(posts => {
            console.log(posts)
            this.store.addPosts(posts)
        })
    }

    // state = signalState<PostsStateInterface>({
    //     posts: [],
    //     error: null,
    //     isLoading: false
    // })
    onAdd(): void {
        // const newPost: PostInterface = {
        //         id: crypto.randomUUID(),
        //         title: this.addForm.getRawValue().title
        //     }
        this.store.addPost(this.addForm.getRawValue().title)
        // const updatedPosts = [...this.state.posts(), newPost]
        // patchState(this.state, state => ({ ...state, posts: updatedPosts }))
        this.addForm.reset();
    }
    // removePost(id: string): void {
    //     const updatedPosts = this.state.posts().filter((post: PostInterface) => {
    //         return post.id !== id
    //     })
    //     patchState(this.state, state => ({ ...state, posts: updatedPosts }))
    // }
}
