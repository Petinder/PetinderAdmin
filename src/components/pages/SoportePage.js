import React from 'react';
import SoporteForm from "../forms/SoporteForm";
import 'firebase/database';

class SoportePage extends React.Component {
    submit = data => 
        this.props.login(data).then(() => this.props.history.push("/"));

    render(){
        return(
           <div>
            <SoporteForm submit={this.submit} />
           </div>
        );
    }
}

export default SoportePage;