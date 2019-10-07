import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})

export class SweetAlertService {

  constructor() { }

  confirm(message: string, taskmessage: string, okCallback: () => any) {
    Swal.fire({
      title: 'Are you sure?',
      text: message,
      type: 'warning',
      showCancelButton: true,
      confirmButtonClass: 'btn btn-success',
      cancelButtonClass: 'btn btn-danger',
      confirmButtonText: 'Yes ' + taskmessage,
       buttonsStyling: false
      }).then((result) => {
      if (result.value) {
        Swal.fire(
          {
            title: 'Completed',
            text: taskmessage,
            type: 'success',
            confirmButtonClass: 'btn btn-success',
            buttonsStyling: false
          }
        )
        okCallback();
      }
    })
  }

  success(message: string) {
    Swal.fire({
      title: 'Good job!',
      text: message,
      buttonsStyling: false,
      confirmButtonClass: 'btn btn-success',
      type: 'success'
    })
  }

  error(message: string) {
    Swal.fire({
      title: 'Oops...',
      text: message,
      buttonsStyling: false,
      confirmButtonClass: 'btn btn-danger',
      type: 'error'
    })
  }

  warning(message: string) {
    Swal.fire({
      title: message,
      type: 'warning',
      buttonsStyling: false,
      confirmButtonClass: 'btn btn-success'
    })
  }

  message(message: string) {
    Swal.fire({
      title: message,
      type: 'info',
      buttonsStyling: false,
      confirmButtonClass: 'btn btn-success'
    })
  }

}
