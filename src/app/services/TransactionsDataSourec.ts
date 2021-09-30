import { DataSource } from '@angular/cdk/table';
import { Transactions} from '../models/loyalty/transactions';
import { CollectionViewer } from '@angular/cdk/collections';
import { Observable, BehaviorSubject, of } from "rxjs";
import { LoyaltyService } from './loyalty/loyalty.service';
import { catchError, finalize } from "rxjs/operators";
 
export class TodoDataSource implements DataSource<Transactions>{
 
    private todoSubject = new BehaviorSubject<Transactions[]>([]);
    private loadingSubject = new BehaviorSubject<boolean>(false);
    private countSubject = new BehaviorSubject<number>(0);
    public counter$ = this.countSubject.asObservable();
 
    constructor(private todoService: LoyaltyService) { }
 
    connect(collectionViewer: CollectionViewer): Observable<Transactions[]> {
        return this.todoSubject.asObservable();
    }
 
    disconnect(collectionViewer: CollectionViewer): void {
        this.todoSubject.complete();
        this.loadingSubject.complete();
        this.countSubject.complete();
    }
 
    // loadTodos(pageNumber = 0, pageSize = 10) {
    //     this.loadingSubject.next(true);
    //     this.todoService.listTodos({ page: pageNumber, size: pageSize })
    //         .pipe(
    //             catchError(() => of([])),
    //             finalize(() => this.loadingSubject.next(false))
    //         )
    //         .subscribe((result: TodoListResponse) => {
    //             this.todoSubject.next(result.content);
    //             this.countSubject.next(result.totalElements);
    //         }
    //         );
    // }
 
}