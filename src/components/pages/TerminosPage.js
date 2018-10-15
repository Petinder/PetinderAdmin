import React from 'react';
import TerminosForm from "../forms/TerminosForm";
import 'firebase/database';

class TerminosPage extends React.Component {
    submit = data => 
        this.props.login(data).then(() => this.props.history.push("/"));

    render(){
        return(
           <div>
            <TerminosForm submit={this.submit} />
           </div>
        );
    }
}

export default TerminosPage;