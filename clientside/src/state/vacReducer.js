const initializeState={
    date: new Date(),
    allVac: [{
        id:0,
        name:"destination vacation",
        desc:"best dest"
    }],
    following:[]
}
const vacReducer = (state = initializeState, action) => {
    switch(action.type){
        case 'ADD':
            let newVacationArr=[...state.allVac];
            newVacationArr.push(action.data);
            let newState={
                date: new Date(),
                allVac:newVacationArr
            }
            return newState;
        case 'CHANGE':
                return newState;
        default:
            return state;
    }

}

export default vacReducer;