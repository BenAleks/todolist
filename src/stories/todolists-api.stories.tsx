import React, { useEffect, useState } from 'react'
import axios from "axios";
import {todolistAPI} from "../api/todolist-api";

export default {
  title: 'API',
}
const settings = {
  withCredentials: true,
  headers:{
    'API-KEY':'edb5eef2-80b8-4748-a0c6-a08543f85a90'
  }
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
  const todolistId = 'a1631708-061f-41a0-abc2-e83826adf040'

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
  const todolistId = '5becf775-aae6-4efe-beee-e06d03c7417d'

  useEffect(() => {
    const todolistId = '5becf775-aae6-4efe-beee-e06d03c7417d'
    todolistAPI.updateTodolist(todolistId, 'SOME NEW TITLE').then(res => {
      setState(res.data)
    })
  }, [])

  return <div>{JSON.stringify(state)}</div>
}