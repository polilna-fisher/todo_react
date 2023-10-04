import './emptyScreen.css'
import Empty from '../../img/clipboard.png'

const EmptyScreen = () => {
    return(
        <div className='empty_screen'>
            <img alt='empty' src={Empty} className='empty_img'/>
            <p>
                There is no items
            </p>
        </div>
    )

}

export default EmptyScreen