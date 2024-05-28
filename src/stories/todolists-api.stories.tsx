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
    todolistAPI.getTodolists().then(res => {
      setState(res.data)
    })
  }, [])
  return <div>{JSON.stringify(state)}</div>
}

export const CreateTodolist = () => {
  const [state, setState] = useState<any>(null)
  useEffect(() => {
    todolistAPI.createTodolist('newTodolist')
        .then(res => {
          setState(res.data)
        })
  }, [])

  return <div>{JSON.stringify(state)}</div>
}

export const DeleteTodolist = () => {
  const [state, setState] = useState<any>(null)
  const todolistId = 'd822c6c3-d5cb-4025-90e7-840025cd0d7e'

  useEffect(() => {
    todolistAPI.deleteTodolist(todolistId)
        .then(res => {
          setState(res.data)
        })
  }, [])

  return <div>{JSON.stringify(state)}</div>
}

export const UpdateTodolistTitle = () => {
  const [state, setState] = useState<any>(null)

  useEffect(() => {
    const todolistId = '505aca00-1115-46e3-a082-254434c560eb'
    todolistAPI.updateTodolist(todolistId, 'SOME NEW TITLE').then(res => {
      setState(res.data)
    })
  }, [])

  return <div>{JSON.stringify(state)}</div>
}