const initializeState = {
  date: new Date(),
  allVac: [
    {
      id: 0,
      destination: "",
      desc: "",
      price: 0,
      checkin: "",
      checkout: "",
      img: {}
    }
  ],
  following: [],
  reports: [{ id: 0, vac_destination: "", trending: 0 }],
  isLoggedIn: false,
  isAdmin: false,
  vprops: {},
  hello: ""
};
const vacReducer = (state = initializeState, action) => {
  switch (action.type) {
    case "ADD_VAC":
      let newVacationArr = [...state.allVac];
      newVacationArr.push(action.data);
      let newState = {
        date: new Date(),
        isLoggedIn: true,
        allVac: newVacationArr
      };
      return newState;
    case "GET_VACS":
      newState = { ...state };
      (newState.allVac = action.data),
        (newState.date = new Date()),
        (newState.reports = state.reports),
        (newState.isLoggedIn = true),
        (newState.following = state.following),
        (newState.isLoggedIn = state.isLoggedIn);
      return newState;
    case "DELETE_V":
      newState = { ...state };
      let prevArray = [...state.allVac];
      prevArray.splice(prevArray.filter(el => el.id !== action.data), 1);
      (newState.date = new Date()),
        (newState.isLoggedIn = true),
        (newState.isAdmin = true),
        (newState.hello = action.data.name),
        (newState.allVac = prevArray);
      return newState;
    case "LOAD_V":
      prevArray = [...state.allVac];
      let fv = prevArray.find(el => el.id == this.props.match.params.vid);
      newState = {
        date: new Date(),
        isLoggedIn: true,
        allVac: prevArray,
        vprops: fv
      };
      return newState;
    case "EDIT_V":
      prevArray = [...state.allVac];
      let edited = prevArray.find(el => el.id == action.data);
      newState = {
        date: new Date(),
        isLoggedIn: false,
        isAdmin: true,
        allVac: prevArray,
        vprops: edited
      };
      return newState;
    case "LOGIN":
      if (action.data.msg == "OK" && action.data.name == "admin") {
        newState = { ...state };
        (newState.date = new Date()),
          (newState.isLoggedIn = true),
          (newState.isAdmin = true),
          (newState.hello = action.data.name);
      } else {
        newState = { ...state };
        (newState.date = new Date()),
          (newState.isLoggedIn = true),
          (newState.hello = action.data.name);
      }
      return newState;
    case "REG":
      debugger;
      if (action.data.msg == "OK") {
        newState = { ...state };
        (newState.allVac = state.allVac),
          (newState.date = new Date()),
          (newState.isLoggedIn = true),
          (newState.hello = action.data.name);
      }
      return newState;
    case "CHARTS":
      newState = { ...state };
      newState.reports = action.data;
      return newState;
    default:
      return state;
  }
};

export default vacReducer;
