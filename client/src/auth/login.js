import React,{Component} from 'react';
import axios from 'axios'
import './login.css'


export default class Login extends Component{
  constructor(props){
    super(props);
    this.state={
      email:'',
      password:'',
      loggedIn:false,
      authen:'',
      name:'',
      avatar:''
    }
    this.userLogin=this.userLogin.bind(this);
    this.handleChange=this.handleChange.bind(this);
  }
  userLogin(event){
    event.preventDefault()
    const logData={
      email:this.state.email,
      password: this.state.password
    }
    var self =this;
    axios.post('/users/login',logData)
    .then(function(res){
      console.log(res.data)
      const tok=res.data.Token

      self.setState({loggedIn:true})
      self.setState({authen:tok})
    })
    .catch(function(err){
      var element = document.getElementById("errAlert");
      const getErrs=Object.keys(err.response.data).map(i=>err.response.data[i]);
      element.innerHTML += getErrs;
      element.classList.remove("errAlert");
      element.classList.add("showAlert");
      return true
    })
  }

  handleChange(event){
    this.setState({[event.target.name]:event.target.value})
  }
  render(){
    var users=this.state.loggedIn
    if(users){
      axios.get('/users/current',{ headers: { Authorization: this.state.authen } })
      .then(res=>{
        // console.log(res.data)
        this.setState({name:res.data.name,avatar:res.data.avatar,email:res.data.email})
      })
      .catch(err=>console.log(err))
    }
    return(
      <div className=" container text-center">
      { users?
        <div className="card" style={{width:'18rem',marginTop:'1em'}}>
          <img className="card-img-top" src={"http:"+this.state.avatar} alt="userpic"/>
          <h5 className="card-title">{this.state.name}</h5>
          <div className="card-body">
            <p className="card-text">{this.state.email}</p>
          </div>
        </div>
        : <div className="loginbox text-center">
        <div className="alert alert-danger errAlert" id="errAlert"></div>
      <form onSubmit={this.userLogin}>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1" id="emailLabel">Email address</label>
          <input type="email" name="email" value={this.state.email} onChange={this.handleChange} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" required />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1" id="passLabel">Password</label>
          <input type="password" name="password" value={this.state.password} onChange={this.handleChange} className="form-control" id="exampleInputPassword1" placeholder="Password" required />
        </div>
        <button type="submit" className="btn btn-primary loginbtn">Log in</button>
      </form>
      </div> }

      </div>
    )
  }
}
