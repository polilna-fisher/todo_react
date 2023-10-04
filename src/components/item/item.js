import './item.css'
import DeleteIcon from '../../img/trash.png'
import CancelIcon from '../../img/cancel.svg'
import {useRef, useState} from "react";



const Item = ({id, order, text, isDone, onDelete, changeDone, dragStartHandler, dragEndHandler, dragOverHandler, dropHandler}) => {
    const [isDeleting, setIsDeleting] = useState(false)
    // const [progressWidth, setProgressWidth] = useState('1%')
    const [itemClass, setItemClass] = useState(false)
    const timeout = useRef()

    const handleDelete = (id) => {
        setIsDeleting(true)
        // progressBarAnimation()
        timeout.current = setTimeout(() => {
            onDelete(id)
        }, 3000)
    }

    const handleCancelDelete = () => {
        setIsDeleting(false)
        clearTimeout(timeout.current)
    }

    return (
        <div
             className={`item ${isDeleting ? 'is_deleting' : ''}`}
             draggable={true}
             onDragStart={() => dragStartHandler({id, order})}
             onDragLeave={e => dragEndHandler(e)}
             onDragEnd={e => dragEndHandler(e)}
             onDragOver={e => dragOverHandler(e, order, id)}
             onDrop={e => dropHandler(e, id)}
             >
            <div className={`progress_bar ${itemClass ? 'start_progress': ''}`}
                    />

            <input checked={isDone}
                   type="checkbox"
                   className="custom-checkbox"
                   id={id}
                   value={id}
                   onChange={() => changeDone(id)}/>
            <label htmlFor={id}></label>
            <p className={`text ${ isDone && !isDeleting ? 'is_done' : '' }`}>{ isDeleting ? 'Deleting' : text}</p>
            {isDeleting
                ? <img alt='cancel' src={CancelIcon} className='icon'onClick={() => {handleCancelDelete(); setItemClass(!itemClass)}}/>
                : <img alt='delete' src={DeleteIcon} className='icon' onClick={() => {handleDelete(id); setItemClass(!itemClass)}}/>
            }
        </div>
    )

}



export default Item