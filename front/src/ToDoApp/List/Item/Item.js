import React, {useRef, useState} from 'react';
import {FaChevronDown, FaChevronUp, FaTimes} from 'react-icons/fa'
import { FaCheckCircle } from 'react-icons/fa'
import { FaEdit } from 'react-icons/fa'
import './Item.scss'
import '../../../App.scss'
import {useDrag, useDrop} from "react-dnd";
import {ItemTypes} from "../../../Utilities/ItemsType";

const Item = ({ item, id,index, onDelete, onEditionToggle, onEdit, onOrderChange, moveTask }) => {
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
    const handlePositionChange = (posDiff) => {
        onOrderChange(item,posDiff)
    }

    const ref = useRef(null);
    const [{ handlerId }, drop] = useDrop({
        accept: ItemTypes.TASK,
        collect(monitor) {
            return {
                handlerId: monitor.getHandlerId(),
            };
        },
        hover(item, monitor) {
            if (!ref.current) {
                return;
            }
            const dragIndex = item.index;
            const hoverIndex = index;
            // Don't replace items with themselves
            if (dragIndex === hoverIndex) {
                return;
            }
            // Determine rectangle on screen
            const hoverBoundingRect = ref.current?.getBoundingClientRect();
            // Get vertical middle
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
            // Determine mouse position
            const clientOffset = monitor.getClientOffset();
            // Get pixels to the top
            const hoverClientY = clientOffset.y - hoverBoundingRect.top;
            // Only perform the move when the mouse has crossed half of the items height
            // When dragging downwards, only move when the cursor is below 50%
            // When dragging upwards, only move when the cursor is above 50%
            // Dragging downwards
            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return;
            }
            // Dragging upwards
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return;
            }
            // Time to actually perform the action
            moveTask(dragIndex, hoverIndex);
            // Note: we're mutating the monitor item here!
            // Generally it's better to avoid mutations,
            // but it's good here for the sake of performance
            // to avoid expensive index searches.
            item.index = hoverIndex;
        },
    });

    const [{ isDragging }, drag] = useDrag({
        type: ItemTypes.TASK,
        items: () => {
            return { id, index };
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });
    const opacity = isDragging ? 0 : 1;
    drag(drop(ref));

    return (
        <div data-handler-id={handlerId}>
            <span className={`value ${item.done ? 'done' : `${item.displayEdit ? 'hide':''}`} `}>
                {item.content}
            </span>
            <div
                className={`btnContainer ${item.displayEdit ? '' : 'hide'}`}>
                <input type='text' value={tempVal} onChange={e => setTempVal(e.target.value)} className={'input'}/>
            </div>
            <div className='btnContainer'>
                <div className={'actionBtn positionBtnContainer'}>
                    <FaChevronUp onClick={e => handlePositionChange(-1)}/>
                    <FaChevronDown onClick={e => handlePositionChange(1)}/>
                </div>
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
        </div>
    )
}

export default Item;