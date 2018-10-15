import React from 'react';
import { Form, Radio, FormInput, Image, Grid, Container, Menu, Advertisement } from 'semantic-ui-react';
import firebase from 'firebase';

const RadioExampleToggle = () => <Radio toggle />

class TerminosForm extends React.Component {
    constructor() {
        super();
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
                    <div class="ui inverted segment">
                    <p>En construcción...</p>
                    </div>
                </Grid.Column>
                </Grid>
            </Form>
        );
    }
}
export default TerminosForm;