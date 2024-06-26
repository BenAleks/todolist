import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        // Не забываем заменить API-KEY на собственный
        'API-KEY': 'edb5eef2-80b8-4748-a0c6-a08543f85a90',
    },
})


export const todolistAPI = {
    updateTodolist(todolistId: string, title: string) {
        return instance.put<ResponseType>(`todo-lists/${todolistId}`,{ title: title })
    },

    getTodolists() {
        return instance.get<TodolistType[]>('todo-lists')
    },

    createTodolist(title:string) {
        return instance.post<ResponseType<{item:TodolistType}>>('todo-lists',{ title })
    },

    deleteTodolist(todolistId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todolistId}`)
    }
}


type TodolistType = {
    id: string
    addedDate: string
    order: number
    title: string
}



type FieldErrorType = {
    error: string
    field: string
}
type ResponseType<D = {}> = {
    resultCode: number
    messages: string[]
    fieldsErrors: FieldErrorType[]
    data: D
}