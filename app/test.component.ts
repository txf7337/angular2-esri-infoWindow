import {Component, Input} from 'angular2/core';

@Component({
    selector: 'test',
    template: `<div style="margin:10px">{{point.x}}<br>{{point.y}}</div>`
})
export class TestComponent {
    @Input()point:any;

    constructor() {
    }

}