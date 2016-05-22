import {Component, OnInit, ElementRef} from 'angular2/core';

import {Map, Point, ScreenUtils} from 'esri';
import {WindowService} from './window.service.ts';
import {TestComponent} from '../test.component';

@Component({
    selector: 'window',
    template: `<div *ngIf="!isZoom&&isOpen" style="position:absolute;z-index:40;" [style.top]="screenPoint.y-54+'px'" [style.left]="screenPoint.x+15+'px'"><div class="esriWindow"><div class="windowHeader"><div class="windowTitle">{{info.title}}</div><div class="windowClose" (click)="onClose()"><i class="fa fa-close"></i></div></div><div class="windowContent"><test *ngIf="info.type=='lamp'" [point]="info.point"></test></div></div><div class="windowPointer"></div></div>`,
    styles: [`.esriWindow{background:white;overflow:hidden;border-radius:5px;}.esriWindow .windowHeader{overflow:hidden;background-color:#44aaf2;}.esriWindow .windowHeader .windowTitle{float:left;font-size:1.2em;margin:5px 10px;}.esriWindow .windowHeader .windowClose{float:right;margin:5px;}.esriWindow .windowHeader .windowClose i{font-size:1.5em;}.esriWindow .windowHeader .windowClose i:hover{color:red;cursor:pointer;}.windowContent{margin:5px;} .windowPointer{position:absolute;top:34px;left:-15px;width:0;height:0;border-top: 20px solid transparent;border-right: 15px solid white;border-bottom: 20px solid transparent;}`],
    inputs: ['map'],
    directives: [TestComponent]
})
export class WindowComponent implements OnInit {
    map:Map;
    isOpen:boolean;
    info:any;
    openWindowSubscriber:any;
    screenPoint:any;
    preDelta:any;
    isZoom:boolean;
    onZoomStartEvent:any;
    onZoomEndEvent:any;
    onPanEvent:any;
    onPanEndEvent:any;

    constructor(private windowService:WindowService, private elementRef:ElementRef) {
        this.isZoom = false;
        this.isOpen = false;
    }

    ngOnInit() {
        this.openWindowSubscriber = this.windowService.openWindowEventEmitter.subscribe((info) => {
            this.onOpen(info);
        });
    }

    ngOnDestroy() {
        this.openWindowSubscriber.unsubscribe();
    }

    onOpen(info) {
        this.info = info;
        this.screenPoint = this.map.toScreen(this.info.point);
        this.onZoomStartEvent = this.map.on("zoom-start", () => {
            this.isZoom = true;
        });
        this.onZoomEndEvent = this.map.on("zoom-end", () => {
            this.screenPoint = this.map.toScreen(this.info.point);
            this.isZoom = false;
        });
        this.onPanEvent = this.map.on("pan", (event) => {
            if (this.preDelta) {
                this.screenPoint.y = this.screenPoint.y - this.preDelta.y + event.delta.y;
                this.screenPoint.x = this.screenPoint.x - this.preDelta.x + event.delta.x;
                this.preDelta = event.delta;
            } else {
                this.screenPoint.x += event.delta.x;
                this.screenPoint.y += event.delta.y;
                this.preDelta = event.delta;
            }
        });
        this.onPanEndEvent = this.map.on("pan-end", () => {
            this.preDelta = null;
        });
        this.isOpen = true;
    }

    onClose() {
        this.isOpen = false;
        this.info = null;
        this.preDelta = null;
        this.screenPoint = null;
        this.onZoomStartEvent.remove();
        this.onZoomEndEvent.remove();
        this.onPanEvent.remove();
        this.onPanEndEvent.remove();
    }

}