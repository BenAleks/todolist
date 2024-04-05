import './App.css';
import {Todolist} from "./Todolist";
import {useState} from "react";
import { v1 } from 'uuid'

export type TaskType = {
	id: string
	title: string
	isDone: boolean

}
export type TasksStateType = {
	[key: string]: TaskType[]
}

type TodolistType = {
	id: string
	title: string
	filter: FilterType
}
export type FilterType = 'all' | 'active' | 'completed'

function App() {

	let todolistID1 = v1()
	let todolistID2 = v1()
	// const [tasks, setTasks] = useState<TaskType[]>([
	// 	{ id: v1(), title: 'HTML&CSS', isDone: true },
	// 	{ id: v1(), title: 'JS', isDone: true },
	// 	{ id: v1(), title: 'ReactJS', isDone: false },
	// 	{ id: v1(), title: 'Redux', isDone: false },
	// 	{ id: v1(), title: 'Typescript', isDone: false },
	// 	{ id: v1(), title: 'RTK query', isDone: false },
	// ])

	let [todolists, setTodolists] = useState<TodolistType[]>([
		{ id: todolistID1, title: 'What to learn', filter: 'all' },
		{ id: todolistID2, title: 'What to buy', filter: 'all' },
	])

	let [tasks, setTasks] = useState<TasksStateType>({
		[todolistID1]: [
			{ id: v1(), title: 'HTML&CSS', isDone: true },
			{ id: v1(), title: 'JS', isDone: true },
			{ id: v1(), title: 'ReactJS', isDone: false },
		],
		[todolistID2]: [
			{ id: v1(), title: 'Rest API', isDone: true },
			{ id: v1(), title: 'GraphQL', isDone: false },
		],
	})

	const addTask = (title:string, todolistId:string) =>{
		const newTask:TaskType = { id: v1(), title: title, isDone: false }
		setTasks({ ...tasks, [todolistId]: [newTask, ...tasks[todolistId]] })
	}
	const changeTaskStatus  = (taskId:string, taskStatus:boolean, todolistId:string) => {
		setTasks({...tasks, [todolistId]:tasks[todolistId].map(el=>el.id===taskId? { ...el, isDone: taskStatus } : el)})
	}


	const removeTask = (id:string, todolistId:string) => {
		setTasks({ ...tasks, [todolistId]: tasks[todolistId].filter(t => t.id !== id) })
	}

	const changeFilter = (filter: FilterType, todolistId: string) => {
		const newTodolists = todolists.map(tl => {
			return tl.id === todolistId ? { ...tl, filter } : tl
		})
		setTodolists(newTodolists)
	}

	const removeTodoList = (todolistId:string)=>{
		const newTodolists = todolists.filter(tl=>tl.id!=todolistId)
		setTodolists(newTodolists)
		delete tasks[todolistId]
	}


	return (
		<div className="App">
				{todolists.map(tl=>{
					let tasksForTodolist = tasks[tl.id]
					if(tl.filter === 'active'){
						tasksForTodolist = tasksForTodolist.filter((el)=>!el.isDone)
					}
					if(tl.filter === 'completed'){
						tasksForTodolist = tasksForTodolist.filter((el)=>el.isDone)
					}
					return (
						<Todolist key={tl.id}
								  title={tl.title}
								  todolistId={tl.id}
								  addTask={addTask}
								  tasks={tasksForTodolist}
								  removeTask={removeTask}
								  changeFilter={changeFilter}
								  changeTaskStatus ={changeTaskStatus}
								  filter={tl.filter}
								  removeTodolist={removeTodoList}
						/>
					)
				})}
		</div>
	);
}

export default App;
