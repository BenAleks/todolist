import './App.css';
import {Todolist} from "./Todolist";
import {useState} from "react";
import { v1 } from 'uuid'

export type TaskType = {
	id: string
	title: string
	isDone: boolean

}
export type FilterType = 'all' | 'active' | 'completed'

function App() {
	const tasks1: Array<TaskType> = [
		{ id: v1(), title: 'HTML&CSS', isDone: true },
		{ id: v1(), title: 'JS', isDone: true },
		{ id: v1(), title: 'ReactJS', isDone: false },
		{ id: v1(), title: 'Redux', isDone: false },
		{ id: v1(), title: 'Typescript', isDone: false },
		{ id: v1(), title: 'RTK query', isDone: false },
	]

	const [tasks, setTasks] = useState(tasks1)


	const addTask = (value:string) =>{
		const newTask:TaskType = { id: v1(), title: value, isDone: false }
		const newTasks = [newTask, ...tasks]
		setTasks(newTasks)
	}
	const removeTask = (id:string) => {
		const filteredTasks=tasks.filter((el)=>el.id!== id)
		setTasks(filteredTasks)
	}

	let taskForTodolist = tasks
	const [filter, setFilter] = useState('all')
	if(filter === 'active'){
		taskForTodolist = tasks.filter((el)=>!el.isDone)
	}
	if(filter === 'completed'){
		taskForTodolist = tasks.filter((el)=>el.isDone)
	}
	const changeFilter = (filter:FilterType)=>{
		setFilter(filter)
	}



	return (
		<div className="App">
			<Todolist title="What to learn"
					  addTask={addTask}
					  tasks={taskForTodolist}
					  removeTask={removeTask}
					  changeFilter={changeFilter}/>
		</div>
	);
}

export default App;
