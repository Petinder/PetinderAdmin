import React from 'react';
import { Form, Button, FormField } from 'semantic-ui-react';
import Validator from 'validator';
import InlineError from '../messages/InlineError';
import PropTypes from "prop-types";

class LoginForm extends React.Component {
    state = {
        data: {
            email: '',
            password: ''
        },
        loading: false,
        errors: {}
    }
 
    onChange = e => 
    this.setState({ 
        data: { ...this.state.data, [e.target.name]: e.target.value } 
    })

    onSubmit = () => {
        const errors = this.validate(this.state.data);
        this.setState({errors});
        if (Object.keys(errors).length == 0){
            this.props.submit(this.state.data);
        }
    }

    validate = (data) => {
        const errors = {};
        if (!Validator.isEmail(data.email)) errors.email = "Correo inválido";
        if (!data.password) errors.password = "Debe ingresar una contraseña";
        return errors;
    }

    render() {
        const { data, errors } = this.state;
        return (
            <Form onSubmit={this.onSubmit}>
                <FormField error={!!errors.email}>
                    <label htmlFor="email">Correo</label>
                    <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    placeholder="example@example.com"
                    value={data.email}
                    onChange={this.onChange}/>
                    {errors.email && <InlineError text={errors.email} />}
                </FormField>
                <FormField error={!!errors.password}>
                    <label htmlFor="password">Contraseña</label>
                    <input 
                    type="password" 
                    id="password" 
                    name="password" 
                    placeholder="Make it secure"
                    value={data.password}
                    onChange={this.onChange}/>
                    {errors.password && <InlineError text={errors.password} />}
                </FormField>
                <Button primary>Login</Button>
            </Form>
        );
    }
}

LoginForm.PropTypes = {
    submit: PropTypes.func.isRequired
};

export default LoginForm;