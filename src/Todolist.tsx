import {FilterType, TaskType} from "./App";
import {Button} from "./Button";
import {ChangeEvent, KeyboardEvent, useState} from "react";
import AddItemForm from "./AddItemForm";

type PropsType = {
    title: string
    todolistId:string
    tasks: TaskType[]
    filter: string
    removeTask: (id: string, todolistId:string) => void
    changeFilter: (value: FilterType, todolistId:string) => void
    addTask: (value: string, todolistId:string) => void
    changeTaskStatus: (taskId: string, taskStatus: boolean, todolistId:string) => void
    removeTodolist:(todolistId:string)=>void

}

export const Todolist = ({title, tasks, todolistId, filter,  removeTask ,removeTodolist, changeFilter, addTask, changeTaskStatus}: PropsType) => {

    const [titleData, setTitleData] = useState('')
    const [error, setError] = useState('')
    const inputHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setError('')
        setTitleData(event.currentTarget.value)
    }
    const addTaskHandler = () => {
        if (titleData){
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
    const changeFilterTasksHandler = (filter:FilterType)=>{
        changeFilter(filter, todolistId)
    }

    const addItem = (value: string) =>{
        addTask(value, todolistId)
    }

    return (
        <div className="list">
            <div>
                <h3>{title}</h3>
                <Button title={'x'} onClickHandler={removeTodolistHandler}/>
            </div>
            <AddItemForm addItem={addItem}/>

            {
                tasks.length === 0
                    ? <p>Тасок нет</p>
                    : <ul>
                        {tasks.map((task) => {
                            const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                                changeTaskStatus(task.id, e.currentTarget.checked, todolistId)

                            }
                            return <li key={task.id} className={task.isDone?'is-done':''}>
                                <input type="checkbox" checked={task.isDone}  onChange={onChangeHandler}/>
                                <span>{task.title}</span>
                                <Button title={'x'} onClickHandler={() => removeTask(task.id, todolistId)}/>
                            </li>
                        })}
                    </ul>
            }
            <div>
                <Button title={'All'} activeButtonClass={filter==='all'? 'active-filter':''} onClickHandler={()=>changeFilterTasksHandler('all')}/>
                <Button title={'Active'} activeButtonClass={filter==='active'? 'active-filter':''} onClickHandler={()=>changeFilterTasksHandler('active')}/>
                <Button title={'Completed'} activeButtonClass={filter==='completed'? 'active-filter':''} onClickHandler={()=>changeFilterTasksHandler('completed')}/>
            </div>
        </div>
    )
}
