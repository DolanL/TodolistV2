import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {IconButton, TextField} from "@mui/material";
import {AddBox} from "@mui/icons-material";


type AddItemFormPropsType = {
  addItem: (title: string) => void;
}


const AddItemForm = React.memo((props: AddItemFormPropsType) => {

  console.log('Add item form')
  const [title, setTitle] = useState('')
  const [error, setError] = useState<boolean | undefined>(false)

  const onKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      addTask()
    }
  }

  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.currentTarget.value)
    setError(false)
  }

  const addTask = () => {
    if (title.trim() !== '') {
      props.addItem(title)
      setTitle('')
    } else {
      setError(true)
    }
  }

  return (
    <div>
      <TextField error={error} value={title} onKeyDown={onKeyDownHandler} onChange={onChangeHandler} id="outlined-basic" label={error ? "Enter Text!!" : ""} variant="outlined" />
      <IconButton
        color='primary'
        onClick={addTask}
      >
        <AddBox/>
      </IconButton>
    </div>

  );
});

export default AddItemForm;