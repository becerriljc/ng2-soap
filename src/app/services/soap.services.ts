import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Rx'

import { Opciones } from '../interfaces/opciones.soap'

import * as X2JS  from 'x2js'

@Injectable()
export class SoapService {

  constructor() { }

    public getJSON(url:string, opciones : Opciones, callback?){
        return Observable.fromPromise(new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest()
            xhr.open('POST', url, true)
            xhr.onreadystatechange = () => {
                if(xhr.readyState == 4){
                    if(xhr.status == 200){
                        let strXML = new XMLSerializer().serializeToString(xhr.responseXML)
                        let json = new X2JS().xml2js(strXML)
                        if(callback)
                            resolve(callback(json['Envelope'].Body)) 
                        else
                            resolve(json['Envelope'].Body) 
                    }else{
                        reject('El error es: ' + xhr.status)
                    }
                }
            }
            xhr.setRequestHeader('Content-Type','text/xml')
            xhr.responseType = "document";
            xhr.send(this.getBody(opciones))
        })) 
    }

    private getBody(opc : Opciones){
        let method = opc.method
        let params = opc.params
        let cli = opc.cli ? opc.cli : "http://clients.ws.encontrack.com/"

        let body = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" '+
            'xmlns:cli="'+cli+'"><soapenv:Header/><soapenv:Body><cli:'+method+'>'
        let tmp = ''
        for(let elem of params){
            tmp = tmp + '<'+ elem.param + '>' + elem.valor + '</' + elem.param + '>'
        }
        
        body = body + tmp + '</cli:'+method+'></soapenv:Body></soapenv:Envelope>'

        return body
    }

}
