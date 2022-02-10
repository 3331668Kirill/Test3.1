import React from 'react'



const SuperSelect = (
    {
        options,
        onChange, onChangeOption,
        ...restProps
    }
) => {

    const mappedOptions = options ? options.map((t, index) => {
        return (
            <option value={t} key={index}>{t}</option>
        )
    }) : [];

    const onChangeCallback = (e) => {
        onChange && onChange(e)
        if (onChangeOption) {
            onChangeOption(e.currentTarget.value)
        }

    }

    return (
        <select onChange={onChangeCallback} {...restProps}>
            {mappedOptions}
        </select>
    )
}

export default SuperSelect
