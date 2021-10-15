import React, {useEffect, useState} from 'react';
import './ListForm.scss'
import {FaCheckCircle, FaTimes} from "react-icons/fa";

const ListForm = ({display, toggleDisplay,submitFct, list = null})=> {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [errors, setErrors] = useState([])
    const [name,setName] = useState('')
    const [description,setDescription] = useState('')
    const [img,setImg] = useState('')

    useEffect(()=>{
        if (list){
            setName(list.name)
            setDescription(list.description)
            setImg(list.img)
        }
    },[])

    const handleSubmit = (e) => {
        e.preventDefault()
        setIsSubmitting(true)
        submitFct({name:name,description:description,img:img})
    }
    const handleChange = (e,setter) => {
        let value = e.target.value
        setter(value)
        if (value.length === 0)
            setErrors({name:'EmptyField',message:`Le champs '${e.target.name}' ne peut pas être vide.`})
        else
            setErrors({name:'',message:``})

    }

    return (
        <form className={`${display ?'max':'minimize'}`} onSubmit={handleSubmit}>
            <span>{errors.message}</span>
            <div className={'inputContainer'}>
                <input
                    type={'text'}
                    name={'name'}
                    placeholder={'Nom'}
                    value={name}
                    onChange={e => handleChange(e,setName)}
                />
                <textarea
                    cols={"21"}
                    rows={"5"}
                    name={'description'}
                    placeholder={'Description'}
                    value={description}
                    onChange={e => handleChange(e,setDescription)}
                />
                <input
                    type={'text'}
                    name={'img'}
                    placeholder={'Lien de l\'image'}
                    value={img}
                    onChange={e => setImg(e.target.value)}
                />
            </div>
            <div className={'btnContainer'}>
                <FaCheckCircle size={30} className={'doneBtn'} type={'submit'}  disabled={isSubmitting} onClick={handleSubmit}/>
                <FaTimes size={30} className={'deleteBtn'} onClick={toggleDisplay}/>
            </div>
        </form>
    )
}

export default ListForm;