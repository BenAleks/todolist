import React, {ChangeEvent, useState} from 'react';


type EditableSpanType = {
    title: string
    changeItemValue: (title:string) => void
  }
export const EditableSpan = (props: EditableSpanType) => {

    const [viewingValue, setEditingValue] = useState(true)
    const [inputValue, setInputValue] = useState('')
    const changeOnEditStatus = ()=> {
        setEditingValue(false)
        setInputValue(props.title)

    }
    const changeOnViewStatus = ()=> {
        setEditingValue(true)
        props.changeItemValue(inputValue)
    }
    const changeInputValue = (el:ChangeEvent<HTMLInputElement>) => {
        debugger
        setInputValue(el.currentTarget.value)

    }
    return (
        <>
            {viewingValue
            ? <span onDoubleClick={changeOnEditStatus}>{props.title}</span>
            : <input value={inputValue} onBlur={changeOnViewStatus} onChange={changeInputValue}/>
            }
        </>
    );
};
