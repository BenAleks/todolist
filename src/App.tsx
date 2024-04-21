import './App.css';
import {Todolist} from "./Todolist";
import {useState} from "react";
import {v1} from 'uuid'
import AddItemForm from "./AddItemForm";
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import Container from '@mui/material/Container'
//❗С релизом новой версии import Grid скорее всего изменится (см. документацию)
import Grid from '@mui/material/Unstable_Grid2'
import Paper from '@mui/material/Paper'
import {MenuButton} from "./MenuButton";
import { createTheme, ThemeProvider } from '@mui/material/styles'
import Switch from '@mui/material/Switch'
import CssBaseline from '@mui/material/CssBaseline'

export type TaskType = {
    id: string
    title: string
    isDone: boolean

}
export type TasksStateType = {
    [key: string]: TaskType[]
}
type ThemeMode = 'dark' | 'light'
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

        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])

    let [tasks, setTasks] = useState<TasksStateType>({
        [todolistID1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},
        ],
        [todolistID2]: [
            {id: v1(), title: 'Rest API', isDone: true},
            {id: v1(), title: 'GraphQL', isDone: false},
        ],
    })

    const [themeMode, setThemeMode] = useState<ThemeMode>('light')

    const addTask = (title: string, todolistId: string) => {
        const newTask: TaskType = {id: v1(), title: title, isDone: false}
        setTasks({...tasks, [todolistId]: [newTask, ...tasks[todolistId]]})
    }
    const changeTaskStatus = (taskId: string, taskStatus: boolean, todolistId: string) => {
        setTasks({
            ...tasks,
            [todolistId]: tasks[todolistId].map(el => el.id === taskId ? {...el, isDone: taskStatus} : el)
        })
    }


    const removeTask = (id: string, todolistId: string) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].filter(t => t.id !== id)})
    }

    const changeFilter = (filter: FilterType, todolistId: string) => {
        const newTodolists = todolists.map(tl => {
            return tl.id === todolistId ? {...tl, filter} : tl
        })
        setTodolists(newTodolists)
    }

    const removeTodoList = (todolistId: string) => {
        const newTodolists = todolists.filter(tl => tl.id != todolistId)
        setTodolists(newTodolists)
        delete tasks[todolistId]
    }

    const addNewItem = (title: string) => {
        const newItem: TodolistType = {
            id: v1(),
            title: title,
            filter: 'all'
        }
        setTodolists([newItem, ...todolists])
        debugger
        setTasks({[newItem.id]: [], ...tasks})
    }
    const changeTitleTaskValue = (taskId: string, taskTitle: string, todolistId: string) => {
        setTasks({
            ...tasks,
            [todolistId]: tasks[todolistId].filter(el => taskId === el.id ? el.title = taskTitle : el)
        })
    }
    const changeTitleTodolist = (title: string, todolistId: string) => {
        setTodolists(todolists.map((t) => t.id === todolistId ? {...t, title} : t))
    }

    const theme = createTheme({
        palette: {
            mode: themeMode === 'light' ? 'light' : 'dark',
            primary: {
                main: '#087EA4',
            },
        },
    })
    const changeModeHandler = () => {
        setThemeMode(themeMode == 'light' ? 'dark' : 'light')
    }


    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <AppBar  position="static" sx={{ mb: '30px' }}>
                <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }} >
                    <IconButton color="inherit">
                        <MenuIcon/>
                    </IconButton>
                    <div>
                        <MenuButton>Login</MenuButton>
                        <MenuButton>Logout</MenuButton>
                        <MenuButton background={theme.palette.primary.dark}>Faq</MenuButton>
                        <Switch color={'default'} onChange={changeModeHandler} />
                    </div>

                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container sx={{ mb: '30px' }}>
                    <AddItemForm addItem={addNewItem}/>
                </Grid>

                <Grid container spacing={4}>
                    {todolists.map(tl => {
                        let tasksForTodolist = tasks[tl.id]
                        if (tl.filter === 'active') {
                            tasksForTodolist = tasksForTodolist.filter((el) => !el.isDone)
                        }
                        if (tl.filter === 'completed') {
                            tasksForTodolist = tasksForTodolist.filter((el) => el.isDone)
                        }
                        return (
                            <Grid>
                                <Paper elevation={6} sx={{ p: '0 20px 20px 20px' }}>
                                    <Todolist key={tl.id}
                                              title={tl.title}
                                              todolistId={tl.id}
                                              addTask={addTask}
                                              tasks={tasksForTodolist}
                                              removeTask={removeTask}
                                              changeFilter={changeFilter}
                                              changeTaskStatus={changeTaskStatus}
                                              changeTitleTaskValue={changeTitleTaskValue}
                                              changeTitleTodolist={changeTitleTodolist}
                                              filter={tl.filter}
                                              removeTodolist={removeTodoList}
                                    />
                                </Paper>
                            </Grid>
                        )
                    })}
                </Grid>
            </Container>
        </ThemeProvider>
    );
}

export default App;
