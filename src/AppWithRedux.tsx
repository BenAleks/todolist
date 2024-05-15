import './App.css';
import {Todolist} from "./Todolist";
import {useCallback, useReducer, useState} from "react";
import AddItemForm from "./AddItemForm";
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
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
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    todolistsReducer
} from "./state/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";

export type TaskType = {
    id: string
    title: string
    isDone: boolean

}
export type TasksStateType = {
    [key: string]: TaskType[]
}
type ThemeMode = 'dark' | 'light'
export type TodolistType = {
    id: string
    title: string
    filter: FilterType
}
export type FilterType = 'all' | 'active' | 'completed'

function AppWithRedux() {

    const dispatch = useDispatch()
    const todolists = useSelector<AppRootStateType, Array<TodolistType> >(state=>state.todolists)
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
    const [themeMode, setThemeMode] = useState<ThemeMode>('light')

    const addTask = useCallback((title: string, todolistId: string) => {
        dispatch(addTaskAC(title, todolistId))
    },[])
    const changeTaskStatus = useCallback((taskId: string, taskStatus: boolean, todolistId: string) => {
        dispatch(changeTaskStatusAC(taskId, taskStatus, todolistId))
    },[])


    const removeTask = useCallback((id: string, todolistId: string) => {
        dispatch(removeTaskAC(id, todolistId))
    },[])

    const changeFilter = useCallback((todolistId: string, filter: FilterType) => {
        dispatch(changeTodolistFilterAC(todolistId, filter))
    },[])

    const removeTodoList = useCallback((todolistId: string) => {
        dispatch(removeTodolistAC(todolistId))
    },[])

    const addTodolist = useCallback((title: string) => {
        const action =  addTodolistAC(title)
        dispatch(action)
    }, [dispatch])
    const changeTitleTaskValue = useCallback((taskId: string, taskTitle: string, todolistId: string) => {
        dispatch(changeTaskTitleAC(taskId, taskTitle, todolistId))
    },[])
    const changeTitleTodolist = useCallback((todolistId: string, title: string) => {
        dispatch(changeTodolistTitleAC(todolistId, title))
    },[])

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
                    <AddItemForm addItem={addTodolist}/>
                </Grid>

                <Grid container spacing={4}>
                    {todolists.map(tl => {
                        let tasksForTodolist = tasks[tl.id]

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

export default AppWithRedux;
