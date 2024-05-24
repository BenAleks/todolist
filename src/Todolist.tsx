import React, {ChangeEvent, KeyboardEvent, useCallback, useState} from "react";
import {EditableSpan} from "./EditableSpan";
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import Button from '@mui/material/Button';
import List from '@mui/material/List'
import {filterButtonsContainerSx} from './Todolist.styles'
import {Box} from "@mui/material";
import {FilterType, TaskType} from "./AppWithRedux";
import {Task} from "./Task";
import {AddItemForm} from "./AddItemForm";


type PropsType = {
    title: string
    todolistId: string
    tasks: TaskType[]
    filter: string
    changeFilter: (todolistId: string, value: FilterType) => void
    addTask: (value: string, todolistId: string) => void
    removeTask: (id: string, todolistId: string) => void
    changeTaskStatus: (taskId: string, taskStatus: boolean, todolistId: string) => void
    changeTitleTaskValue: (taskId: string, taskTitle: string, todolistId: string) => void
    changeTitleTodolist: (todolistTitle: string, todolistId: string) => void
    removeTodolist: (todolistId: string) => void

}

export const Todolist = React.memo(({
                             title,
                             changeTitleTaskValue,
                             changeTitleTodolist,
                             tasks,
                             todolistId,
                             filter,
                             removeTask,
                             removeTodolist,
                             changeFilter,
                             addTask,
                             changeTaskStatus
                         }: PropsType) => {

    const [titleData, setTitleData] = useState('')
    const [error, setError] = useState('')
    console.log("Todolist called")

    const inputHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setError('')
        setTitleData(event.currentTarget.value)
    }
    const addTaskHandler = () => {
        if (titleData) {
            addTask(titleData.trim(), todolistId)
        } else {
            setError("value is empty")
        }
        setTitleData('')
    }

    const removeTodolistHandler = () => {
        removeTodolist(todolistId)
    }

    const addTaskOnKeyUpHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            addTaskHandler()
        }
    }
    const changeFilterTasksHandler = useCallback((filter: FilterType) => {
        changeFilter(todolistId, filter)
    }, [changeFilter, todolistId])
    const changeTitleTodolistHandler = useCallback((title: string) => {
        changeTitleTodolist(todolistId, title)
    }, [changeTitleTodolist, todolistId])

    const addItem = useCallback((value: string) => {
        addTask(value, todolistId)
    },[addTask, todolistId])

    let tasksForTodolist = tasks
    if (filter === 'active') {
        tasksForTodolist = tasks.filter((el) => !el.isDone)
    }
    if (filter === 'completed') {
        tasksForTodolist = tasks.filter((el) => el.isDone)
    }
    return (
        <div className="list">
            <div className={"todolist-title-container"}>
                <h3><EditableSpan title={title} changeItemValue={changeTitleTodolistHandler}/></h3>
                <DeleteTwoToneIcon onClick={removeTodolistHandler}/>

            </div>
            <AddItemForm addItem={addItem}/>

            {
                tasks.length === 0
                    ? <p>Тасок нет</p>
                    : <List>
                        {tasksForTodolist.map((task) =>
                            <Task
                                changeTaskTitle={changeTitleTaskValue}
                                task={task}
                                removeTask={removeTask}
                                changeTaskStatus={changeTaskStatus}
                                todolistId={todolistId}

                            />)}
                    </List>
            }

            <Box sx={filterButtonsContainerSx}>
                <Button variant={filter === 'all' ? "contained" : "outlined"}
                        onClick={() => changeFilterTasksHandler('all')}>all</Button>
                <Button variant={filter === 'active' ? "contained" : "outlined"}
                        onClick={() => changeFilterTasksHandler('active')}>active</Button>
                <Button variant={filter === 'completed' ? "contained" : "outlined"}
                        onClick={() => changeFilterTasksHandler('completed')}>completed</Button>
            </Box>

        </div>
    )
})

