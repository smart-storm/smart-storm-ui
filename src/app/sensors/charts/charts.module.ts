import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";

import { ChartsComponent } from "./charts.component";

// Chart.js Angular 2 Directive by Valor Software (npm)
import { ChartsModule as ChartMod } from 'ng2-charts/ng2-charts';

import { FlotModule } from '../../inspinia/components/charts/flotChart';
import { IboxtoolsModule } from '../../inspinia/components/common/iboxtools/iboxtools.module';
import { PeityModule } from '../../inspinia/components/charts/peity';
import { SparklineModule } from '../../inspinia/components/charts/sparkline';
import { JVectorMapModule } from '../../inspinia/components/map/jvectorMap';
import { AdvGrowlModule } from 'primeng-advanced-growl';


@NgModule({
    declarations:[ChartsComponent],
    imports     :[
        BrowserModule,
        ChartMod,
        FlotModule,
        IboxtoolsModule,
        PeityModule,
        SparklineModule,
        JVectorMapModule,
        AdvGrowlModule
    ],
    exports     : [ChartsComponent],
})

export class ChartsModule {}
