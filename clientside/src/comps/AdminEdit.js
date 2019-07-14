import React, { Component } from 'react';
import '../App.css';
import { connect } from 'react-redux';


class AdminEdit extends Component {
  state={
    vc:this.componentDidMount(),
    vp:this.props.match.params.vid
  }
 
  componentDidMount() {
    this.props.vacationsArray;
    let aa = this.props.vacationsArray;
    let foundV = aa.find(el => el.id == this.props.match.params.vid);
    return foundV;
  }
 


  render() {
    return (
      <div >
      <div className="form">
        <input name="destination" defaultValue={this.state.vc.vac_destination} onChange={this.handleChange.bind(this)} />
        <input name="desc" defaultValue={this.state.vc.vac_desc} onChange={this.handleChange.bind(this)}  />
        <input name="price" defaultValue={this.state.vc.vac_price} onChange={this.handleChange.bind(this)}  />
        <input defaultValue={this.state.vc.vac_checkin} type="date" placeholder={this.state.vc.vac_checkin} name="checkin" onChange={this.handleChange.bind(this)}  />
        <input defaultValue={this.state.vc.vac_checkout} type="date" placeholder={this.state.vc.vac_checkout} name="checkout" onChange={this.handleChange.bind(this)}  />
        <input type="file" name="img" onChange={this.handleImg.bind(this)} accept="image/*"/>
        <button onClick={this.inputCheck.bind(this, this.state)}>Edit</button>

      </div>
</div>
    );
  }

  
  handleImg(e){
    let files = e.target.files;
    console.table("data file " +files);
    let reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload=(e)=>{
      var formData = {img:e.target.result};
      this.setState({ img: formData.img });
      console.log(this.state);
    }
  }
  
  //value={this.state.isFocused ? this.state.inputValue : selected_id}
  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  inputCheck(vaca){
    !vaca.price ? vaca.price = vaca.vc.vac_price : vaca.price=vaca.price;
    !vaca.destination ? vaca.destination = vaca.vc.vac_destination : vaca.destination=vaca.destination;
    !vaca.desc ? vaca.desc = vaca.vc.vac_desc : vaca.desc=vaca.desc;
    !vaca.checkin ? vaca.checkin = vaca.vc.vac_checkin : vaca.checkin=vaca.checkin;
    !vaca.checkout ? vaca.checkout = vaca.vc.vac_checkout : vaca.checkout=vaca.checkout;
    !vaca.img ? vaca.img = vaca.vc.vac_img : vaca.img=vaca.img;
    vaca.vc.id = this.props.match.params.vid;
    this.props.saveData(vaca);
  }

}

const mapStateToProps = function (state) {
  return { vacationsArray: state.allVac };
}


const mapDispatchToProps = dispatch => {
  return {
    saveData: (vaca) => {dispatch(saveVacaToServer(vaca))},
    vprops: () => {dispatch(loadpropsFromServer())}
  };
};


function loadpropsFromServer(){
    return async function (dispatch) {
      var vvid = this.props.match.params.vid;
      let r = await fetch(`http://localhost:3000/api/vacations/${vvid}`);
      let jsonDATA = await r.json();
      dispatch({ type: "LOAD_V", data: jsonDATA });
    }
}

function saveVacaToServer(vaca) {
  return async function (dispatch) {
    let dc = (vaca.vc.id);
    let r = await fetch(`http://localhost:3000/api/vacations/${dc}`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(vaca)
    });
    const content = await r.json();
    if(content.msg=='OK'){
      alert('edit successful');
    }

  }
}

const adminEdit = connect(mapStateToProps, mapDispatchToProps)(AdminEdit);
export default adminEdit;

