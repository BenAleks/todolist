import {TaskType} from "./AppWithRedux";
import React, {ChangeEvent, memo, useCallback} from "react";
import ListItem from "@mui/material/ListItem";
import {getListItemSx} from "./Todolist.styles";
import Checkbox from "@mui/material/Checkbox";
import {EditableSpan} from "./EditableSpan";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";

type TaskPropsType = {
    removeTask: (id: string, todolistId: string) => void
    changeTaskStatus: (taskId: string, taskStatus: boolean, todolistId: string) => void
    changeTitleTaskValue: (taskId: string, taskTitle: string, todolistId: string) => void
    todolistId: string
    task: TaskType

}
export const Task = memo((props: TaskPropsType) => {
    const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        props.changeTaskStatus(props.task.id, e.currentTarget.checked, props.todolistId)

    },[props.changeTaskStatus, props.task.id, props.todolistId])
    const changeItemValue = useCallback((taskTitle: string) => {
        props.changeTitleTaskValue(props.task.id, taskTitle, props.todolistId)
    },[props.changeTitleTaskValue, props.task.id, props.todolistId])
    return (
        <ListItem
            key={props.task.id}
            sx={getListItemSx(props.task.isDone)}
        >
            <div>
                <Checkbox checked={props.task.isDone} onChange={onChangeHandler}/>
                <EditableSpan title={props.task.title} changeItemValue={changeItemValue}/>
            </div>
            <DeleteTwoToneIcon onClick={() => props.removeTask(props.task.id, props.todolistId)}/>
        </ListItem>
    )
})