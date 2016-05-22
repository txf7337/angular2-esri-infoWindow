import {Component, Input} from 'angular2/core';

@Component({
    selector: 'test',
    template: `<div>{{point.x}},{{point.y}}</div>`
})
export class TestComponent {
    @Input()point:any;

    constructor() {
    }

}