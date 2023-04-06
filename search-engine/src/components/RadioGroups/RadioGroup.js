import React from 'react'
import { Radio } from 'antd'

function RadioGroup({ label, options, value, onChange }) {
  return (
    <div style={{ marginTop: "20px", display: 'flex', flexDirection: 'column' }}>
        <span style={{ fontSize: '14px', marginBottom: '5px' }} className="text-muted">{ label }</span>
        <Radio.Group
            options = { options }
            onChange = { onChange }
            value = { value }
            optionType = "button"
            buttonStyle = "solid"
        />
    </div>
  )
}

export default RadioGroup