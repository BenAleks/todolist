import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import TextField from '@mui/material/TextField';
import AddBoxIcon from '@mui/icons-material/AddBox'
import IconButton from '@mui/material/IconButton'


type AddItemFormType = {
    addItem: (value:string) => void
}

export const AddItemForm = React.memo((props: AddItemFormType) => {
console.log("AddItemForm")
    const [titleData, setTitleData] = useState('')
    const [error, setError] = useState('')
    const inputHandler = (event: ChangeEvent<HTMLInputElement>) => {
    if (error !== null){
        setError('')
    }
        setTitleData(event.currentTarget.value)
    }

    const addTaskOnKeyUpHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            addTaskHandler()
        }
    }

    const addTaskHandler = () => {
        if (titleData){
            props.addItem(titleData.trim())
        } else {
            setError("value is empty")
        }
        setTitleData('')
    }

    return (
            <div>
                <TextField
                    label="Enter a title"
                    variant={'outlined'}
                    className={error ? 'error' : ''}
                    value={titleData}
                    size={'small'}
                    error={!!error}
                    helperText={error}
                    onChange={inputHandler}
                    onKeyUp={addTaskOnKeyUpHandler}
                />
                <IconButton onClick={addTaskHandler} color={'primary'}>
                    <AddBoxIcon />
                </IconButton>
            </div>
    );
});

