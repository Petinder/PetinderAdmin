import firebase from 'firebase';
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import {
  Button,
  Container,
  Header,
  Icon,
  Menu,
  Responsive,
  Segment,
  Sidebar,
  Visibility,
} from 'semantic-ui-react'

class LoginPage extends React.Component {
    //Manejar estados
    constructor (){
        super();
        this.state={
        //objeto
        user: null,
        picturesV: [],
        picturesA:[]
    };
  }

    handleAuth(){
        const provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider)
        .then(result => console.log(`${result.user.email} ha iniciado sesion`))
        .catch(error => console.log(`Error ${error.code}: ${error.message}`))
    }

    //Ciclo de vida
    componentWillMount(){
        firebase.auth().onAuthStateChanged(user => {
            if(user) {
                this.props.history.push("/home");
            }
          });
    }


    render(){
        return(
            <div class="ui inverted yellow vertical center aligned segment"  style={{ minHeight: 550, padding: '1em 0em' }}>
            <Segment
            inverted
            color='yellow'
            textAlign='center'
            style={{ minHeight: 700, padding: '1em 0em' }}
            vertical>
            <Menu
              inverted
              color='black'
              size='large'>
              <Container>
                <Menu.Item as='a' href = "/soporte" role="button">
                 Contáctanos
                </Menu.Item>
                <Menu.Item as='a' href = "/terminos" role="button">
                Términos y condiciones
                </Menu.Item>
                <Menu.Item position='right'>
                  <Button as='a' inverted onClick={this.handleAuth}>
                    Iniciar sesión
                  </Button>
                </Menu.Item>
              </Container>
            </Menu>
            <Container text>
                <Header
                as='h1'
                content='Petinder'
                inverted
                style={{
                    fontSize: '4em',
                    fontWeight: 'normal',
                    marginBottom: 0,
                    marginTop: '3em',
                }}
                />
                <Header
                as='h2'
                content='¡Conectando mascotas!'
                inverted
                style={{
                    fontSize: '1.7em',
                    fontWeight: 'normal',
                    marginTop: '1.5em',
                }}
                />
                <Button color="orange" size='huge' onClick={this.handleAuth}>
                Ingresar al Administrador
                <Icon name='right arrow' />
                </Button>
            </Container>
            </Segment>
        </div>
        );
    }
}

export default LoginPage;