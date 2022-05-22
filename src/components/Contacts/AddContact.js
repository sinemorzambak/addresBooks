import React,{Component} from 'react';
import {Consumer} from '../../context';
import TextInputGroup from '../layout/TextInputGroup';
import axios from 'axios';
class AddContact extends Component{
    //When you create a form, each input is going to be a part of the state.
    state={
        name:'',
        email:'',
        home_address: '',
        work_address:'',
        phone:'',
        twitter:'',
        errors:{}
  
    }

onChange=e=>
{
    this.setState({[e.target.name]:e.target.value});
}
onSubmit=async(dispatch,e)=>
{
        e.preventDefault();

    const {name,email,phone,home_address,work_address,twitter}=this.state;
    
    //Check for Errors
    if(name==='' )
        {
            this.setState({errors:{name:'Name is required !'}});
            return;
        }
    if(email==='' )
        {
            this.setState({errors:{email:'Email is required !'}});
            return;
        }
    if(phone==='' )
        {
            this.setState({errors:{phone:'Phone is required !'}});
            return;
        }
    if(home_address==='' )
        {
            this.setState({errors:{home_address:'home address is required !'}});
            return;
        }
    if(work_address==='' )
        {
            this.setState({errors:{work_address:'home address is required !'}});
            return;
        }
    if(twitter==='' )
        {
            this.setState({errors:{twitter:'home address is required !'}});
            return;
        }

    const newContact ={
        name,
        phone,
        email,
        home_address,
        work_address,
        twitter,
    }
    
    const res = await axios.post('https://jsonplaceholder.typicode.com/users',newContact);
    
    dispatch({type:'ADD_CONTACT',payload:res.data});
    
    
    this.setState({
        name:'',
        email:'',
        phone:'',
        home_address: '',
        work_address:'',
        twitter:'',
        errors:{},
    })
    
    //For redirection
    
    this.props.history.push('/');
}
    render()
    {
         
    const {name,email,phone,home_address, work_address,twitter, errors}=this.state;
        
        return(
        <Consumer>
            
            {value=>
            {
                const{dispatch}=value;
                return(
            <div className="card mb-3">
            <div className="card-header">
            Add Contact
            </div>
            <div className="card-body">
            <form onSubmit={this.onSubmit.bind(this,dispatch)}>
                <TextInputGroup
                    label="Name"
                    name="name"
                    placeholder="Enter Name"
                    value={name}
                    onChange={this.onChange}
                    error={errors.name}
                  />
                  <TextInputGroup
                    label="Email"
                    name="email"
                    type="email"
                    placeholder="Enter Email"
                    value={email}
                    onChange={this.onChange}
                    error={errors.email}
                  />
                  <TextInputGroup
                    label="Phone"
                    name="phone"
                    placeholder="Enter Phone"
                    value={phone}
                    onChange={this.onChange}
                    error={errors.phone}
                  />
                  <TextInputGroup
                    label="Home address"
                    name="home_address"
                    placeholder="Enter address"
                    value={home_address}
                    onChange={this.onChange}
                    error={errors.home_address}
                  />
                  <TextInputGroup
                    label="Work adress"
                    name="work_address"
                    placeholder="Enter address"
                    value={work_address}
                    onChange={this.onChange}
                    error={errors.work_address}
                  />
                  <TextInputGroup
                    label="Twitter name"
                    name="twitter"
                    placeholder="Enter twitter name"
                    value={twitter}
                    onChange={this.onChange}
                    error={errors.twitter}
                  />
            
            <input type="submit"
            value="Add Contact"
            className="btn btn-light btn-block"/>
            </form>
            </div>
            </div>
                )
            }}
            </Consumer>
        
        )
        
    }
}

export default AddContact;