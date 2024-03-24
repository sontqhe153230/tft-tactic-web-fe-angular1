import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadedServiceService {
  private loading = new BehaviorSubject<boolean>(true);
  public readonly loading$ = this.loading.asObservable();

  setLoading(isLoading: boolean) {
    this.loading.next(isLoading);
  }
}
