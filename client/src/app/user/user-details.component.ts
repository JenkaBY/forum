import { Component, OnInit, Inject, Input } from '@angular/core';
import { User } from '../model/user';
import { ActivatedRoute, ParamMap } from '@angular/router';
import IUserService from '../service/interface/iuser.service';
import 'rxjs/add/operator/switchMap';

@Component({
    selector: 'app-user-details',
    templateUrl: './user-details.component.html'
})

export class UserDetailsComponent implements OnInit {
    @Input() user: User;
    dateFormat = 'yyyy/MM/dd HH:mm';

    constructor(@Inject('userService') private userService: IUserService,
                private route: ActivatedRoute) {
    }

    save(): void {
        this.userService.update(this.user)
            .then(user => this.user = user);
    }

    ngOnInit(): void {
        this.route.paramMap
            .switchMap((params: ParamMap) => this.userService.getById(+params.get('id')))
            .subscribe(user => this.user = user);
    }
}
