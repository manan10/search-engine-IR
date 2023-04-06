import { useState } from 'react'

const useInput = (defaultValue = '') => {
  const [value, setValue] = useState(defaultValue)
  const valueChangedHandler = (event) => {
    setValue(event.target.value)
  }

  return { value: value, onChange: valueChangedHandler }
}

export default useInput