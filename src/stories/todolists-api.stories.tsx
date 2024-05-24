import React, { useEffect, useState } from 'react'
import axios from "axios";
import {todolistAPI} from "../api/todolist-api";

export default {
  title: 'API',
}
const settings = {
  withCredentials: true,
}

export const GetTodolists = () => {
  const [state, setState] = useState<any>(null)
  useEffect(() => {
    axios.get('https://social-network.samuraijs.com/api/1.1/todo-lists', settings).then(res => {
      setState(res.data)
    })
  }, [])
  return <div>{JSON.stringify(state)}</div>
}

export const CreateTodolist = () => {
  const [state, setState] = useState<any>(null)
  useEffect(() => {
    axios
        .post(
            'https://social-network.samuraijs.com/api/1.1/todo-lists',
            { title: 'newTodolist1' },
            settings
        )
        .then(res => {
          setState(res.data)
        })
  }, [])

  return <div>{JSON.stringify(state)}</div>
}

export const DeleteTodolist = () => {
  const [state, setState] = useState<any>(null)
  const todolistId = 'c750e0b8-a103-431c-9873-f86ecaa03fd3'

  useEffect(() => {
    axios
        .delete(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}`, settings)
        .then(res => {
          setState(res.data)
        })
  }, [])

  return <div>{JSON.stringify(state)}</div>
}

export const UpdateTodolistTitle = () => {
  const [state, setState] = useState<any>(null)
  const todolistId = '5a6e4e35-f5d0-4587-a8e5-52d6f24d0d17'

  useEffect(() => {
    const todolistId = 'd6e91e44-5933-4765-877a-bee86a7a2cc0'
    todolistAPI.updateTodolist(todolistId, 'SOME NEW TITLE').then(res => {
      setState(res.data)
    })
  }, [])

  return <div>{JSON.stringify(state)}</div>
}