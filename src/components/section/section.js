import './section.css'
import Item from "../item/item";
import AddItem from "../addItem/addItem";
import {useEffect, useState} from "react";
import {v4 as uuidv4} from 'uuid';
import Counter from "../counter/counter";
import EmptyScreen from "../emptyScreen/emptyScreen";


const Section = () => {
    const [itemsData, setItemData] = useState([])

    const addNewItem = (itemText) => {
        const id = uuidv4()
        const order = itemsData.length + 1
        if(itemText.length > 0){
            const newItems = [...itemsData, {id: id, text: itemText, isDone: false, order: order}]
            setItemData(newItems)
        }
    }

    const changeDone = (id) => {
        setItemData(itemsData.map(item => {
            if (item.id === id){
                item.isDone = !item.isDone
            }
            return item
        }))
    }

    const deleteItem = (idItem) => {
       setItemData( prev => prev.filter(item => item.id !== idItem))
    }

    const countIsNotDoneItems = () => {
        return itemsData.filter(item => item.isDone === false).length
    }

    const [currentItem, setCurrentItem] = useState({})

    function dragStartHandler(currentId) {
        setCurrentItem(currentId)
    }

    function dragEndHandler(e) {
        // e.target.style.background = 'white'
    }


    function dragOverHandler(e, overOrder, overItemId) {
        e.preventDefault()
        // e.target.style.background = 'tomato'


        const newItemsData = itemsData.map(item => {
            if (item.id === currentItem?.id) {
                return { ...item, order: overOrder }
            }
            if (item.id === overItemId) {
                setCurrentItem({ ...currentItem, order: item.order })
                return { ...item, order: currentItem.order }
            }
            return item
        })


        setItemData(newItemsData)

    }

    function dropHandler(e, id) {
        setCurrentItem({})
        e.preventDefault()
    }


    const sortItems = (a, b) => {
        if(a.order > b.order){
            return 1
        } else{
            return -1
        }
    }


    return (
        <div className='section'>
            <AddItem addNewItem={addNewItem}/>
            <Counter allQuantity={itemsData.length} countIsNotDoneItems={countIsNotDoneItems}/>
            {itemsData.length > 0 ? null :  <EmptyScreen/>}
            {
                    itemsData.sort(sortItems).map(item => {
                    return <Item key={item.id}
                                 id={item.id}
                                 text={item.text}
                                 isDone={item.isDone}
                                 order={item.order}
                                 changeDone={changeDone}
                                 onDelete={deleteItem}
                                 dragStartHandler={dragStartHandler}
                                 dragEndHandler={dragEndHandler}
                                 dragOverHandler={dragOverHandler}
                                 dropHandler={dropHandler}/>
                })
            }
        </div>
    )
}



export default Section