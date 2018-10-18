
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

const optionsS = [
    { key: '0', text: 'Perros', value: 'Perros' },
    { key: '1', text: 'Gatos', value: 'Gatos' },
    { key: '2', text: 'Perros/Gatos', value: 'Perros/Gatos' },
    { key: '3', text: 'Perros/Gatos/Otros', value: 'Perros/Gatos/Otros' }
  ]

class VetProfileForm extends React.Component {
    constructor () {
        super();
        this.state = {
            user: null,
            vetName: "",
            vetAddress: "",
            vetPhone: "",
            vetInstitutionOfEgress: "",
            vetYearsExperience: "",
            vetAditionalExperience: "",
            clinicName: "",
            clinicPhone: "",
            clinicAditionalServices: "",
            description: "",
            surgery: "",
            clinicServeDays: "",
            animalThatServes: "",
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
        const storageRef = firebase.storage().ref(`fotosV/${file.name}`);
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
            vetInfo: {
                name: this.state.data.vetName,
                phone: this.state.data.vetPhone,
                photo: this.state.photoURL,
                address: this.state.data.vetAddress
            },
            experience: {
                graduateInstitution: this.state.data.vetInstitutionOfEgress,
                experienceYears: this.state.data.vetYearsExperience,
                AditionalExpertise: this.state.vetAditionalExperience
            },
            services:{
                clinicName: this.state.data.clinicName,
                clinicPhone: this.state.data.clinicPhone,
                clinicAditionalServices: this.state.clinicAditionalServices,
                vetDescription:this.state.description,
                surgery: this.state.surgery,
                animalThatServes: this.state.animalThatServes 
            }
        }
        console.log(record)
        const dbRef = firebase.database().ref('userVets');
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
    
    handleChangeServe = (e, { value }) => {
        this.setState({ animalThatServes: value });
    }

    validate = (data) => {
        const errors = {};
        if (Validator.isEmpty(data.vetName)) errors.vetName = "Debe ingresar un nombre";
        if (Validator.isEmpty(data.vetAddress)) errors.vetAddress = "Debe ingresar una dirección";
        if (Validator.isEmpty(data.vetPhone)) errors.vetPhone = "Debe ingresar un Teléfono";
        return errors;
    };

    render() {
        const { vetName } = this.state.vetName;
        const { vetAddress } = this.state.vetAddress;
        const { vetPhone } = this.state.vetPhone;
        const { vetAditionalExperience } = this.state.vetAditionalExperience;
        const { vetYearsExperience } = this.state.vetYearsExperience;
        const { vetInstitutionOfEgress } = this.state.vetInstitutionOfEgress;
        const { clinicName } = this.state.clinicName;
        const { clinicPhone } = this.state.clinicPhone;
        const { clinicAditionalServices } = this.state.clinicAditionalServices;
        const { description } = this.state.description;
        const { animalThatServes } = this.state.animalThatServes;
        
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
                        <label htmlFor="vetAddress">Dirección</label>
                        <input 
                        type="text" 
                        id="vetAddress" 
                        name="vetAddress" 
                        placeholder="Dirección"
                        value={vetAddress}
                        onChange={this.onChange}/>
                    </FormField>
                    <FormField>
                        <label htmlFor="vetPhone">Número de Telefono</label>
                        <input 
                        type="text" 
                        id="vetPhone" 
                        name="vetPhone" 
                        placeholder="Telefono"
                        value={vetPhone}
                        onChange={this.onChange}/>
                    </FormField>
                    <Header as='h3' align="center">Experiecia</Header>
                    <FormField>
                        <label htmlFor="vetInstitutionOfEgress">Institución de egreso</label>
                        <input 
                        type="text" 
                        id="vetInstitutionOfEgress" 
                        name="vetInstitutionOfEgress" 
                        placeholder="Nombre de la Institución"
                        value={vetInstitutionOfEgress}
                        onChange={this.onChange}/>
                    </FormField>
                    <br></br>
                    <Grid columns='equal'>
                    </Grid>
                    <FormField>
                        <label htmlFor="vetYearsExperience">Años de Experiencia</label>
                        <input 
                        type="text" 
                        id="vetYearsExperience" 
                        name="vetYearsExperience" 
                        placeholder="Años"
                        value={vetYearsExperience}
                        onChange={this.onChange}/>
                    </FormField>
                    <label><b>Experiencia adicional</b></label>
                    <TextArea
                        label="Experiencia Adicional"
                        id="vetAditionalExperience" 
                        name="vetAditionalExperience"
                        value={vetAditionalExperience}
                        onChange={this.handleChange}
                        label="Experiencia Adicional"
                        maxlength = "300"
                        placeholder="Breve descripción de 300 caracteres como máximo..."/>
                    </Grid.Column>
                <Grid.Column width={4}>
                <br></br>
                    <Header as='h3' align="center">Servicios</Header>
                    <FormField>
                        <label htmlFor="clinicName">Nombre del Consultorio</label>
                        <input 
                        type="text" 
                        id="clinicName" 
                        name="clinicName" 
                        placeholder="Nombre de la clínica"
                        value={clinicName}
                        onChange={this.onChange}/>
                    </FormField>
                    <FormField>
                        <label htmlFor="clinicPhone">Número de teléfono del Consultorio</label>
                        <input 
                        type="text" 
                        id="clinicPhone" 
                        name="clinicPhone" 
                        placeholder="Número de teléfono"
                        value={clinicPhone}
                        onChange={this.onChange}/>
                    </FormField>
                    
                    <label><b>Decripción Breve</b></label>
                    <TextArea
                        label="Descripción Breve"
                        id="description" 
                        name="description"
                        value={description}
                        onChange={this.handleChange}
                        label="Descripción"
                        maxlength = "200"
                        placeholder="Breve descripción de 200 caracteres como máximo..."/>

                    <label><b>Servicios adicionales</b></label>
                    <TextArea
                        label="Experiencia Adicional"
                        id="clinicAditionalServices" 
                        name="clinicAditionalServices"
                        value={clinicAditionalServices}
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
                        name='surgery'
                        value='1'
                        checked={this.state.surgery === '1'}
                        onChange={this.handleChange}
                    />
                    </Form.Field>
                    <Form.Field>
                    <Radio
                        label='No'
                        name='surgery'
                        value='0'
                        checked={this.state.surgery === '0'}
                        onChange={this.handleChange}
                    />
                    </Form.Field>
                    </Form.Group>
                    </Grid.Column>
                    
                    <Grid.Column>
                    <Form.Select
                        fluid
                        selection
                        label='Animales que atiende:'
                        options={optionsS}
                        value={animalThatServes}
                        placeholder='Escoge una opcion'
                        onChange={this.handleChangeServe}
                    />
                    </Grid.Column>
                    <br/><br/>

                    <p align="center">
                    <Button onClick={this.handleText} primary>Registrar</Button>
                    </p>
                    </Grid.Column>
                    <br/>
                </Grid>
            </Form>
        );
    }
}


export default VetProfileForm;