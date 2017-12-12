import { Component, OnInit, OnDestroy } from '@angular/core';
import { socketServiceFactory, SocketService } from "../../helpers/socket.service";

// Import Chart.js library
import 'chart.js';
import { FlotChartDirective } from '../../inspinia/components/charts/flotChart';
import { UserService } from "../../helpers/user.service";
import { Subscription } from "rxjs/Subscription";
import { AdvGrowlService } from 'primeng-advanced-growl';


declare var jQuery:any;

@Component({
    selector: 'charts-component',
    templateUrl: 'charts.component.html'
})

export class ChartsComponent implements OnInit, OnDestroy {

    private socket: SocketService;
    private subscriber: Subscription;
    private errSubscriber: Subscription;
    public numberOfCharts: any = [];
    public chartsMetaData: any;

    constructor(private _user:UserService, private growlService: AdvGrowlService){
        this.socket = socketServiceFactory(_user);
        this.numberOfCharts = 0;
    }

    ngOnInit(): void {
        this.subscriber = this.socket.getChartsData().subscribe(data => {
            this.chartsMetaData = data.map(x => x.information);
            var floatDatasets = [];
            var recordsCounter = 0;

            for(let j=0; j < data.length; j++){
                let singleChartData = data[j];
                let floatDataset = [[]];
                if(this.flotDatasets.length > j){
                    for(let i=0; i < this.flotDatasets[j][0].length; i++){
                        floatDataset[0].push([this.flotDatasets[j][0][i][0], this.flotDatasets[j][0][i][1]]);
                    }
                }
                for(let i=singleChartData.rows.length-1; i >=0; i++){
                    floatDataset[0].unshift([singleChartData.rows[i].created_epoch*1000, singleChartData.rows[i].value]);
                    recordsCounter++;
                }
                floatDatasets.push(floatDataset);
            }

            this.growlService.createInfoMessage(recordsCounter + " records got updated", "Update");
            this.flotDatasets = floatDatasets;

        });

        this.errSubscriber = this.socket.getErrors().subscribe( (err:any) => {
            this.growlService.createErrorMessage(err.body,"Data loading failed");
        });
    }

    ngOnDestroy(): void {
        this.socket.disconnect();
        this.subscriber.unsubscribe();
        this.errSubscriber.unsubscribe();
    }


    public flotDatasets:Array<any> = [];
    public flotOptions:any =
        {
            series: {splines: {show: true, tension: 0.1, lineWidth: 1, fill: 0.3}, lines: {show: false}},
            grid: {tickColor: "#d5d5d5", borderWidth: 1, color: '#d5d5d5'},
            colors: ["#1ab394", "#1C84C6"],
            xaxis: {
                mode: "time",
                timeformat: "%Y/%m/%d %H:%M"
            }
        };



}
