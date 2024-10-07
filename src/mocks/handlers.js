import { http, HttpResponse } from 'msw';

let nextId = 1;
let todoList = [];

export const handlers = [
    // Create a new todo
    http.post('/api/create', async ({ request }) => {
        const requestBody = await request.json();
        const { todo } = requestBody;
        const newTodo = { id: nextId++, taskName: todo };
        todoList.push(newTodo);
        return HttpResponse.json(newTodo, { status: 201 });
    }),

    // Get all todos
    http.get('/api/todos', () => {
        return HttpResponse.json(todoList, { status: 200 });
    }),

    // Delete a todo by ID
    http.delete('/api/todos/:id', ({ params }) => {
        const { id } = params;
        todoList = todoList.filter(task => task.id !== Number(id));
        return HttpResponse.json(todoList, { status: 200 });
    }),
];
