import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';




@Injectable()

export class DataService {
  users = [];
  payment = [];




  constructor(

  ) {

    this.users = [
      {
        id: 1,
        name: 'Анисимов Н.В.',
        services: [
          {
            id: 1,
            product: 'Хостинг',
            price: 800,

          },
          {
            id: 2,
            product: 'Домен ru',
            price: 200,

          }
        ],
      },

      {
        id: 2,
        name: 'Ким Щ.О.',
        services: [
          {
            id: 3,
            product: 'Хостинг премиум',
            price: 1600,



          },
          {
            id: 4,
            product: 'Домен com',
            price: 600,


          },
          {
            id: 5,
            product: 'Обслуживание на 6 месяцев',
            price: 6000,


          }
        ],
      }
    ]

  }


  getUsers() {
    let storage = JSON.parse(localStorage.getItem('users'));
    if (storage) {
      return storage
    }
    else {
      return this.users;
    }
  }



  setPayment(id, data) {
    this.users.filter(x => x.id == id)[0].services = data;
    console.log(this.users);
    localStorage.setItem('users', JSON.stringify(this.users));
  }

  getPayment() {
    return this.payment;
  }






}
