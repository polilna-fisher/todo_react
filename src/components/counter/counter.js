import './counter.css'

const Counter = ({allQuantity, countIsNotDoneItems}) => {

    return(
        <div className='counter_line'>
            <div className='counter_column'>
                <p className='counter'>
                    All tasks
                </p>
                <p className='counter_number'>
                    {allQuantity}
                </p>
            </div>
            <div className='counter_column'>
                <p className='counter'>
                    Active tasks
                </p>
                <p className='counter_number'>
                    {countIsNotDoneItems()} of {allQuantity}
                </p>
            </div>
        </div>
    )
}

export default Counter