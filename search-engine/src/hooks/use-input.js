import { useCallback, useState } from 'react'

const useInput = (defaultValue = '', validate = () => {}) => {
  const [value, setValue] = useState(defaultValue)
  const isValid = validate(value)
  const valueChangedHandler = useCallback((event) => {
    setValue(event.target.value)
  }, [])

  const changeVal = useCallback((val) => {
    setValue(val)
  }, [])

  return { value: value, onChange: valueChangedHandler, setVal: changeVal, isValid: isValid }
}

export default useInput