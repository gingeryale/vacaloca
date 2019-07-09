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
    isAdmin: false
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
        default:

            return state;
    }

}

export default vacReducer;