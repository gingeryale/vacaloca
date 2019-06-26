const vacReducer = 
(state ={date:new Date(), allVac:[{name:"isr", id:1, desc:"summer heat all the time"}], following:[]}, action) =>{
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