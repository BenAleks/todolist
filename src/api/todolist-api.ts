import axios from 'axios'

const settings = {
    withCredentials: true,
    headers:{
        'API-KEY':'edb5eef2-80b8-4748-a0c6-a08543f85a90'
    }
}

export const todolistAPI = {
    updateTodolist(todolistId: string, title: string) {
        const promise = axios.put(
            `https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}`,
            { title: title },
            settings
        )
        return promise
    },
}