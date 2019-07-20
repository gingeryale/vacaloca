const initializeState = {
    date: new Date(),
    allVac: [{ id: 0, destination: "", desc: "", price: 0, checkin: "", checkout: "", img:{} 
    }],
    following: [],
    reports: [{id: 0, vac_destination: "", trending: 0}],
    isLoggedIn: false,
    isAdmin: false,
    vprops: {}
}
const vacReducer = (state = initializeState, action) => {
    switch (action.type) {
        case 'ADD_VAC':
            let newVacationArr = [...state.allVac];
            newVacationArr.push(action.data);
            let newState = {
                date: new Date(),
                isLoggedIn: true,
                allVac: newVacationArr
            }
            return newState;
        case 'GET_VACS':
                newState = {...state};
                newState.allVac= action.data,
                newState.date= new Date(),
                newState.reports=state.reports,
                newState.isLoggedIn= true,
                newState.following=state.following,
                newState.isLoggedIn=state.isLoggedIn
            return newState;
            case 'DELETE_V':
            let prevArray = [...state.allVac];
            prevArray.splice(prevArray.filter(el => el.id !== action.data),1);
            newState = {
                date: new Date(),
                isLoggedIn: true,
                allVac: prevArray,
                isAdmin:true
            }
            return newState;
            case 'LOAD_V':
            prevArray = [...state.allVac];
            let fv = prevArray.find(el => el.id == this.props.match.params.vid);
            newState = {
                date: new Date(),
                isLoggedIn: true,
                allVac: prevArray,
                vprops: fv
            }
            return newState;
            case 'EDIT_V':
            prevArray = [...state.allVac];
            let edited = prevArray.find(el => el.id == action.data);
            newState = {
                date: new Date(),
                isLoggedIn: false,
                isAdmin:true,
                allVac: prevArray,
                vprops: edited
            }
            return newState;
        case 'LOGIN':
            if (action.data.msg == "OK" && action.data.name == "admin") {
                newState = {...state};
                newState.date= new Date(),
                newState.isLoggedIn= true,
                newState.isAdmin= true
                }
             else {
                newState = {...state};
                    newState.date= new Date(),
                    newState.isLoggedIn= true
                }
            
            return newState;
        case 'REG':
            if (action.data.msg == "OK") {
                newState = {...state};
                newState.date= new Date(),
                newState.isLoggedIn= true
            }
            return newState;
            case 'GET_FOLLOWS':
                newState = {...state};
                newState.following= action.data,
                newState.date= new Date(),
                newState.isLoggedIn= true
            return newState;
            case 'FOLLOW_ADD':
                let newFollowArr = [...state.following];
                prevArray = [...state.allVac];
                newFollowArr.push(action.data);
                newState = {
                    date: new Date(),
                    following: newFollowArr,
                    allVac: prevArray,
                    isLoggedIn: true
                }
                return newState;
            case 'FOLLOW_DEL':
                let prevFollowArr = [...state.following];
                prevArray = [...state.allVac];
                prevFollowArr.splice(prevFollowArr.filter(el => el.id !== action.data),1);
                newState = {
                    date: new Date(),
                    following: prevFollowArr,
                    isLoggedIn: true,
                    allVac: prevArray
                }
                return newState;
                case 'CHARTS':
                newState = {...state};
                newState.reports= action.data
                return newState;
        default:
            return state;
    }

}

export default vacReducer;