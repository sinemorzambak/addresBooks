import React,{Component} from 'react';
import {Consumer} from '../../context';
import TextInputGroup from '../layout/TextInputGroup';
import axios from 'axios';
class EditContact extends Component{
    //When you create a form, each input is going to be a part of the state.
    state={
        name:'',
        email:'',
        phone:'',
        home_address: '',
        work_address: '',
        twitter:'',
        errors:{}
  
    }

    async componentDidMount()
    {
        const {id} = this.props.match.params;
        const res = await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`);
        
        const contact = res.data;
        this.setState({name:contact.name,
                      email:contact.email,
                       phone:contact.phone,
                       work_address:contact.work_address,
                       home_address:contact.home_address,
                       twitter:contact.twitter,
                      })
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
            this.setState({errors:{work_address:'work address is required !'}});
            return;
        }
    if(twitter==='' )
        {
            this.setState({errors:{twitter:'twitter address is required !'}});
            return;
        }
    
    const updateContact ={
        name,
        phone,
        email,
        home_address,
        work_address,
        twitter,
    }
    
    //put request is to update
     const {id} = this.props.match.params;
        const res = await axios.put(`https://jsonplaceholder.typicode.com/users/${id}`,updateContact);
        
    
    dispatch({type:'UPDATE_CONTACT',payload:res.data});
    
    //Clear form
    this.setState({
        name:'',
        email:'',
        phone:'',
        home_address: '',
        work_address: '',
        twitter:'',
        errors:{},
    })
    
    //For redirection
    
    this.props.history.push('/');
}
    render()
    {
         
    const {name,email,phone,home_address, work_address, twitter,errors}=this.state;
        
        return(
        <Consumer>
            
            {value=>
            {
                const{dispatch}=value;
                return(
            <div className="card mb-3">
            <div className="card-header">
            Edit Contact
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
                    label="home_address"
                    name="home_address"
                    placeholder="Enter address"
                    value={home_address}
                    onChange={this.onChange}
                    error={errors.home_address}
                  />
                  <TextInputGroup
                    label="work_adress"
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
            value="Update Contact"
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

export default EditContact;