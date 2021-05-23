import React, {useState} from 'react';
import { FaTimes } from 'react-icons/fa'
import { FaCheckCircle } from 'react-icons/fa'
import { FaEdit } from 'react-icons/fa'
import './Item.scss'
import '../../../App.scss'

const Item = ({ item, onDelete, onEditionToggle, onEdit }) => {
    const [tempVal, setTempVal] = useState(item.content)

    const handleDelete = () => onDelete(item.id)
    const handleDone = () => {
        if(!item.displayEdit){
            onEdit({content:item.content,id:item.id,done:!item.done,displayEdit:false})
        }
    }
    const handleEditToggle = () => {
        if (!item.done) onEditionToggle(item.id)
        setTempVal(item.content)
    }
    const handleEdit = () => {
        if (!tempVal.length){
            alert('Ajouter du contenu')
            return
        }
        onEdit({content:tempVal,id:item.id,done:false,displayEdit:true})
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