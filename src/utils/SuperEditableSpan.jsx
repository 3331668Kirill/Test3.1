import React, {useState} from 'react'
import SuperInputText from './SuperInputText'
import s from './SuperInputText.module.css'

const SuperEditableSpan = (
    {
        autoFocus,
        onBlur,
        onEnter,
        spanProps,
        ...restProps
    }
) => {
    const [editMode, setEditMode] = useState(false)
    const {children, onDoubleClick, className, ...restSpanProps} = spanProps || {}

    const onEnterCallback = () => {
        setEditMode(false)
        onEnter && onEnter()
    }
    const onBlurCallback = (e) => {
        setEditMode(false)
        onBlur && onBlur(e)
    }
    const onDoubleClickCallBack = (e) => {
        setEditMode(true)
        onDoubleClick && onDoubleClick(e)
    }
    const spanClassName = `${s.newSpanClassName} ${className}`

    return (
        <>
            {editMode
                ? (
                    <SuperInputText
                        autoFocus
                        onBlur={onBlurCallback}
                        onEnter={onEnterCallback}
                        {...restProps}
                    />
                ) : (
                    <span
                        onDoubleClick={onDoubleClickCallBack}
                        className={spanClassName}
                        {...restSpanProps}>

                        {children || restProps.value}
                    </span>
                )
            }
        </>
    )
}

export default SuperEditableSpan
