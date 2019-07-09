const initializeState = {
    date: new Date(),
    allVac: [{
        id: 0,
        destination: "destination vacation",
        desc: "best dest",
        price: 0,
        checkin: 0,
        checkout: 0
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
            newState = Object.assign({}, state, {
                allVac: action.data,
                date: new Date(),
                isLoggedIn: action.data
            })
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