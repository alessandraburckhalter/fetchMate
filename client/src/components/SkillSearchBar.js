import React, { useEffect, useState } from 'react'
import Axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { removeSkillFromSearchArray, setAllPossibleSkills } from '../redux/actions';
import SkillSearchOption from './SkillSearchOption';
import { MDBIcon } from 'mdbreact';

export default function SkillSearchBar({category}) {
    const dispatch = useDispatch();
    const [currentSearch, setCurrentSearch] = useState('');
    const [searchOptions, setSearchOptions] = useState([]);
    const pickedSkillsArray = useSelector(state => state.searchSkillsToAdd)
    useEffect(() => {
        //* This is the fetch request to get all available skills from backend
        //* We then dispatch an action to save the skills into the possibleSkills global
        //* state variable
        Axios.get('http://localhost:3000/api/v1/skills')
            .then(res =>{
                dispatch(setAllPossibleSkills(res.data))
                setSearchOptions(res.data)
            })
            .catch(err =>{
                console.log("Something happened getting the skills")
            })

    }, [dispatch])

    //* Little regex magic --> basically searches for words that start with the typed in value, not really sure if the [a-zA-Z] part is necessary
    //* we then filter over all of the options and check if the option.name matches the regex expression (if expression evaluates to true then that option is kept)...
    //* if that expression evaluates to false, then it is not included in.
    const regex = new RegExp(`\\b${currentSearch.toLowerCase()}[a-zA-Z]*\\b`)
    const filtered = currentSearch ? searchOptions.filter(option => option.name.toLowerCase().match(regex) && option.category === category)  : [];
    const filteredForAlreadyPicked = filtered.filter(option => !pickedSkillsArray.find(skill => skill.name === option.name))
    // currentSearch === '' ? setFilteredOptions([]) : setFilteredOptions(filteredForAlreadyPicked);

    //todo if the skill they are searching for doesn't exits, then we display a button or something to add a new skill
    //todo allow user to pick from the suggestions field by adding a little button off to the side of each suggestion (like a little plus button)
    //todo cont. if they click the plus button then the skill is added to the skills to add state variable and the search bar is cleared
    //todo we will only send the skills list to the backend when the big add skills button is clicked...that way they can add multiple skills and only have to click the big button once

    //? For now I just put the suggested options underneath the search bar, but ideally it would pop up underneath in a little box
    //? We should maybe consider only having like 5 or 6 suggestions pop up underneath instead of all of them...
    return (
        <>
            <div className="input-group md-form form-sm form-1 pl-0">
                <div className="input-group-prepend">
                    <span className="input-group-text purple lighten-3" id="basic-text1">
                        <MDBIcon className="text-white" icon="search" />
                    </span>
                </div>
                <input className="form-control my-0 py-1" type="text" value={currentSearch} onChange={(e) => {setCurrentSearch(e.target.value)}} placeholder="Search for technical skills" aria-label="Search" />
            </div>
            <div>
                {filteredForAlreadyPicked.map((option) => {
                    return <SkillSearchOption key={option.id} option={option}/>
                })}
            </div>

            <div className="form-group">
                {pickedSkillsArray.filter(skill => skill.category === category).map(addedSkill => {
                    return (
                        <span>
                            {addedSkill.name}
                            <button type="button" onClick={() => {dispatch(removeSkillFromSearchArray(addedSkill.id))}}>x</button>
                        </span>
                    ) 
                })}
            </div>
        </>
    )
}
