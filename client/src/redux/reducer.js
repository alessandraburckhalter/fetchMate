import { combineReducers } from 'redux';
import { ADD_USER_SKILL, SET_ALL_POSSIBLE_SKILLS, SET_LOGIN, SET_LOGOUT, SET_USER_PROFILE_PIC, SET_USER_SKILLS } from './actions';


//* This is the reducer that houses all possible actions for the user global state
//todo need to change the profile picture one to change user.loginInfo.profilePicture
const userReducer = (state={}, action) => {
    switch (action.type){
        case SET_LOGIN:
            return {loginInfo: action.payload.userInfo};
        case SET_LOGOUT:
            return null;
        case SET_USER_SKILLS:
            return {skills: action.payload.userSkills};
        case ADD_USER_SKILL:
            return [...state.user.skills].push(action.payload.individualSkill);
        case SET_USER_PROFILE_PIC:
            //* When the user changes their profile picture, this will save the new picture in the old pictures spot...getting rid of the old one.
            return [...state.user.loginInfo.profilePic] = action.payload.image;
            // return {profilePic: action.payload.image};
        default:
            return state;
    }   
}

//* This will be the reducer for all skills, eventually we will have three other types
//todo One will be another case for SET_ALL_TECHNICAL_SKILLS ==> return {techSkills: actions.payload.techSkills}
//todo Another will be for SET_ALL_SOFT_SKILLS ==> return {softSkills: actions.payload.techSkills}
//todo And finally we will have one for SET_ALL_LANGUAGE_SKILLS ==> return {langSkills: actions.payload.langSkills}
//! We may want to change this to where we are only saving the tech, soft, and language skills instead of:
//! having a spot for all skills, then tech, soft, and language skills
const skillsReducer = (state={}, action) => {
    switch (action.type){
        case SET_ALL_POSSIBLE_SKILLS:
            return {allSkills: action.payload.allSkills}
        default:
            return state;
    }
}

//? Here we will to continue to add our global state variables.App
//? Note that the keys for the functions below will be what the global state variables are named...so we will need to use these names to reference 
export const rootReducer = combineReducers({
    user: userReducer,
    possibleSkills: skillsReducer,
})

//* For example, to access the state variable corresponding to the userReducer we would do the following:
//* const user = useSelector(state => state.user)