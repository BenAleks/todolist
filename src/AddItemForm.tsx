import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {Button} from "./Button";


type AddItemFormType = {
    addItem: (value:string) => void
}
const AddItemForm = (props: AddItemFormType) => {

    const [titleData, setTitleData] = useState('')
    const [error, setError] = useState('')
    const inputHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setError('')
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
                <input value={titleData} onChange={inputHandler} onKeyUp={addTaskOnKeyUpHandler}/>
                <Button title={'+'} onClickHandler={addTaskHandler}/>
                <div><span> {error} </span></div>
            </div>
    );
};

export default AddItemForm;