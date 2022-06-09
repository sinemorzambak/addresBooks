import React,{Component} from 'react';
import {Consumer} from '../../context';
import TextInputGroup from '../layout/TextInputGroup';
import axios from 'axios';

class AddContact extends Component{
    
    state={
        name:'',
        email:'',
        home_address: '',
        work_address:'',
        phone:'',
        twitter:'',
        instagram: '',
        facebook:'',
        errors:{}
  
    }

onChange=e=>
{
    this.setState({[e.target.name]:e.target.value});
}
onSubmit=async(dispatch,e)=>
{
        e.preventDefault();

    const {name,email,phone,home_address,work_address,twitter,instagram,facebook}=this.state;
    
    //Hata Kontrolü
    if(name==='' )
        {
            this.setState({errors:{name:'İsim soyisim gereklidir!'}});
            return;
        }
    if(email==='' )
        {
            this.setState({errors:{email:'Email gereklidir!'}});
            return;
        }
    if(phone==='' )
        {
            this.setState({errors:{phone:'Telefon numarası gereklidir!'}});
            return;
        }
    if(home_address==='' )
        {
            this.setState({errors:{home_address:'Ev adresi gereklidir!'}});
            return;
        }
    if(work_address==='' )
        {
            this.setState({errors:{work_address:'İş adresi gereklidir!'}});
            return;
        }
    if(twitter==='' )
        {
            this.setState({errors:{twitter:'Twitter gereklidir!'}});
            return;
        }
    if(instagram==='' )
        {
            this.setState({errors:{instagram:'Instagram gereklidir !'}});
            return;
        }
    if(facebook==='' )
        {
            this.setState({errors:{facebook:'Facebook gereklidir!'}});
            return;
        }


    const newContact ={
        name,
        phone,
        email,
        home_address,
        work_address,
        twitter,
        instagram,
        facebook,
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
        instagram:'',
        facebook:'',
        errors:{},
    })
    
    //Yönlendirmek için 
    
    this.props.history.push('/');
}
    render()
    {
         
    const {name,email,phone,home_address, work_address,twitter,instagram,facebook, errors}=this.state;
        
        return(
        <Consumer>
            
            {value=>
            {
                const{dispatch}=value;
                return(
            <div className="card mb-3">
            <div className="card-header">
            Kişi Ekleme Sayfası
            </div>
            <div className="card-body">
            <form onSubmit={this.onSubmit.bind(this,dispatch)}>
                <TextInputGroup
                    label="Ad-Soyad"
                    name="name"
                    placeholder="Ad-Soyadınızı giriniz"
                    value={name}
                    onChange={this.onChange}
                    error={errors.name}
                  />
                  <TextInputGroup
                    label="Email"
                    name="email"
                    type="email"
                    placeholder="Email Girin"
                    value={email}
                    onChange={this.onChange}
                    error={errors.email}
                  />
                  <TextInputGroup
                    label="Telefon Numarası"
                    name="phone"
                    placeholder="Telefon numarası girin"
                    value={phone}
                    onChange={this.onChange}
                    error={errors.phone}
                  />
                  <TextInputGroup
                    label="Ev Adresi"
                    name="home_address"
                    placeholder="Ev Adresi Girin"
                    value={home_address}
                    onChange={this.onChange}
                    error={errors.home_address}
                  />
                  <TextInputGroup
                    label="İş Adresi"
                    name="work_address"
                    placeholder="İş Adresi Girin"
                    value={work_address}
                    onChange={this.onChange}
                    error={errors.work_address}
                  />
                  <TextInputGroup
                    label="Twitter "
                    name="twitter"
                    placeholder="Twitter Adresini Girin"
                    value={twitter}
                    onChange={this.onChange}
                    error={errors.twitter}
                  />
                  <TextInputGroup
                    label="Instagram "
                    name="instagram"
                    placeholder="Instagram Adresini Girin"
                    value={instagram}
                    onChange={this.onChange}
                    error={errors.instagram}
                  /><TextInputGroup
                    label="Facebook "
                    name="facebook"
                    placeholder="Facebook Adresini Girin"
                    value={facebook}
                    onChange={this.onChange}
                    error={errors.facebook}
                />
            
            <input type="submit"
            value="Kişiyi Ekle"
            className="btn btn-dark btn-block"/>
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