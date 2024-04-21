import {FilterType, TaskType} from "./App";
import {ChangeEvent, KeyboardEvent, useState} from "react";
import AddItemForm from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import {filterButtonsContainerSx, getListItemSx} from './Todolist.styles'
import {Box} from "@mui/material";


type PropsType = {
    title: string
    todolistId: string
    tasks: TaskType[]
    filter: string
    removeTask: (id: string, todolistId: string) => void
    changeFilter: (value: FilterType, todolistId: string) => void
    addTask: (value: string, todolistId: string) => void
    changeTaskStatus: (taskId: string, taskStatus: boolean, todolistId: string) => void
    changeTitleTaskValue: (taskId: string, taskTitle: string, todolistId: string) => void
    changeTitleTodolist: (todolistTitle: string, todolistId: string) => void
    removeTodolist: (todolistId: string) => void

}

export const Todolist = ({
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
    const changeFilterTasksHandler = (filter: FilterType) => {
        changeFilter(filter, todolistId)
    }
    const changeTitleTodolistHandler = (title: string) => {
        changeTitleTodolist(title, todolistId)
    }

    const addItem = (value: string) => {
        addTask(value, todolistId)
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
                        {tasks.map((task) => {
                            const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                                changeTaskStatus(task.id, e.currentTarget.checked, todolistId)

                            }
                            const changeItemValue = (taskTitle: string) => {
                                changeTitleTaskValue(task.id, taskTitle, todolistId)
                            }
                            return (
                                <ListItem
                                    key={task.id}
                                    sx={getListItemSx(task.isDone)}
                                >
                                    <div>
                                        <Checkbox checked={task.isDone} onChange={onChangeHandler}/>
                                        <EditableSpan title={task.title} changeItemValue={changeItemValue}/>
                                    </div>
                                    <DeleteTwoToneIcon onClick={() => removeTask(task.id, todolistId)}/>
                                </ListItem>
                            )
                        })}
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
}
