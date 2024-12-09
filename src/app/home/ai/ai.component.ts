import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import {
  ApexNonAxisChartSeries,
  ApexPlotOptions,
  ApexChart,
  ChartComponent,
} from 'ng-apexcharts';
import { WelcomeService } from '../../admin-dashboard/welcome/welcome.service';

type TitleOptions = {
  title: string; // The text to be displayed as the title of the chart.
  position: 'left' | 'center' | 'right'; // The position of the title on the chart ('left', 'center', or 'right').
};

export interface BarChartViewModel {
  series: ApexAxisChartSeries; // Data series to be displayed on the spline chart.
  categories: Array<string>; // Categories for the x-axis of the chart.
  colors: Array<string>; // Colors used for the data series in the chart.
  titleOptions: TitleOptions; // Options for configuring the chart title.
  chartHeight?: number; // (Optional) Height of the chart in pixels.
  showToolbar?: boolean; // (Optional) Flag indicating whether the chart's toolbar should be displayed.
}
@Component({
  selector: 'app-ai',
  templateUrl: './ai.component.html',
  styleUrl: './ai.component.css'
})
export class AiComponent {
  @ViewChild(ChartComponent) chart: ChartComponent | undefined; // Add ViewChild reference

  @Input() isPopupVisible: boolean = false; // Visibility state
  @Output() isPopupVisibleChange: EventEmitter<boolean> = new EventEmitter<boolean>(); // Change event

  options: any = {
  };
  
  welcomeService:WelcomeService;
 
  constructor(welcomeService:WelcomeService){
  
    this.welcomeService = welcomeService;
    this.options = {
      series: [90], // Value for the radial bar
      chart: {
        height: 300,
        type: "radialBar" // Radial bar chart type
      },
      plotOptions: {
        radialBar: {
          hollow: {
            size: "70%", // Hollow size in percentage
            background: "#fff" ,// Background color of the hollow center
            color:"#fff",
           
          },
          track: {
            show: true,
           background: "#fff", // Track circle background color
            strokeWidth: "97%" // Track stroke width
            
          },
 
          dataLabels: {
            show: true,
            name: {
              show: true,
              fontSize: '14px',
              fontFamily: undefined,
              fontWeight: 600,
              color: '#fff',
              offsetY: 20
            },
            value: {
              show: true,
              fontSize: '44px',
              fontFamily: undefined,
              fontWeight: 600,
              color: '#fff',
              offsetY: -20,
              formatter: function(val:number) {
                return val  + '%';
              }
            }
            },
           
        }
      },
      fill : {colors: ['#55e6a5', '#546E7A'],
        
      },

   
      labels: ["Compatible"], // Labels for the radial bar
      colors: ["#55e6a5"], // Color for the radial bar
      title: {
        text: "Compatibality Score" ,// Title text,
        style: {
          fontSize: "14px",
          textAlign:"center",
          color: "#fff"
        }
      },
    };
    
    
  }
 
  jobdescription:string="";


  closePopup() {
    this.isPopupVisible = false;
    this.isPopupVisibleChange.emit(this.isPopupVisible)

  }
  availableSkills=[]
  matchedSkills=[]
  checkCompatibility(){
    this.welcomeService.checkJobDescriptionCompatibility(this.jobdescription).subscribe({
      next:(res:any)=>{
        console.log(res)
        this.options.series=[ parseFloat(res.compatibilityPercentage)]
        this.options.fill={colors: ['#55e6a5'],
        
        }
        
        this.availableSkills= res.availableSkills
        this.matchedSkills= res.matchedSkills
      }
    })
  }
}
