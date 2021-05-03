import React from 'react';
import './ListForm.scss'
const ListForm = ({list})=> {

    return (
        <form className={'container'}>
            <label>
                Nom
            <input type={'text'} name={'name'}/>
            </label>
            <label>
                Description
                <textarea cols={"40"} rows={"5"} name={'description'}/>
            </label>
            <label>
                Lien de l'image
                <input type={'text'} name={'img'}/>
            </label>
            <button>Valider</button>
        </form>
    )
}

export default ListForm;