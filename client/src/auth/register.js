import React,{Component} from 'react';
import axios from 'axios'

export default class Register extends Component{
  constructor(props){
    super(props);
    this.state={
      fullname:'',
      email:'',
      password:'',
      password2:''
    }
    this.registerUser=this.registerUser.bind(this);
    this.handleChange=this.handleChange.bind(this);
  }
  registerUser(event){
    event.preventDefault()
    //validation part of the passwords
    if(this.state.password.length<5){
      document.getElementById("invld2").style.display = "block";
      return
    }
    else{
        document.getElementById("invld2").style.display = "none";
    }
    if(this.state.password!==this.state.password2){
      document.getElementById("invld").style.display = "block";
      return
    }
    else{
      document.getElementById("invld").style.display = "none";

    }

    const newUser={
      name:this.state.fullname,
      email:this.state.email,
      password:this.state.password,
      password2:this.state.password2
    }

    axios.post('/users/register',newUser)
    .then(function(res){
      console.log(res.data)
      var element = document.getElementById("succAlert");
      element.classList.remove("stopAlert");
      element.classList.add("showAlert");
      setTimeout(function(){
        window.location.href="/login"
      },3000)
    })
    .catch(function(err){
      console.log(err.response.data)
      var element = document.getElementById("errAlert");
      const getErrs=Object.keys(err.response.data).map(i=>err.response.data[i]);
      element.innerHTML += getErrs;
      element.classList.remove("errAlert");
      element.classList.add("showAlert");
    })
  }
  handleChange(event){
    if(event.target.id==='exampleInputfName'){
      this.setState({fullname:event.target.value})
    }
    else if (event.target.id==='exampleInputEmail1') {
      this.setState({email:event.target.value})
    }
    else if (event.target.id==='exampleInputPassword1') {
      this.setState({password:event.target.value})
    }
    else if(event.target.id==='exampleInputPassword2'){
      this.setState({password2:event.target.value})
    }
    else{
      console.log('Something went wrong')
    }
  }

  render(){
    return(
      <div className=" container text-center">
      <div className="alert alert-danger errAlert" id="errAlert"></div>
      <div className="alert alert-success stopAlert" id="succAlert">You have been successfully registered with us.</div>
      <div className="loginbox text-center">
      <form onSubmit={this.registerUser}>
        <div className="form-group">
          <label htmlFor="exampleInputfName" id="emailLabel">Full Name</label>
          <input type="text" className="form-control" onChange={this.handleChange} value={this.state.fullname} id="exampleInputfName" aria-describedby="emailHelp" placeholder="Enter Full Name" required />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1" id="emailLabel">Email address</label>
          <input type="email" className="form-control" onChange={this.handleChange} value={this.state.email} id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email id" required />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1" id="passLabel">Password</label>
          <input type="password" className="form-control" onChange={this.handleChange} value={this.state.password} id="exampleInputPassword1" placeholder="Enter a Password" required />
          <div className="invalid-feedback" id="invld2">Password should be atleast 5 characters.</div>
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword2" id="passLabel">Confirm Password</label>
          <input type="password" className="form-control" onChange={this.handleChange} value={this.state.password2} id="exampleInputPassword2" placeholder="Re-enter Password" required />
          <div className="invalid-feedback" id="invld">Confirm Password doesn't match.</div>
        </div>
        <div className="form-group form-check">
          <input type="checkbox" className="form-check-input"  id="exampleCheck1" required />
          <label className="form-check-label" htmlFor="exampleCheck1">Agree to The Terms & Conditions</label>
        </div><br/>
        <button type="submit" className="btn btn-primary regbtn">Register</button>
      </form>
      </div>

      </div>
    )
  }
}
