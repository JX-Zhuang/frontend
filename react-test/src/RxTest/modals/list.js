import { ajax } from 'rxjs/ajax';
import { of, from, Observable } from 'rxjs';
import getList from '../../api/list';
class ListModal {
    constructor() {
        this.subscribes = [];
    }
    observable = () => {
        if (this.data) {
            return of(this.data);
        } else {
            return new Observable((subscriber) => {
                getList().then(res => {
                    this.data = res;
                    subscriber.next(res);
                    subscriber.complete();
                })
            });
        }
    }
    subscribe = (callback) => {
        this.subscribes.push(callback);
    }
    getList = () => {
        this.observable().subscribe(...this.subscribes);
    }
}
export default new ListModal();