import {FilterType, TaskType} from "./App";
import {Button} from "./Button";
import {ChangeEvent, KeyboardEvent, useState} from "react";

type PropsType = {
	title: string
	tasks: TaskType[]
	removeTask:(id:string)=>void
	changeFilter:(value:FilterType)=>void
	addTask:(value:string)=>void

}

export const Todolist = ({title, tasks, removeTask, changeFilter, addTask}: PropsType) => {

	const [titleData, setTitleData] = useState('')
	const inputHandler = (event:ChangeEvent<HTMLInputElement>) => {
		setTitleData(event.currentTarget.value)
	}
const addTaskHandler = () => {
	addTask(titleData)
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
			{
				tasks.length === 0
					? <p>Тасок нет</p>
					: <ul>
						{tasks.map((task) => {
							return <li key={task.id}><input type="checkbox" checked={task.isDone}/><span>{task.title}</span>
								<Button title={'x'} onClickHandler ={()=>removeTask(task.id)} />
							</li>
						})}
					</ul>
			}
			<div>
				<Button title={'All'} onClickHandler={()=>changeFilter('all')}/>
				<Button title={'Active'} onClickHandler={()=>changeFilter('active')}/>
				<Button title={'Completed'} onClickHandler={()=>changeFilter('completed')}/>
			</div>
		</div>
	)
}
