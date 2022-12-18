
import {useReducer } from 'react'


const initialInputState = {
  value: '' ,
  isTouched: false 
}
const inputStateReducer = (state  , action ) => {
  if(action.type === 'SET_VALUE'){
    return {
      ...state,
      value: action.value,
    }
  }
  if (action.type === 'ON_CHANGE')
    return {
      value: action.value,
      isTouched: true
    }
  if (action.type === 'BLUR')
    return {
      value: state.value,
      isTouched: true
    }
  if (action.type === 'RESET')
    return initialInputState
  return initialInputState
}
const useInput = (validateValueFun , initialValue ) => {
  if(initialValue)
  initialInputState.value = ''
  initialInputState.value = initialValue || ''
  const [inputState, dispatchInput] = useReducer(inputStateReducer, initialInputState)
  const isValid = validateValueFun(inputState.value) 
  const hasError = inputState.isTouched && !isValid
  // dispatchInput({
  //   type : 'SET_VALUE',
  //     value : initialValue
  // })

  const setValueHandler = value =>{
    dispatchInput({
      type : 'SET_VALUE',
      value
    })
  }
  const onChangeHandler = (e) => {
    dispatchInput({
      type: 'ON_CHANGE',
      value: e.target.value,
    })
  }
  const onBlurHandler = (e ) => {
    dispatchInput({ type: 'BLUR' })
  }
  const resetInputHandler = () => {
    dispatchInput({ type: 'RESET' })
  }
  return {
    value: inputState.value,
    hasError,
    isValid: isValid ,
    setValueHandler,
    onChangeHandler,
    onBlurHandler,
    resetInputHandler,
  }
}

export default useInput;