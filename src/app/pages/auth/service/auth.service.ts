import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable, catchError} from 'rxjs';
import { httpHandleError } from '../../../Errors/http.errorHandler';
import { environment } from '../../../../environments/environment.development';
import { HmacSHA256 } from 'crypto-js';
import { Encrypt, Compare } from '../../../utils/encrypt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = environment.API_URL + '/auth';

  constructor(
    private readonly _httClient: HttpClient
    ) {}
  login(formValue: any): Observable<any> {
    return this._httClient.post(this.baseUrl + '/login', formValue).pipe(catchError(httpHandleError));
  }

    //Firmar Datos
    public firmarDatos(userData: any): string{
      const firma = Encrypt(userData);
      return firma;
    }

      //Validar Firma
  public validarFirma(userData: string, firma: string): boolean {
    return Compare(userData, firma);
  }

}
