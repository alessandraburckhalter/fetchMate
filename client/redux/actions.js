export const SET_LOGIN = 'SET_LOGIN';
export const SET_LOGOUT = 'SET_LOGOUT';
export const SET_USER_SKILLS = 'SET_USER_SKILLS';
export const ADD_USER_SKILL = 'ADD_USER_SKILL';


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