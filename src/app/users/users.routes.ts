import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot, Routes } from "@angular/router";
import { canLeaveEditPage, NewTaskComponent } from "../tasks/new-task/new-task.component";
import { Task } from "../tasks/task/task.model";
import { inject } from "@angular/core";
import { TasksService } from "../tasks/tasks.service";

export const resolveUserTasks: ResolveFn<Task[]> = (
    activatedRouteSnapshot: ActivatedRouteSnapshot,
    routerState: RouterStateSnapshot
) => {
    const order = activatedRouteSnapshot.queryParams['order'];
    const tasksService = inject(TasksService)
    const tasks = tasksService.allTasks().filter((task) => task.userId === activatedRouteSnapshot.paramMap.get('userId'))

    if (order && order === 'asc') {
        tasks.sort((a, b) => a.id > b.id ? 1 : -1);
    } else {
        tasks.sort((a, b) => a.id > b.id ? -1 : 1);
    }

    return tasks.length ? tasks : [];
}

export const routes: Routes = [
    {
        path: '',
        providers: [TasksService],
        children: [
            {
                path: '',
                redirectTo: 'tasks',
                pathMatch: 'full'
            },
            {
                path: 'tasks',
                // lazy loaded component
                loadComponent: () =>
                    import('../tasks/tasks.component').then(mod => mod.TasksComponent),
                runGuardsAndResolvers: 'always',
                resolve: {
                    userTasks: resolveUserTasks
                }
            },
            {
                path: 'tasks/new',
                component: NewTaskComponent,
                canDeactivate: [canLeaveEditPage]
            }
        ]
    }
]