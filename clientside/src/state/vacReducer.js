const initializeState={
    date: new Date(),
    allVac: [{
        id:0,
        destination:"destination vacation",
        desc:"best dest",
        price:0,
        checkin:0,
        checkout:0
    }],
    following:[],
    isLoggedIn: false,
    isAdmin: false
}
const vacReducer = (state = initializeState, action) => {
    switch(action.type){
        case 'ADD_VACA':
            let newVacationArr=[...state.allVac];
            newVacationArr.push(action.data);
            let newState={
                date: new Date(),
                allVac:newVacationArr
            }
            return newState;
        case 'GET_VACAS':
            newState=Object.assign({}, state,{
                allVac:action.data
            })
            return newState;
        default:
            return state;
    }

}

export default vacReducer;