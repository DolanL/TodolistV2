import React, {KeyboardEvent, ChangeEvent, useState} from 'react';

type EditableSpanPropsType = {
  title: string
  onChange: (newTitle: string) => void
}


const EditableSpan = React.memo((props: EditableSpanPropsType) => {
  console.log("editable span")

  const [changer, setChanger] = useState(false)
  const [title, setTitle] = useState(props.title)


  const ActivateViewMode = () => {
    setChanger(!changer)
    props.onChange(title)
  }

  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.currentTarget.value)
  }

  const onKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      setChanger(!changer)
      props.onChange(title)
    }
  }

  return (
    changer ? <input onKeyDown={onKeyDownHandler} onChange={onChangeHandler} value={title} onBlur={ActivateViewMode} autoFocus /> : <span onDoubleClick={ActivateViewMode}>{props.title}</span>
  );
})

export default EditableSpan