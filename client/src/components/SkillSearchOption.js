import React from 'react'
import { useDispatch } from 'react-redux'
import { addSkillToSearchArray } from '../redux/actions';

export default function SkillSearchOption({option}) {
    const dispatch = useDispatch();

    const handleClick = () => {
        dispatch(addSkillToSearchArray(option))
    }

    return (
        <div>
            <p onClick={handleClick}>{option.name}</p>
        </div>
    )
}
