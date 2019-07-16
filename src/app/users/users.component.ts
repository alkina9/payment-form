import { Component, OnInit } from '@angular/core';
import { DataService } from '../shared/data.service';
import { Router, ActivatedRoute, ParamMap, NavigationEnd, Params} from '@angular/router';
import { interval } from 'rxjs';




@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
users = [];
id;
payment = [];



  constructor(private dataService: DataService,
      private activatedRoute: ActivatedRoute,
       public router: Router) {


    this.id = Number(this.activatedRoute.snapshot.paramMap.get('id'));

     this.users = dataService.getUsers();



}

  ngOnInit() {
  }

}
