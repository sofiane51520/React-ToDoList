import React from 'react';
import './ListForm.scss'
import {useForm} from "react-hook-form";
import axios from "../Api";

const ListForm = ({display, addList})=> {
    const {register, handleSubmit, formState, getValues, reset} = useForm()
    const {errors, isSubmitting} = formState

    const onSubmit = data =>{
        registerList()
        reset()
    }

    async function registerList(){
        await axios
            .post(`https://localhost:8000/api/to_do_lists`,{name:getValues('name'),description:getValues('description'),img:getValues('img')})
            .then(res => addList({name:res.data.name,description:res.data.description,img:res.data.img,id:res.data.id}))
    }

    return (
        <form className={`container ${display ?'max':'min'}`} onSubmit={handleSubmit(onSubmit)}>
            {errors.name && <span>{errors.name.message}</span>}

            <input type={'text'} name={'name'} placeholder={'Nom'} {...register('name',{required: 'Vous devez entrer une valeur', minLength: {value:4,message:'Vous devez entrer au moins 4 caracètres'} })}/>
            <textarea cols={"30"} rows={"5"} name={'description'} placeholder={'Description'} {...register('description')}/>
            <input type={'text'} name={'img'} placeholder={'Lien de l\'image'}  {...register('img')}/>
            <button type={'submit'} disabled={isSubmitting}>Valider</button>
        </form>
    )
}

export default ListForm;