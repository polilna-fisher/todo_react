import './addItem.css'
import {useState} from "react";

const AddItem = ({addNewItem}) => {

    const [newItemValue, setNewItemValue] = useState('')


    return (
        <div className='addItem'>
            <input type='text' placeholder='Create new item' className='addInput'
                   value={newItemValue}
                   onChange={e => setNewItemValue(e.target.value)}
                    />
            <button className='addButton' onClick={() => {addNewItem(newItemValue); setNewItemValue('')}}>
                Add
            </button>

        </div>
    )
}

export default AddItem