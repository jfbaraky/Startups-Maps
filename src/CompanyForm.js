import React from 'react';
import * as firebase from 'firebase'
import './CompanyForm.css';
import axios from 'axios';



class CompanyForm extends React.Component{
    constructor(props) {
        super(props);
        this.newCompany = {
            razao: '',
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
        var requisicao = axios.get('https://maps.googleapis.com/maps/api/geocode/json?address=' + address + '&key=' + API_KEY)
            .then((response) => {
                console.log(response.data.results[0].geometry.location.lat);
                this.newCompany =  {
                    razao: document.getElementById('razao').value,
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
                firebase.database().ref('company/').push(this.newCompany);
            });



    }
    render(){
        return (
            <div>
                <h1> Cadastro de Startups </h1>
                <div>
                    <label htmlFor="razao">Razão:</label>
                    <input type="text" id="razao"/>
                </div>
                <div>
                    <label htmlFor="cnpj">CNPJ:</label>
                    <input type="text" id="cnpj"/>
                </div>
                <div>
                    <label htmlFor="localizacao">Localização:</label>
                    <input type="text" id="localizacao" />
                </div>
                <div>
                    <label htmlFor="site">Site:</label>
                    <input type="text" id="site" />
                </div>
                <div>
                    <label htmlFor="colaboradores">Número de colaboradores:</label>
                    <input type="text" id="colaboradores" />
                </div>
                <div>
                    <label htmlFor="data-inicio">Data de início:</label>
                    <input type="date" id="data-inicio" />
                </div>
                <div>
                    <label htmlFor="area-atuacao">Área de atuação:</label>
                    <input type="text" id="area-atuacao" />
                </div>
                <div>
                    <label htmlFor="logo">Logo Upload:</label>
                    <input type="text" id="logo" />
                </div>
                <div>
                    <label htmlFor="situacao">Situação de atividade:</label>
                    <input type="text" id="situacao" />
                </div>
                <div>
                    <label htmlFor="produto">Principal Produto:</label>
                    <input type="text" id="produto" />
                </div>
                <div>
                    <label htmlFor="publico">Público Alvo:</label>
                    <input type="text" id="publico" />
                </div>
                <div>
                    <label htmlFor="faturamento">Faturamento Anual:</label>
                    <input type="text" id="faturamento" />
                </div>
                <div>
                    <label htmlFor="investidores">Investidores:</label>
                    <input type="text" id="investidores" />
                </div>
                <div>
                    <label htmlFor="capital">Capital Primário:</label>
                    <input type="text" id="capital" />
                </div>
                <div>
                    <button onClick={this.handleClick}>Submit</button>
                </div>
            </div>
        );
    }
}

export default CompanyForm;
