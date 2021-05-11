import React from 'react';
import './ListForm.scss'
const ListForm = ({display})=> {

    return (
        <form className={`container ${display ?'max':'min'}`}>
            <label>
                Nom
            <input type={'text'} value={list.name} name={'name'}/>
            </label>
            <label>
                Description
                <textarea cols={"40"} value={list.description} rows={"5"} name={'description'}/>
            </label>
            <label>
                Lien de l'image
                <input type={'text'} value={list.img} name={'img'}/>
            </label>
            <button>Valider</button>
        </form>
    )
}

export default ListForm;