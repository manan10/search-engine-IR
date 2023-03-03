import React from 'react'
import colors from '../../../theme/Colors'

function Tab({ title, onClickTab, value, engine }) {
    const tabstyle = {
        padding: '15px',
        textAlign: 'center',
        marginTop: '8px',
        backgroundColor: value !== engine ? 'white' : '#198754',
        color: value !== engine ? 'black' : 'white',
        border: '5px outset ' + colors.borderColor,
        cursor: 'pointer',
        borderRadius: '6px'
    }

    return (
        <div style= { tabstyle } onClick={ () => onClickTab(value) }>
            <span>{ title }</span>
        </div>
    )
}

export default Tab