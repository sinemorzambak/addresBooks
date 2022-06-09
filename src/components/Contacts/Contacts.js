 // yapıcıyı yalnızca durumu başlatmak için kullanıyorsanız, bir yapıcıya ihtiyacınız yoktur, yalnızca bir sınıfın içine bir yapıcı olmadan doğrudan state ={} yazabilirsiniz

import React,{Component} from 'react';
import Contact from './Contact';
import {Consumer} from '../../context';

class Contacts extends Component{
    
   
  
    
    render()
    {
        return(
            <Consumer>
            {value=>
            {
            const {contacts} = value;
            return(
            <React.Fragment>
            <h1 className="display-4 mb-2"><span className="text-danger">Kişi </span> Listesi</h1>
            <h3>{this.props.heading}</h3>
            {contacts.map(contact=>(<Contact key={contact.id} contact={contact}
            />
            )
            )
            }
            </React.Fragment>
            )
            }}
            </Consumer>
        
        );
        
}}

export default Contacts;