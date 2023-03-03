import { Radio } from 'antd'
import React from 'react'

function RadioGroupS({ label, options, onChange, value }) {
    const radios = options.map(ele =>  {
        return <Radio value={ele.value} key={ ele.value }>{ele.label}</Radio>
    })
    
    return (
        <div style={{ marginTop: '20px' }}>
            <span style={{ color: 'white', fontSize: '15px' }}><u> { label } </u></span>
            <Radio.Group onChange={onChange} value={value} style={{ marginTop: '10px' }}>
                { radios }
            </Radio.Group>
        </div>
    )
}

export default RadioGroupS