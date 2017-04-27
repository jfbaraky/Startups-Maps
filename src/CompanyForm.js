import React from 'react';
import * as firebase from 'firebase'
import './CompanyForm.css';

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
            validated: false
        };
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick()  {
        console.log("Botão foi clicado!");
        this.newCompany = ( {
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
            validated: false          
        })
        firebase.database().ref('company/').push(this.newCompany);
        console.log("- Envio Concluido");
    }
    render(){
        return (
            <div>
                <h1> Cadastro de Startup </h1>
                <label htmlFor="razao">Razão:</label>
                <input type="text" id="razao"/>
                <label htmlFor="cnpj">CNPJ:</label>
                <input type="text" id="cnpj"/>
                <label htmlFor="localizacao">Localização:</label>
                <input type="text" id="localizacao" />
                <label htmlFor="site">Site:</label>
                <input type="text" id="site" />
                <label htmlFor="colaboradores">Número de colaboradores:</label>
                <input type="text" id="colaboradores" />
                <label htmlFor="data-inicio">Data de início:</label>
                <input type="date" id="data-inicio" />
                <label htmlFor="area-atuacao">Área de atuação:</label>
                <input type="text" id="area-atuacao" />
                <label htmlFor="logo">Logo Upload:</label>
                <input type="text" id="logo" />
                <label htmlFor="situacao">Situação de atividade:</label>
                <input type="text" id="situacao" />
                <label htmlFor="produto">Principal Produto:</label>
                <input type="text" id="produto" />
                <label htmlFor="publico">Público Alvo:</label>
                <input type="text" id="publico" />
                <label htmlFor="faturamento">Faturamento Anual:</label>
                <input type="text" id="faturamento" />
                <label htmlFor="investidores">Investidores:</label>
                <input type="text" id="investidores" />
                <label htmlFor="capital">Capital Primário:</label>
                <input type="text" id="capital" />
                <button onClick={this.handleClick}>Submit</button>
            </div>
        );
    }
}

export default CompanyForm;
