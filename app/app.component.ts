import {Component, OnInit, ElementRef} from 'angular2/core';

import {Map} from 'esri';

import {WindowComponent} from './window/window.component';
import {WindowService} from './window/window.service';
@Component({
    template: `<div class="map"><window [map]="map"></window></div>`,
    styles: ['.map{height:100%;position:relative;}'],
    directives: [WindowComponent],
    providers: [WindowService]
})
export class AppComponent implements OnInit {
    map:Map;

    constructor(private elementRef:ElementRef,private windowService:WindowService) {
    }

    ngOnInit() {
        this.map = new Map(this.elementRef.nativeElement.firstElementChild, {
            center: [116.3, 40.2],
            zoom: 14,
            maxZoom: 22
        });
        this.map.on('click', (event) => {
            this.windowService.open({
                title: 'click event',
                type: 'test',
                point: event.mapPoint
                //anything
            });
        });
    }

}