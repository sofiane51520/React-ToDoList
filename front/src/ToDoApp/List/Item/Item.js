import React, {useState} from 'react';
import { FaTimes } from 'react-icons/fa'
import { FaCheckCircle } from 'react-icons/fa'
import { FaEdit } from 'react-icons/fa'
import './Item.scss'

const Item = ({ item, onDelete, onDone, onEditionToggle, onEdit }) => {
    const [tempVal, setTempVal] = useState(item.content)

    const handleDelete = () => onDelete(item.id)
    const handleDone = () => {
        if(!item.displayEdit) onDone(item.id)
    }
    const handleEditToggle = () => {
        if (!item.done) onEditionToggle(item.id)
    }
    const handleEdit = () => {
        onEdit(item.id, tempVal)
    }

    return (
        <>
            <span className={`value ${item.done ? 'done' : `${item.displayEdit ? 'hide':''}`} `}>
                {item.content}
            </span>
            <div
                className={`btnContainer ${item.displayEdit ? '' : 'hide'}`}>
                <input type='text' value={tempVal} onChange={e => setTempVal(e.target.value)} className={'input'}/>
            </div>
            <div className='btnContainer'>
                <div className={item.displayEdit || item.done ? 'hide': ''}>
                    <FaEdit
                        className={'actionBtn editBtn'}
                        onClick={handleEditToggle}
                    />
                </div>
                <div>
                    <FaCheckCircle
                        className={`actionBtn doneBtn ${item.done ? 'jello done' : ''}`}
                        onClick={item.displayEdit ? handleEdit : handleDone}
                    />
                </div>
                <div>
                    <FaTimes
                        className={'actionBtn deleteBtn'}
                        onClick={item.displayEdit ? handleEditToggle:handleDelete}
                    />
                </div>
            </div>
        </>
    )
}

export default Item;