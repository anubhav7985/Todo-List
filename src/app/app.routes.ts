import { CanMatchFn, RedirectCommand, Router, Routes } from "@angular/router";

import { NoTaskComponent } from "./tasks/no-task/no-task.component";
import { resolveTitle, resolveUserName, UserTasksComponent } from "./users/user-tasks/user-tasks.component";
import { routes as UsersRoutes } from "./users/users.routes";
import { inject } from "@angular/core";

const dummyCanMatch: CanMatchFn = (route, segments) => {
    const router = inject(Router)
    const shouldGetAccess = Math.random()
    if (shouldGetAccess < 1) {
        return true;
    }
    return new RedirectCommand(router.parseUrl('/unauthorized'));
}

export const routes: Routes = [
    {
        path: '', // <your-domain>/
        redirectTo: '/users/u1',
        pathMatch: 'full',
        title: 'No tasks Selected'
    },
    {
        path: 'users/:userId', // <your-domain>/users/<u1>
        component: UserTasksComponent,
        loadChildren: () => import('./users/users.routes').then(mod => mod.routes),
        canMatch: [dummyCanMatch],
        data: {
            message: 'Hello',
        },
        resolve: {
            userName: resolveUserName
        },
        title: resolveTitle
    },
    {
        path: '**',
        component: NoTaskComponent
    }
];

