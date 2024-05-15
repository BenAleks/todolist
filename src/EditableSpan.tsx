import {ChangeEvent, memo, useState} from 'react';
import TextField from '@mui/material/TextField';

type EditableSpanType = {
    title: string
    changeItemValue: (title: string) => void
}
export const EditableSpan = memo((props: EditableSpanType) => {
console.log("EditableSpan")
    const [viewingValue, setEditingValue] = useState(true)
    const [inputValue, setInputValue] = useState('')
    const changeOnEditStatus = () => {
        setEditingValue(false)
        setInputValue(props.title)

    }
    const changeOnViewStatus = () => {
        setEditingValue(true)
        props.changeItemValue(inputValue)
    }
    const changeInputValue = (el: ChangeEvent<HTMLInputElement>) => {
        setInputValue(el.currentTarget.value)

    }
    return (
        <>
            {viewingValue
                ? <span onDoubleClick={changeOnEditStatus}>{props.title}</span>
                : <TextField
                    variant={'outlined'}
                    value={inputValue}
                    size={'small'}
                    onChange={changeInputValue}
                    onBlur={changeOnViewStatus}
                    autoFocus
                />
            }
        </>
    );
});
