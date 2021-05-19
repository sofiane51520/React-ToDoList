import React from 'react';
import './ListForm.scss'
import {useForm} from "react-hook-form";
import {FaCheckCircle, FaTimes} from "react-icons/fa";

const ListForm = ({display, toggleDisplay,submitFct, data = null})=> {
    const {register, handleSubmit, formState, getValues, reset, setValue} = useForm()
    const {errors, isSubmitting} = formState

    const onSubmit = () => {
        submit()
        reset()
    }

    if (data){
        setValue('name', data.name)
        setValue('description', data.description)
        setValue('img', data.img)
    }

    async function submit(){
        submitFct({name:getValues('name'),description:getValues('description'),img:getValues('img')})
    }

    return (
        <form className={`card ${display ?'max':'min'}`} onSubmit={handleSubmit(onSubmit)}>
            {errors.name && <span>{errors.name.message}</span>}

            <input type={'text'} name={'name'} placeholder={'Nom'} {...register('name',{required: 'Vous devez entrer une valeur'})}/>
            <textarea cols={"15"} rows={"5"} name={'description'} placeholder={'Description'} {...register('description')}/>
            <input type={'text'} name={'img'} placeholder={'Lien de l\'image'}  {...register('img')}/>
            <div className={'btnContainer'}>
                <FaCheckCircle size={30} className={'leftBtn doneBtn'} type={'submit'}  disabled={isSubmitting} onClick={onSubmit}/>
                <FaTimes size={30} className={'rightBtn deleteBtn'} onClick={toggleDisplay}/>
            </div>
        </form>
    )
}

export default ListForm;