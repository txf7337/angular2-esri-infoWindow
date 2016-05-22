import {Injectable, Output, EventEmitter} from 'angular2/core';

@Injectable()
export class WindowService {
    @Output()
    openWindowEventEmitter:EventEmitter<any>;

    constructor() {
        this.openWindowEventEmitter = new EventEmitter<any>();
    }

    open(info:any) {
        this.openWindowEventEmitter.emit(info);
    }
}