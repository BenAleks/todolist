
import {v1} from "uuid";
import {AddTodolistActionType, RemoveTodolistActionType} from "./todolists-reducer";
import {TasksStateType} from "../AppWithRedux";


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

const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType):TasksStateType => {
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
            const stateCopy = state[action.payload.todolistId];
            state[action.payload.todolistId] = stateCopy.map(t => t.id === action.payload.taskId?{...t, isDone: action.payload.isDone}:t)
            return {...state}
        }
        case "CHANGE-TITLE-TASK": {
            const stateCopy = state[action.payload.todolistId];
            state[action.payload.todolistId] = stateCopy.map(t => t.id === action.payload.taskId?{...t, title: action.payload.title}:t)
            return {...state}
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
            return state
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