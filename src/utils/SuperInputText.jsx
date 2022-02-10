import React from 'react'
import s from './SuperInputText.module.css'



const SuperInputText = (
    {
        type,
        onChange, onChangeText,
        onKeyPress, onEnter,
        error,
        className, spanClassName,

        ...restProps
    }
) => {
    const onChangeCallback = (e) => {
        onChange && onChange(e)
        onChangeText && onChangeText(e.currentTarget.value)
    }
    const onKeyPressCallback = (e) => {
        onKeyPress && onKeyPress(e);
        onEnter
        && e.key === 'Enter'
        && onEnter()
    }
    const finalSpanClassName = `${s.error} ${spanClassName ? spanClassName : ''}`
    const finalInputClassName = `${error ? s.errorInput : s.superInput} ${className} `
    return (
        <>
            <input
                type={type}
                onChange={onChangeCallback}
                onKeyPress={onKeyPressCallback}
                className={finalInputClassName}

                {...restProps}
            />
            {error && <span className={finalSpanClassName}>{error}</span>}
        </>
    )
}

export default SuperInputText
