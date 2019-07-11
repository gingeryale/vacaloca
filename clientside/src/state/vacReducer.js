const initializeState = {
    date: new Date(),
    allVac: [{
        id: 0,
        destination: "vacaloca vacations",
        desc: "deals all the way",
        price: 100,
        checkin: "01-01-1970",
        checkout: "01-01-3000"
    }],
    following: [],
    isLoggedIn: true,
    isAdmin: false,
    vprops:{}
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
        case 'GET_VACAS':
            newState = Object.assign({}, state, {
                allVac: action.data,
                date: new Date(),
                isLoggedIn: action.data
            })
            return newState;

            case 'DELETE_V':
            let prevArray = [...state.allVac];
            prevArray.splice(prevArray.filter(el => el.id !== action.data),1);
            newState = {
                date: new Date(),
                isLoggedIn: true,
                allVac: prevArray
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
                isLoggedIn: true,
                allVac: prevArray,
                vprops: edited
            }
            return newState;
        case 'LOGIN':
            if (action.data.msg == "OK") {
                newState = {
                    isLoggedIn: true,
                    allVac: action.data
                }
            }
            return newState;
        case 'REG':
            if (action.data.msg == "OK") {
                newState = {
                    isLoggedIn: true,
                    allVac: action.data
                }
            }

            return newState;
            case 'FOLLOW_V':
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
        default:

            return state;
    }

}

export default vacReducer;