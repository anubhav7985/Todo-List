import { Component, computed, DestroyRef, inject, input, signal } from '@angular/core';

import { TaskComponent } from './task/task.component';
import { TasksService } from './tasks.service';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-tasks',
  standalone: true,
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
  imports: [TaskComponent, RouterLink],
})
export class TasksComponent {
  userId = input.required<string>();
  private tasksService = inject(TasksService)
  private destroyRef = inject(DestroyRef)

  order = signal<'asc'|'desc'>('desc');
  userTasks = computed(() => 
    this.tasksService
  .allTasks()
  .filter((task) => task.userId === this.userId())
  .sort((a,b) => {
    if(this.order() === 'desc') {
      return a.id > b.id ? -1: 1;
    } else {
      return a.id > b.id ? 1 : -1;
    }
  })
  );

  private activatedRoute = inject(ActivatedRoute);

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    const subscription = this.activatedRoute.queryParams.subscribe({
      next: params => this.order.set(params['order']),
    })
    this.destroyRef.onDestroy(() => subscription.unsubscribe())
    
  }
}

