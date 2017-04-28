import React from 'react';
import * as firebase from 'firebase'
import './CompanyForm.css';
import axios from 'axios';


class CompanyForm extends React.Component{
    constructor(props) {
        super(props);
        this.newCompany = {
            razao: '',
            telefone: '',
            cnpj: '',
            localizacao: '',
            site: '',
            datainicio: '',
            areaatuacao: '',
            logo: '',
            situacao: '',
            produto: '',
            publico: '',
            faturamento: '',
            investidores: '',
            capital: '',
            validated: false,
            coordenadas: ''
        };
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick()  {
        const API_KEY = "AIzaSyAosQCjfUicx1aC_YCAQjOP56JNbNiBzN4";
        console.log("Botão foi clicado!");
        var address = document.getElementById('localizacao').value;
        address = address.replace(' ','+');
        axios.get('https://maps.googleapis.com/maps/api/geocode/json?address=' + address + '&key=' + API_KEY)
            .then((response) => {
            console.log(response);
                if(!response.data.status.localeCompare("OK")){
                    this.newCompany =  {
                        razao: document.getElementById('razao').value,
                        telefone: document.getElementById('telefone').value,
                        cnpj: document.getElementById('cnpj').value,
                        localizacao: document.getElementById('localizacao').value,
                        site: document.getElementById('site').value,
                        datainicio: document.getElementById('data-inicio').value,
                        areaatuacao: document.getElementById('area-atuacao').value,
                        logo: document.getElementById('logo').value,
                        situacao: document.getElementById('situacao').value,
                        produto: document.getElementById('produto').value,
                        publico: document.getElementById('publico').value,
                        faturamento: document.getElementById('faturamento').value,
                        investidores: document.getElementById('investidores').value,
                        capital: document.getElementById('capital').value,
                        validated: false,
                        coordenadas: response.data.results[0].geometry.location
                    };
                    var newUpdateKey = firebase.database().ref().child('posts').push().key;
                    var updatePatch = 'teste/' + newUpdateKey;
                    firebase.database().ref(updatePatch).update(this.newCompany,(result)=>{
                        if(result==null){
                            console.log("Upload para Firebase Concluido");
                        }
                        else{
                            alert("Não houve comunicação com o Firebase");
                            console.log(result);
                        }

                    });
                }
                else{
                    alert("Endereço Inválido \r\n\r\n Informa da seguinte maneira: ");
                    console.log("Geocoder não retornou um endereço válido");
                }

            }).catch((erro)=>{
                console.log(erro);
        });
    }
    render(){
        return (
            <div>
                <h1> Cadastro de Startups </h1>

                <h2 className="formTitle"> Dados Principais </h2>

                <div>
                    <label className="formLabel" htmlFor="razao">Razão:</label>
                    <input
                        className="formInput"
                        type="name"
                        id="razao"
                        placeholder="Nome da Empresa"
                        required
                    />
                </div>
                <div>
                    <label className="formLabel" htmlFor="telefone">Telefone:</label>
                    <input
                        className="formInput"
                        type="tel"
                        id="telefone"
                        placeholder="(XX)XXXXX-XXXX"
                        required
                    />
                </div>
                <div>
                    <label className="formLabel" htmlFor="site">Site:</label>
                    <input
                        className="formInput"
                        type="url"
                        id="site"
                        placeholder="Site da Empresa"
                        required
                    />
                </div>
                <div>
                    <label className="formLabel" htmlFor="localizacao">Localização:</label>
                    <input
                        className="formInput"
                        type="text"
                        id="localizacao"
                        placeholder="Endereço da Empresa"
                        required
                    />
                </div>
                <div>
                    <label className="formLabel" htmlFor="data-inicio">Data de início:</label>
                    <input className="formInput" type="date" id="data-inicio" required/>
                </div>
                <div>

                    <label className="formLabel" htmlFor="area-atuacao">Área de atuação:</label>
                    <select className="formSelect" id="area-atuacao">
                        <option value="startup">Startup</option>
                        <option value="aceleradora">Aceleradora</option>
                        <option value="incubadora">Incubadora</option>
                        <option value="investidores">Investidor</option>
                        <option value="evento">Evento</option>
                        <option value="desenvolvedor">Desenvolvedor</option>
                        <option value="coworking">Coworking</option>
                        <option value="consultoria">Consultoria</option>
                    </select>
                </div>
                <div>
                    <label className="formLabel" htmlFor="situacao">Situação de atividade:</label>
                    <select className="formSelect" id="situacao">
                        <option value="ativa">Ativa</option>
                        <option value="inativa">Inativa</option>
                    </select>
                </div>

                <h2> Dados Secundários </h2>

                <div>
                    <label className="formLabel" htmlFor="logo">Logo Upload:</label>
                    <input className="formInput" type="text" id="logo" />
                </div>
                <div>
                    <label className="formLabel" htmlFor="cnpj">CNPJ:</label>
                    <input className="formInput" type="text" id="cnpj"/>
                </div>
                <div>
                    <label className="formLabel" htmlFor="produto">Principal Produto:</label>
                    <input className="formInput" type="text" id="produto" />
                </div>
                <div>
                    <label className="formLabel" htmlFor="colaboradores">Número de colaboradores:</label>
                    <input className="formInput" type="text" id="colaboradores" />
                </div>
                <div>
                    <label className="formLabel" htmlFor="publico">Público Alvo:</label>
                    <input className="formInput" type="text" id="publico" />
                </div>
                <div>
                    <label className="formLabel" htmlFor="faturamento">Faturamento Anual:</label>
                    <input className="formInput" type="text" id="faturamento" />
                </div>
                <div>
                    <label className="formLabel" htmlFor="investidores">Investidores:</label>
                    <input className="formInput" type="text" id="investidores" />
                </div>
                <div>
                    <label className="formLabel" htmlFor="capital">Capital Primário:</label>
                    <input className="formInput" type="text" id="capital" />
                </div>
                <div>
                    <button className="formButton" type="reset" onClick={this.handleClick}>Submit</button>
                </div>
            </div>
        );
    }
}

export default CompanyForm;
