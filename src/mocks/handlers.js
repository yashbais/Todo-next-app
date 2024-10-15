import { http, HttpResponse } from 'msw';

let nextId = 1;
let todoList = [];

export const handlers = [
    // Create a new task
    http.post('/tasks', async ({ request }) => {
        const requestBody = await request.json();
        const { taskName } = requestBody;
        const newTask = { id: nextId++, taskName };
        todoList.push(newTask);
        return HttpResponse.json(newTask, { status: 201 });
    }),

    // Get all tasks
    http.get('/tasks', ({ request }) => {
        const url = new URL(request.url);
        const page = Number(url.searchParams.get('page')) || 1;
        const limit = Number(url.searchParams.get('limit')) || 5;
        const sortBy = url.searchParams.get('sortBy') || '';
        const sortOrder = url.searchParams.get('sortOrder') || 'asc'; // default to ascending
        const totalItems = todoList.length;
    
        // Paginate the tasks
        let paginatedTasks = todoList.slice((page - 1) * limit, page * limit);
    
        // Sort by 'taskName' if requested
        if (sortBy === 'taskName') {
            paginatedTasks = paginatedTasks.sort((a, b) => {
                const result = a.taskName.localeCompare(b.taskName);
                return sortOrder === 'asc' ? result : -result;
            });
        }
    
        return HttpResponse.json({
            tasks: paginatedTasks,
            totalItems,
            totalPages: Math.ceil(totalItems / limit),
            currentPage: page
        }, { status: 200 });
    }),
    


    // Get a specific task by ID
    http.get('/tasks/:id', ({ params }) => {
        const { id } = params;
        const task = todoList.find(task => task.id === Number(id));
        if (task) {
            return HttpResponse.json(task, { status: 200 });
        }
        return HttpResponse.json({ error: 'Task not found' }, { status: 404 });
    }),

    // Update a task by ID
    http.put('/tasks/:id', async ({ params, request }) => {
        const { id } = params;
        const requestBody = await request.json();
        const { taskName } = requestBody;
        const taskIndex = todoList.findIndex(task => task.id === Number(id));

        if (taskIndex > -1) {
            todoList[taskIndex].taskName = taskName;
            return HttpResponse.json(todoList[taskIndex], { status: 200 });
        }
        return HttpResponse.json({ error: 'Task not found' }, { status: 404 });
    }),

    // Delete a task by ID
    http.delete('/tasks/:id', ({ params }) => {
        const { id } = params;
        const taskIndex = todoList.findIndex(task => task.id === Number(id));

        if (taskIndex > -1) {
            todoList.splice(taskIndex, 1);
            return HttpResponse.json({ message: 'Task deleted' }, { status: 200 });
        }
        return HttpResponse.json({ error: 'Task not found' }, { status: 404 });
    }),
];
