import {FilterType, TaskType} from "./App";
import {Button} from "./Button";
import {ChangeEvent, KeyboardEvent, useState} from "react";

type PropsType = {
    title: string
    tasks: TaskType[]
    filter: string
    removeTask: (id: string) => void
    changeFilter: (value: FilterType) => void
    addTask: (value: string) => void
    changeTaskStatus: (taskId: string, taskStatus: boolean) => void

}

export const Todolist = ({title, tasks, filter,  removeTask, changeFilter, addTask, changeTaskStatus}: PropsType) => {

    const [titleData, setTitleData] = useState('')
    const [error, setError] = useState('')
    const inputHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setError('')
        setTitleData(event.currentTarget.value)
    }
    const addTaskHandler = () => {
        if (titleData){
            addTask(titleData.trim())
        } else {
            setError("value is empty")
        }
        setTitleData('')
    }

    const addTaskOnKeyUpHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            addTaskHandler()
        }
    }

    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input value={titleData} onChange={inputHandler} onKeyUp={addTaskOnKeyUpHandler}/>
                <Button title={'+'} onClickHandler={addTaskHandler}/>
            </div>
            <div><span>
                {error}
            </span></div>
            {
                tasks.length === 0
                    ? <p>Тасок нет</p>
                    : <ul>
                        {tasks.map((task) => {
                            const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                                changeTaskStatus(task.id, e.currentTarget.checked)

                            }
                            return <li key={task.id} className={task.isDone?'is-done':''}>
                                <input type="checkbox" checked={task.isDone}  onChange={onChangeHandler}/>
                                <span>{task.title}</span>
                                <Button title={'x'} onClickHandler={() => removeTask(task.id)}/>
                            </li>
                        })}
                    </ul>
            }
            <div>
                <Button title={'All'} activeButtonClass={filter==='all'? 'active-filter':''} onClickHandler={() => changeFilter('all')}/>
                <Button title={'Active'} activeButtonClass={filter==='active'? 'active-filter':''} onClickHandler={() => changeFilter('active')}/>
                <Button title={'Completed'} activeButtonClass={filter==='completed'? 'active-filter':''} onClickHandler={() => changeFilter('completed')}/>
            </div>
        </div>
    )
}
