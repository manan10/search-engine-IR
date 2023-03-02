import React from 'react'
import colors from '../../../theme/Colors'

function Tab({ title }) {
    const tabstyle = {
        padding: '15px',
        textAlign: 'center',
        marginTop: '10px',
        backgroundColor: 'white',
        color: 'black',
        border: '3px outset ' + colors.borderColor,
        cursor: 'pointer',
        borderRadius: '10px'
    }

    return (
        <div style= { tabstyle }>
            <span>{ title }</span>
        </div>
    )
}

export default Tab