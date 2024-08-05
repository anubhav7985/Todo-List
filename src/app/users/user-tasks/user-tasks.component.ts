import { Component, computed, DestroyRef, inject, input, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import { ActivatedRoute, ActivatedRouteSnapshot, ResolveFn, RouterLink, RouterOutlet, RouterStateSnapshot } from '@angular/router';

@Component({
  selector: 'app-user-tasks',
  standalone: true,
  imports: [RouterLink, RouterOutlet],
  templateUrl: './user-tasks.component.html',
  styleUrl: './user-tasks.component.css',
})
export class UserTasksComponent{
  userId = input.required<string>();
  private usersService = inject(UsersService)
  private activatedRoute = inject(ActivatedRoute)
  private destroyRef = inject(DestroyRef)

  userName = input.required<string>();
  message = input.required<string>();

  // userName = computed(
  //   () => this.usersService.users.find(u => u.id === this.userId())?.name
  // );
  // ngOnInit(): void {
  //     this.activatedRoute.data.subscribe({
  //       next: data => {
  //         console.log(data)
  //       }
  //     })
  // }

  // ngOnInit(): void {
  //   //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
  //   //Add 'implements OnInit' to the class.
  //   console.log(this.activatedRoute)
  //   console.log(this.message())
  //   const subscription = this.activatedRoute.paramMap.subscribe({
  //     next: (paramMap) => {
  //       this.userName =
  //         this.usersService.users.find(u => u.id === paramMap.get('userId'))
  //           ?.name || '';
  //     },
  //   })
  //   this.destroyRef.onDestroy(() => subscription.unsubscribe())
  // }
}

//automatically loaded when there is any changes
export const resolveUserName: ResolveFn<string> = (activatedRoute: ActivatedRouteSnapshot, routerState: RouterStateSnapshot) => {
  const usersService = inject(UsersService)
  const userName =
    usersService.users.find(u => u.id === activatedRoute.paramMap.get('userId'))
      ?.name || '';
  return userName
};

export const resolveTitle : ResolveFn<string> = (activatedRoute , routerState) => {
  return resolveUserName(activatedRoute,routerState) + '\'s Tasks';
}