import React from 'react';
import { Form, Radio, FormInput, Image, Grid, Container, Menu, Advertisement } from 'semantic-ui-react';
import firebase from 'firebase';
import VetProfileForm from '../forms/VetProfileForm';

const RadioExampleToggle = () => <Radio toggle />

const OpcionesEspecie = [
    { key: 'c', text: 'Gato', value: 'Gato' },
    { key: 'd', text: 'Perro', value: 'Perro' },
]

const OpcionesSexo = [
    { key: 'f', text: 'Hembra', value: 'F' },
    { key: 'm', text: 'Macho', value: 'M' },
]

class FilterForm extends React.Component {
    constructor() {
        super();
        this.state = {
            radio: "",
            sexo: "",
            especie: "",
            pedigree: false,
            castrado: false,
            rootRef: firebase.database().ref().child('userPets'),
        };
    
        this.handleChangeR = this.handleChangeR.bind(this);
        this.handleChangeS = this.handleChangeS.bind(this);
        this.componentRand = this.componentRand.bind(this);
      }

    handleChangeR = (e, { value }) => {
        this.setState({ especie: value })
        console.log(value);
        this.componentRand(value, 'especie');
    }
    handleChangeS = (e, { value }) => {
        this.setState({ sexo: value })
        console.log(value);
        this.componentRand(value, 'sexo');
    }
    changeRadio = e => {
        this.setState({ [e.target.name]: e.target.checked });
        console.log("Valor ", e.target.checked, "nombre ", e.target.name)
    }

    tarjetas(snapshot, card){
        card.innerHTML += "<div class='ui card'>"+
                                "<div class='content'>"+
                                "<img src='" + snapshot.child('petInfo/petPhoto').val()+"'"+
                                    "class='ui medium right floated image'/>"+
                                "<div class='header'>" + snapshot.child('petInfo/petName').val() + "</div>"+
                                "<div class='meta'>" + snapshot.child('petInfo/petBreed').val()+"</div>"+
                                "<div class='description'>Nací el <strong>"+
                                    snapshot.child('petInfo/petBirthDate').val() +"</strong> y me gusta (descripción que ingrese el dueño)"+
                                "</div></div>"+
                                "<div class='extra content'>"+
                                "<div class='ui two buttons'>"+
                                    "<button class='ui green basic button' role='button'>Approve</button>"+
                                    "<button class='ui red basic button' role='button'>Decline</button>"+
                                "</div></div></div>"
    }
    handleLogout () {
        firebase.auth().signOut().then(function() {
            // Sign-out successful.
            console.log("Exito");
          }).catch(function(error) {
            // An error happened.
            console.log("Hay error", error);
          });
    }

    componentRand(value, filtro) {
        console.log("INGRESO");
        //const rootRef = firebase.database().ref().child('userPets');
        const card = document.querySelector("#cardPets");
        card.innerHTML = "";

        if(filtro === 'sexo'){
            if(this.state.especie === ""){
                this.state.rootRef.on('child_added', snapshot => {
                    if(value === 'M'){
                        if(snapshot.child('petInfo/petSex').val() === 'M'){
                            this.tarjetas(snapshot, card)
                        }
                    }else{
                        if(snapshot.child('petInfo/petSex').val() === 'F'){
                            this.tarjetas(snapshot, card)
                        } 
                    }
                });
            }else{
                this.state.rootRef.orderByChild("petInfo/petSpecies").equalTo(this.state.especie).on('child_added', snapshot => {
                    if(value === 'M'){
                        if(snapshot.child('petInfo/petSex').val() === 'M'){
                            this.tarjetas(snapshot, card)
                        }
                    }else{
                        if(snapshot.child('petInfo/petSex').val() === 'F'){
                            this.tarjetas(snapshot, card)
                        } 
                    }
                });
            }
        }else{
            if(this.state.sexo === ""){
                this.state.rootRef.on('child_added', snapshot => {
                    if(value === 'Gato'){
                        if(snapshot.child('petInfo/petSpecies').val() === 'Gato'){
                            this.tarjetas(snapshot, card)
                        }
                    }else{
                        if(snapshot.child('petInfo/petSpecies').val() === 'Perro'){
                            this.tarjetas(snapshot, card)
                        } 
                    }
                });
            }else{
                this.state.rootRef.orderByChild("petInfo/petSex").equalTo(this.state.sexo).on('child_added', snapshot => {
                    if(value === 'Gato'){
                        if(snapshot.child('petInfo/petSpecies').val() === 'Gato'){
                            this.tarjetas(snapshot, card)
                        }
                    }else{
                        if(snapshot.child('petInfo/petSex').val() === 'Perro'){
                            this.tarjetas(snapshot, card)
                        } 
                    }
                });
            }
        }        
    }

    componentDidMount() {
        const card = document.querySelector("#cardPets");

        this.state.rootRef.on('child_added', snapshot => {
            card.innerHTML += "<div class='ui card'>"+
                            "<div class='content'>"+
                            "<img src='" + snapshot.child('petInfo/petPhoto').val()+"'"+
                                "class='ui medium right floated image'/>"+
                            "<div class='header'>" + snapshot.child('petInfo/petName').val() + "</div>"+
                            "<div class='meta'>" + snapshot.child('petInfo/petBreed').val()+"</div>"+
                            "<div class='description'>Soy un <strong>"+
                                snapshot.child('petInfo/petSpecies').val() +"</strong> que nací el "+ snapshot.child('petInfo/petBirthDate').val()+
                            "</div></div>"+
                            "<div class='extra content'>"+
                            "<div class='ui two buttons'>"+
                                "<button class='ui green basic button' role='button'>Agregar</button>"+
                                "<button class='ui red basic button' role='button'>Ignorar</button>"+
                            "</div></div></div>"
        });
    }

    render() {
        const {sexo, especie, pedigree, castrado} = this.state
        return (
            <Form>
                <Menu fixed='top' inverted color='yellow'>
                <Container>
                    <Menu.Item as='a' header >
                    <Image size='mini' src='https://firebasestorage.googleapis.com/v0/b/petinder-fc7b6.appspot.com/o/petinder_Pgt_icon.ico?alt=media&token=b9eb3058-8b25-4065-a5ef-db37bad65134' style={{ marginRight: '1.5em' }} />
                    Petinder Admin
                    </Menu.Item>
                    <Menu.Item position='right'>
                        <Menu.Item as='a'>
                            <a class="userm popup icon" data-tooltip="Subir Veterinario" data-position="bottom right" href = "/profile" role="button">
                            <i class="user md icon" ></i>
                            </a>
                        </Menu.Item>
                        <Menu.Item as='a'>
                            <a class="dollar sign icon" data-tooltip="Subir Anuncio" data-position="bottom right" href = "/ad" role="button">
                            <i class="dollar sign icon" ></i>
                            </a>
                        </Menu.Item>
                        <Menu.Item as='a'>
                            <a class="signo popup icon button" data-tooltip="Cerrar sesión" data-position="bottom left" role="button" href = "/login" onClick={this.handleLogout}>
                            <i class="sign out alternate icon"></i>
                            </a>
                        </Menu.Item>
                    </Menu.Item>
                </Container>
                </Menu>
                
                <Grid>
                <Grid.Column width={4}>
                    <div class= "ui sticky fixed top">
                    <br/><br/>
                    <br/><br/>
                    <br></br>
                        <Form.Select
                            fluid
                            selection
                            label='Especie'
                            options={OpcionesEspecie}
                            value={especie}
                            placeholder='Especie'
                            onChange={this.handleChangeR}
                        />
                        <br/><br/>
                        <Form.Select
                            fluid
                            selection
                            label='Sexo'
                            options={OpcionesSexo}
                            value={sexo}
                            placeholder='Sexo'
                            onChange={this.handleChangeS}
                        />
                        <br/><br/>
                        <label>Otras opciones:</label>
                        <Form.Group inline>
                            <FormInput
                                label='Pedigree' 
                                name="pedigree" 
                                type='checkbox' 
                                checked={pedigree}
                                onChange={this.changeRadio}
                            />
                            <FormInput 
                                label='Castrado' 
                                name="castrado" 
                                type='checkbox' 
                                checked={castrado} 
                                onChange={this.changeRadio}
                            />
                        </Form.Group>
                        <br/><br/>
                        <button class="negative ui button">Eliminar filtro</button>
                    </div>
                </Grid.Column>
                <Grid.Column width={9}>
                    <br/><br/>
                    <div class='ui cards' id ='cardPets'>
                    </div>
                </Grid.Column>
                </Grid>
            </Form>
        );
    }
}
export default FilterForm;