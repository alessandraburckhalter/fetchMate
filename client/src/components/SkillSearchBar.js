import React, { useEffect, useState } from 'react'
import Axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { removeSkillFromSearchArray, setAllPossibleSkills } from '../redux/actions';
import SkillSearchOption from './SkillSearchOption';
import { MDBBtn, MDBContainer, MDBIcon, MDBModal, MDBModalBody, MDBModalFooter, MDBModalHeader } from 'mdbreact';

export default function SkillSearchBar({category}) {
    const dispatch = useDispatch();
    const [currentSearch, setCurrentSearch] = useState('');
    const [searchOptions, setSearchOptions] = useState([]);
    const [showNewSkillModal, setShowNewSkillModal] = useState(false);
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
    //* Then it filters based on the category of each skill, we pass the category name in as a prop
    const regex = new RegExp(`\\b${currentSearch.toLowerCase()}[a-zA-Z]*\\b`)
    const filtered = currentSearch ? searchOptions.filter(option => option.name.toLowerCase().match(regex) && option.category === category)  : [];
    const filteredForAlreadyPicked = filtered.filter(option => !pickedSkillsArray.find(skill => skill.name === option.name))

    //todo if the skill they are searching for doesn't exits, then we display a button or something to add a new skill

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
                {filteredForAlreadyPicked.length === 0 && currentSearch.length > 0 ? (
                <button type="button" onClick={(e) => {setShowNewSkillModal(true)}}>Create New Skill</button>
                ):('')}
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
            {/* <MDBContainer>
                <button onClick={() => {setShowNewSkillModal(!showNewSkillModal)}}>Modal</button>
                <MDBModal isOpen={showNewSkillModal} toggle={() => {setShowNewSkillModal(!showNewSkillModal)}}>
                    <MDBModalHeader toggle={() => {setShowNewSkillModal(!showNewSkillModal)}}>MDBModal title</MDBModalHeader>
                    <MDBModalBody>
                    (...)
                    </MDBModalBody>
                    <MDBModalFooter>
                    <MDBBtn color="secondary" onClick={() => {setShowNewSkillModal(!showNewSkillModal)}}>Close</MDBBtn>
                    <MDBBtn color="primary">Save changes</MDBBtn>
                    </MDBModalFooter>
                </MDBModal>
            </MDBContainer> */}
        </>
    )
}
