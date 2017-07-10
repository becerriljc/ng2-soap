import { Component, OnInit } from '@angular/core';
import { SoapService } from './services/soap.services'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'app';

  constructor(private ss: SoapService){}

  ngOnInit(){
    const opc = {
      method : "getDetalleCasoRoboBeacontrack",
      params : [{
        param : "idCasoRobo",
        valor : "8568"
      }]
    }

    let url = 'http://10.190.3.50:8082/WebAppRobos/WebServicesClients?wsdl'

    this.ss.getJSON(url,opc,this.callback).subscribe(resp => {
      console.log(resp['getDetalleCasoRoboBeacontrackResponse'].return)
    })
  }

  callback(resp){
    return resp
  }
}
