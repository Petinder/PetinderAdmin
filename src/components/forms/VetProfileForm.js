import React from 'react';
import { Form, Button, FormField, Header, Grid, Input,
    Image, Container, Menu, Radio, TextArea, Progress } from 'semantic-ui-react';
import { DateInput } from 'semantic-ui-calendar-react';
import Validator from 'validator';
import InlineError from '../messages/InlineError';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';
import firebase from 'firebase';
import 'firebase/database';

class VetProfileForm extends React.Component {
    constructor () {
        super();
        this.state = {
            user: null,
            consultingRoomName: "",
            ownerPhone: "",
            vetName: "",
            vetBirthDate: "",
            photoURL: 'https://react.semantic-ui.com/images/wireframe/image.png',
            uploadValue: 0
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleText = this.handleText.bind(this);
        this.handleUpload = this.handleUpload.bind(this);
    }

    componentWillMount(){
        firebase.auth().onAuthStateChanged(user => {
            this.setState({ user });
          });
        
    }

    handleUpload(event) {
        const file = event.target.files[0];
        const storageRef = firebase.storage().ref(`fotosA/${file.name}`);
        const task = storageRef.put(file);
        task.on('state_changed', (snapshot) => {
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            this.setState({
                uploadValue: progress
            })
          }, (error) => {
            console.log('Error ', error.message);
          }, () => {
            task.snapshot.ref.getDownloadURL().then((downloadURL) => {
                this.setState({photoURL: downloadURL, uploadValue: 100})
            });
          });
    }
      
    handleText(){
        const record = {
            userAdmin:{
                adminName: this.state.user.displayName
            },
            ownerAdInfo: {
                name: this.state.data.consultingRoomName,
                phone: this.state.data.ownerPhone
            },
            adInfo: {
                adName: this.state.data.vetName,
                adReleaseDate: this.state.vetBirthDate,
                adPhoto: this.state.photoURL
            }
        }
        console.log(record)
        const dbRef = firebase.database().ref('picturesA');
        const Data = dbRef.push();
        Data.set(record);

    }
 
    onChange = e => 
    this.setState({ 
        data: { ...this.state.data, [e.target.name]: e.target.value } 
    })

    handleChange = (e, { name, value }) => {
        this.setState({ [name] : value });
    }
    

    validate = (data) => {
        const errors = {};
        if (Validator.isEmpty(data.consultingRoomName)) errors.consultingRoomName = "Debe ingresar un nombre";
        if (!Validator.isMobilePhone(data.ownerPhone)) errors.ownerPhone = "Número inválido";
        if (Validator.isEmpty(data.vetName)) errors.vetName = "Debe ingresar un nombre";
        return errors;
    };

    render() {
        const { ownerPhone } = this.state.ownerPhone;
        const { vetName } = this.state.vetName;
        const { consultingRoomName } = this.state.consultingRoomName;

        return (
            <Form>
                <Menu fixed='top' inverted color='yellow'>
                <Container>
                    <Menu.Item as='a' header href = "/home">
                    <Image size='mini' src='https://firebasestorage.googleapis.com/v0/b/petinder-fc7b6.appspot.com/o/petinder_Pgt_icon.ico?alt=media&token=b9eb3058-8b25-4065-a5ef-db37bad65134' style={{ marginRight: '1.5em' }} />
                    Petinder Admin
                    </Menu.Item>
                    <Menu.Item position='right'>
                        <Menu.Item as='a'>
                            <a class="signo popup icon button" data-tooltip="Regresar al inicio" data-position="bottom left" role="button" active href = "/home">
                            <i class="home icon"></i>
                            </a>
                        </Menu.Item>
                    </Menu.Item>
                </Container>
                </Menu>

                <Grid columns={3} divided>
                <Grid.Column width={5.5}>
                    <br></br>
                    <Header as='h3' align="center">Foto Veterinario</Header>

                    <div position="centered">  
                        <Image width="250" src={this.state.photoURL} centered />
                        <br/>
                        <div class="ui yellow progress">
                        <Progress value={this.state.uploadValue} total='100' progress />
                        </div>
                        <Input type="file" onChange={this.handleUpload} class="inputfile" id="InputPhoto"/>
                    </div>
                    
                </Grid.Column>
                <Grid.Column width={6}>
                <br></br>
                <Header as='h3' align="center">Datos Veterinario</Header>                    
                    <FormField>
                        <label htmlFor="vetName">Nombre</label>
                        <input 
                        type="text" 
                        id="vetName" 
                        name="vetName" 
                        placeholder="Nombre"
                        value={vetName}
                        onChange={this.onChange}/>
                    </FormField>
                    <br></br>
                    <Grid columns='equal'>
                    </Grid>
                    <FormField>
                        <label htmlFor="vetName">Dirección</label>
                        <input 
                        type="text" 
                        id="vetName" 
                        name="vetName" 
                        placeholder="Dirección"
                        value={vetName}
                        onChange={this.onChange}/>
                    </FormField>
                    <FormField>
                        <label htmlFor="vetName">Número de Telefono</label>
                        <input 
                        type="text" 
                        id="vetName" 
                        name="vetName" 
                        placeholder="Telefono"
                        value={vetName}
                        onChange={this.onChange}/>
                    </FormField>
                    <Header as='h3' align="center">Experiecia</Header>
                    <FormField>
                        <label htmlFor="vetName">Institución de egreso</label>
                        <input 
                        type="text" 
                        id="vetName" 
                        name="vetName" 
                        placeholder="Nombre de la Institución"
                        value={vetName}
                        onChange={this.onChange}/>
                    </FormField>
                    <br></br>
                    <Grid columns='equal'>
                    </Grid>
                    <FormField>
                        <label htmlFor="vetName">Años de Experiencia</label>
                        <input 
                        type="text" 
                        id="vetName" 
                        name="vetName" 
                        placeholder="Años"
                        value={vetName}
                        onChange={this.onChange}/>
                    </FormField>
                    <label><b>Experiencia adicional</b></label>
                    <TextArea
                        label="Experiencia Adicional"
                        id="petDescription" 
                        name="petDescription"
                        value={consultingRoomName}
                        onChange={this.handleChange}
                        label="Experiencia Adicional"
                        maxlength = "300"
                        placeholder="Breve descripción de 300 caracteres como máximo..."/>
                </Grid.Column>
                <Grid.Column width={4}>
                <br></br>
                    <Header as='h3' align="center">Servicios</Header>
                    <FormField>
                        <label htmlFor="consultingRoomName">Nombre del Consultorio</label>
                        <input 
                        type="text" 
                        id="consultingRoomName" 
                        name="consultingRoomName" 
                        placeholder="Nombre"
                        value={consultingRoomName}
                        onChange={this.onChange}/>
                    </FormField>
                    <FormField>
                        <label htmlFor="ownerPhone">Número de teléfono del Consultorio</label>
                        <input 
                        type="text" 
                        id="ownerPhone" 
                        name="ownerPhone" 
                        placeholder="Número de teléfono"
                        value={ownerPhone}
                        onChange={this.onChange}/>
                    </FormField>
                    <label><b>Servicios adicionales</b></label>
                    <TextArea
                        label="Experiencia Adicional"
                        id="petDescription" 
                        name="petDescription"
                        value={consultingRoomName}
                        onChange={this.handleChange}
                        label="Experiencia Adicional"
                        maxlength = "150"
                        placeholder="Breve descripción de 150 caracteres como máximo..."/>
                    <Grid.Column>
                    <label><b>Cirugía:</b></label>
                    <Form.Group inline>
                    <Form.Field>
                    <Radio
                        label='Si'
                        name='petPedigree'
                        value='1'
                        checked={this.state.petPedigree === '1'}
                        onChange={this.handleChange}
                    />
                    </Form.Field>
                    <Form.Field>
                    <Radio
                        label='No'
                        name='petPedigree'
                        value='0'
                        checked={this.state.petPedigree === '0'}
                        onChange={this.handleChange}
                    />
                    </Form.Field>
                    </Form.Group>
                    </Grid.Column>
                    <Grid.Column>
                    <Form.Select
                        fluid
                        selection
                        label='Dias que atiende'
                        placeholder='Escoge una opcion'
                        onChange={this.handleChangeSpecies}
                    />
                    </Grid.Column>
                    <br/><br/>
                    <Button onClick={this.handleText} primary>Registrar</Button>
                    <br/>
                </Grid.Column>
                </Grid>
            </Form>
        );
    }
}


export default VetProfileForm;