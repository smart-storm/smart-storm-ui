import { Component, OnInit, OnDestroy } from '@angular/core';
import { socketServiceFactory, SocketService } from "../../helpers/socket.service";

// Import Chart.js library
import 'chart.js';
import { FlotChartDirective } from '../../inspinia/components/charts/flotChart';
import {UserService} from "../../helpers/user.service";
import {Subscription} from "rxjs/Subscription";

declare var jQuery:any;

@Component({
    selector: 'charts-component',
    templateUrl: 'charts.component.html'
})

export class ChartsComponent implements OnInit, OnDestroy {

    private socket: SocketService;
    private subscriber: Subscription;
    public numberOfCharts: any = [];
    public chartsMetaData: any;

    constructor(private _user:UserService){
        this.socket = socketServiceFactory(_user);
        this.numberOfCharts = 0;
    }

    ngOnInit(): void {
        this.subscriber = this.socket.getChartsData().subscribe(data => {
            this.chartsMetaData = data.map(x => x.information);
            var floatDatasets = [];
            for(let j=0; j < data.length; j++){
                let singleChartData = data[j];
                let floatDataset = [[]];
                for(let i=0; i < singleChartData.rows.length; i++){
                    floatDataset[0].push([i, singleChartData.rows[i].value]);
                }
                floatDatasets.push(floatDataset);
            }
            console.log(floatDatasets);
            this.flotDatasets = floatDatasets;
        });
    }



    ngOnDestroy(): void {
        this.socket.disconnect();
        this.subscriber.unsubscribe();
    }

    public doughnutChartType:string = 'doughnut';

    public doughnutChartLabels1:string[] = ['App', 'Software', 'Laptop'];
    public doughnutChartData1:number[] = [70, 27, 85];

    public doughnutChartLabels2:string[] = ['App', 'Software', 'Laptop'];
    public doughnutChartData2:number[] = [300, 50, 100];

    public colors:Array<any> = [{backgroundColor: ["#a3e1d4", "#dedede", "#9CC3DA"]}];

    public getData(){

    }

    // Main Chart

    public flotDatasets:Array<any> = [];

    public flotOptions:any =
        {
            series: {splines: {show: true, tension: 0.1, lineWidth: 1, fill: 0.3}, lines: {show: false}},
            grid: {tickColor: "#d5d5d5", borderWidth: 1, color: '#d5d5d5'},
            colors: ["#1ab394", "#1C84C6"],
        };

    // Peity chart

    public peityType1:string = "bar";
    public peityOptions1:any = { fill: ["#1ab394", "#d7d7d7"], width:100};

    public peityType2:string = "line";
    public peityOptions2:any = { fill: '#1ab394',stroke:'#169c81', width: 64 };

    // Sparkline chart

    public sparklineData:Array<any> = [5, 6, 7, 2, 0, 4, 2, 4, 5, 7, 2, 4, 12, 14, 4, 2, 14, 12, 7];
    public sparklineOptions:any = { type: 'bar', barWidth: 8, height: '150px', barColor: '#1ab394', negBarColor: '#c6c6c6'};

}
