import React, { useEffect, useState } from 'react'
import Axios from 'axios';
import { useDispatch } from 'react-redux';
import { setAllPossibleSkills } from '../redux/actions';
import { Button, Form } from 'react-bootstrap';

export default function SkillSearchBar() {
    const dispatch = useDispatch();
    const [currentSearch, setCurrentSearch] = useState('');
    const [searchOptions, setSearchOptions] = useState([]);
    const [filteredOptions, setFilteredOptions] = useState([]);
    const [skillsToAdd, setSkillsToAdd] = useState([]);
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

    const handleChange = (e) => {
        const value = e.target.value;
        setCurrentSearch(value)
        //* Little regex magic --> basically searches for words that start with the typed in value, not really sure if the [a-zA-Z] part is necessary
        //* we then filter over all of the options and check if the option.name matches the regex expression (if expression evaluates to true then that option is kept)...
        //* if that expression evaluates to false, then it is not included in.
        const regex = new RegExp(`\\b${value.toLowerCase()}[a-zA-Z]*\\b`)
        const filtered = searchOptions.filter(option => option.name.toLowerCase().match(regex));
        value === '' ? setFilteredOptions([]) : setFilteredOptions(filtered);
    }
    //todo if the skill they are searching for doesn't exits, then we display a button or something to add a new skill
    //todo allow user to pick from the suggestions field by adding a little button off to the side of each suggestion (like a little plus button)
    //todo cont. if they click the plus button then the skill is added to the skills to add state variable and the search bar is cleared
    //todo we will only send the skills list to the backend when the big add skills button is clicked...that way they can add multiple skills and only have to click the big button once

    //? For now I just put the suggested options underneath the search bar, but ideally it would pop up underneath in a little box
    //? We should maybe consider only having like 5 or 6 suggestions pop up underneath instead of all of them...
    return (
        <div>
            <Form className="d-flex">
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Skill Search</Form.Label>
                    <Form.Control type="text" value={currentSearch} placeholder="e.g. Javascript" onChange={handleChange}/>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Add Skills
                </Button>
            </Form>
            <div>
                {filteredOptions.map((option) => {
                    return <li key={option.id}>{option.name}</li>
                })}
            </div>
        </div>
    )
}
