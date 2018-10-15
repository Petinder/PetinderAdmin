import React from 'react';
import { Form, Radio, FormInput, Image, Grid, Container, Menu, Advertisement } from 'semantic-ui-react';
import firebase from 'firebase';

const RadioExampleToggle = () => <Radio toggle />

class SoporteForm extends React.Component {
    constructor() {
        super();
        this.state = {
            rootRef: firebase.database().ref().child('admins'),
        };
      }

    componentDidMount() {
        const card = document.querySelector("#cardAdmins");

        this.state.rootRef.on('child_added', snapshot => {
            card.innerHTML += "<div class='ui centered card'>"+
                            "<div class='content'>"+
                            "<img src='" + snapshot.child('photo').val()+"'"+
                                "class='ui medium right floated image'/>"+
                            "<div class='header'>" + snapshot.child('alias').val() + "</div>"+
                            "<div class='meta'>" + snapshot.child('job').val()+"</div>"+
                            "<div class='description'>Estoy a cargo del <strong>"+
                                snapshot.child('department').val() +"</strong>. Puedes contactarme al siguiente número: "+ snapshot.child('contacto').val()+
                            "</div></div>"+
                            "</div>"
        });
    }

    render() {
        return (
            <Form>
                <Menu fixed='top' inverted color='yellow'>
                <Container>
                    <Menu.Item as='a' header href = "/login" >
                    <Image size='mini' src='https://firebasestorage.googleapis.com/v0/b/petinder-fc7b6.appspot.com/o/petinder_Pgt_icon.ico?alt=media&token=b9eb3058-8b25-4065-a5ef-db37bad65134' active href = "/login" style={{ marginRight: '1.5em' }} />
                    Petinder Admin
                    </Menu.Item>
                    <Menu.Item position='right'>
                        <Menu.Item as='a'>
                            <a class="signo popup icon button" data-tooltip="Regresar al inicio" data-position="bottom left" role="button" active href = "/login">
                            <i class="home icon"></i>
                            </a>
                        </Menu.Item>
                    </Menu.Item>
                </Container>
                </Menu>
                <Grid>
                <Grid.Column width={0}>
                    <br/><br/>
                    <div class='ui cards' id ='cardAdmins'>
                    </div>
                </Grid.Column>
                </Grid>
            </Form>
        );
    }
}
export default SoporteForm;