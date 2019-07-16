import { Component, OnInit } from '@angular/core';
import { DataService } from '../shared/data.service';
import { Router, ActivatedRoute, ParamMap, NavigationEnd, Params } from '@angular/router';
import { interval } from 'rxjs';
import { FormControl, Validators, FormGroup, FormBuilder} from '@angular/forms';



@Component({
    selector: 'app-form',
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.css']
})

export class FormComponent implements OnInit {
    users = [];
    cart = [];
    fullPrice = 0;
    summResult = 0;
    cell = 0;
    value;
    id;



    formData = new FormGroup({
        firstName: new FormControl('', [Validators.required]),
        lastName: new FormControl('', [Validators.required]),
        email: new FormControl('', Validators.compose([Validators.required, Validators.email])),
        cardname: new FormControl('', [Validators.required]),
        cardnumber: new FormControl('', [Validators.required]),
        expiration: new FormControl('', [Validators.required]),
        cvv: new FormControl('', [Validators.required]),
        summ: new FormControl('', [Validators.required])
    });


    seasons: string[] = ['Дебитная карта', 'Кредитная карта', 'PayPal'];


    constructor(
        private dataService: DataService,
        private activatedRoute: ActivatedRoute,
        public router: Router,
        private fb: FormBuilder) {


        this.id = Number(this.activatedRoute.snapshot.paramMap.get('id'));


        let w8 = interval(100).subscribe(x => {
            this.users = dataService.getUsers();
            this.cart = dataService.getPayment();

            if (this.users) {
                this.users.forEach(serv => {

                    if (serv.id == this.id) {
                        this.cart = serv.services;
                        this.cart.forEach(data => {
                            this.fullPrice += data.price;
                            this.summResult += data.result;
                        });
                    }
                });
                w8.unsubscribe();
            }

        });
    }


    validateAllFormFields(formGroup: FormGroup) {
        Object.keys(formGroup.controls).forEach(field => {
            const control = formGroup.get(field);
            if (control instanceof FormControl) {
                control.markAsTouched({ onlySelf: true });
            } else if (control instanceof FormGroup) {
                this.validateAllFormFields(control);
            }
        });
    }

    onSearchChange(searchValue: number) {
        this.value = searchValue;
    }


    onUsers() {
        this.validateAllFormFields(this.formData);
        if (this.formData.valid) {
            this.router.navigate(['/users']);


        this.cart.forEach(data => {

            if (data.result || data.result == 0) {
                if (data.result > 0) {
                    this.cell = Math.round((this.value / this.summResult) * data.result);
                }
                else {
                    this.cell = Math.round((this.value / this.fullPrice) * data.price);
                }
                data.result = this.cell + data.result;
            }
            else {
                this.cell = Math.round((this.value / this.fullPrice) * data.price);
                data.result = this.cell - data.price;
            }

            console.log(data)
        });
            }


        this.dataService.setPayment(this.id, this.cart);
    }



    ngOnInit() {

    }


}
