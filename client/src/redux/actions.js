
export const SET_LOGIN = 'SET_LOGIN';
export const SET_LOGOUT = 'SET_LOGOUT';
export const SET_USER_SKILLS = 'SET_USER_SKILLS';
export const ADD_USER_SKILL = 'ADD_USER_SKILL';
export const SET_USER_PROFILE_PIC = 'SET_USER_PROFILE_PIC';
export const SET_ALL_POSSIBLE_SKILLS = 'SET_ALL_POSSIBLE_SKILLS';
export const ADD_SKILL_TO_SEARCH_ARRAY = 'ADD_SKILL_TO_SEARCH_ARRAY';
export const REMOVE_SKILL_FROM_SEARCH_ARRAY = 'REMOVE_SKILL_FROM_SEARCH_ARRAY';
export const SET_CHECKED = 'SET_CHECKED';



export const login = (userInfo) => {
    return {
        type: SET_LOGIN,
        payload: {
            userInfo
        }
    }
}

export const logout = () => {
    return {
        type: SET_LOGOUT
    }
}

export const checked = () => {
    return {
        type: SET_CHECKED
    }
}

export const setUserSkills = (userSkills) => {
    return {
        type: SET_USER_SKILLS,
        payload:{
            userSkills
        }
    }
}

export const addUserSkill = (individualSkill) => {
    return {
        type: ADD_USER_SKILL,
        payload:{
            individualSkill
        }
    }
}

export const setUserPicture = (image) => {
    return {
        type: SET_USER_PROFILE_PIC,
        payload:{
            image
        }
    }
}

export const setAllPossibleSkills = (allSkills) => {
    return {
        type: SET_ALL_POSSIBLE_SKILLS,
        payload:{
            allSkills
        }
    }
}

export const addSkillToSearchArray = (skill) => {
    return {
        type: ADD_SKILL_TO_SEARCH_ARRAY,
        payload: {
            skill
        }
    }
}
export const removeSkillFromSearchArray = (skillId) => {
    return {
        type: REMOVE_SKILL_FROM_SEARCH_ARRAY,
        payload: {
            skillId
        }
    }
}

