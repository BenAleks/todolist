import {TasksStateType} from '../App'
import {v1} from "uuid";
import {AddTodolistActionType, RemoveTodolistActionType} from "./todolists-reducer";


export type RemoveTaskActionType = {
    type: 'REMOVE-TASK'
    payload: {
        taskId: string
        todolistId:string
    }
}
export type AddTaskActionType = {
    type: 'ADD-TASK'
    payload: {
        title: string
        todolistId:string
    }
}
export type ChangeTaskStatusActionType = {
    type: 'CHANGE-STATUS-TASK'
    payload: {
        taskId: string
        isDone: boolean
        todolistId:string
    }
}
export type ChangeTaskTitleActionType = {
    type: 'CHANGE-TITLE-TASK'
    payload: {
        taskId: string
        title: string
        todolistId:string
    }
}



type ActionsType =
    RemoveTaskActionType | AddTaskActionType | ChangeTaskStatusActionType | ChangeTaskTitleActionType | AddTodolistActionType
|RemoveTodolistActionType



export const tasksReducer = (state: TasksStateType, action: ActionsType):TasksStateType => {
    switch (action.type) {
        case "REMOVE-TASK": {
            const stateCopy = {...state};
            const tasks = stateCopy[action.payload.todolistId]
            stateCopy[action.payload.todolistId] = tasks.filter(t => t.id !== action.payload.taskId)
            return stateCopy
        }
        case "ADD-TASK": {
            const stateCopy = {...state};
            const tasks = stateCopy[action.payload.todolistId]
            const newTasks = [{id:v1(), title: action.payload.title, isDone:false}, ...tasks]
            stateCopy[action.payload.todolistId] = newTasks
            return stateCopy
        }
        case "CHANGE-STATUS-TASK": {
            const stateCopy = {...state};
            const tasks = stateCopy[action.payload.todolistId]
            tasks.map(t => t.id === action.payload.taskId?(t.isDone= action.payload.isDone):t)
            stateCopy[action.payload.todolistId] = tasks
            return stateCopy
        }
        case "CHANGE-TITLE-TASK": {
            const stateCopy = {...state};
            const tasks = stateCopy[action.payload.todolistId]
            tasks.map(t => t.id === action.payload.taskId?(t.title= action.payload.title):t)
            stateCopy[action.payload.todolistId] = tasks
            return stateCopy
        }
        case "ADD-TODOLIST":{
            const stateCopy = {...state};
            stateCopy[action.payload.todolistId]=[]
            return stateCopy
        }
        case "REMOVE-TODOLIST": {
            const stateCopy = {...state};
            delete stateCopy[action.payload.id]
            return stateCopy
        }

        default:
            throw new Error("I don't understand this type")
    }
}

export const removeTaskAC = (taskId:string, todolistId: string): RemoveTaskActionType => {
    return { type: 'REMOVE-TASK', payload: { taskId: taskId, todolistId: todolistId } } as const
}

export const addTaskAC = (title:string, todolistId: string): AddTaskActionType => {
    return { type: 'ADD-TASK', payload: { title: title, todolistId: todolistId } } as const
}

export const changeTaskStatusAC = (taskId:string, isDone: boolean, todolistId: string): ChangeTaskStatusActionType => {
    return { type: 'CHANGE-STATUS-TASK', payload: { taskId: taskId, isDone: isDone, todolistId: todolistId } } as const
}

export const changeTaskTitleAC = (taskId:string, title: string, todolistId: string): ChangeTaskTitleActionType => {
    return { type: 'CHANGE-TITLE-TASK', payload: { taskId: taskId, title: title, todolistId: todolistId } } as const
}