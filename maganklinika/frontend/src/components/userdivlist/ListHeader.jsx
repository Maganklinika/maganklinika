import React from 'react'


const ListHeader = (props) => {
    return (
        <div className='list-headers d-flex align-item-center'>
            {
                props.list ?
                    props.list.map((e, i) => {
                        return <p key={i}>{e}</p>
                    })
                    :
                    <p>Nincsenek elemek</p>
            }
        </div>
    )
}

export default ListHeader