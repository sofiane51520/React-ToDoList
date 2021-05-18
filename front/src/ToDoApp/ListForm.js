import React from 'react';
import './ListForm.scss'
import {useForm} from "react-hook-form";
import axios from "../Api";

const ListForm = ({display, submitFct, list})=> {
    const {register, handleSubmit, formState, getValues, reset} = useForm()
    const {errors, isSubmitting} = formState

    const onSubmit = () => {
        editList()
        reset()
    }
    async function editList(){
        submitFct({name:getValues('name'),description:getValues('description'),img:getValues('img')})
    }

    return (

        <form className={`${display ?'max':'min'}`} onSubmit={handleSubmit(onSubmit)}>
            {errors.name && <span>{errors.name.message}</span>}

            <input type={'text'} name={'name'} placeholder={'Nom'} {...register('name',{required: 'Vous devez entrer une valeur'})}/>
            <textarea cols={"30"} rows={"5"} name={'description'} placeholder={'Description'} {...register('description')}/>
            <input type={'text'} name={'img'} placeholder={'Lien de l\'image'}  {...register('img')}/>
            <button type={'submit'} disabled={isSubmitting}>Valider</button>
        </form>
    )
}

export default ListForm;