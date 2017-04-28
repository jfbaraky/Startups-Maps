import React from 'react';
import * as firebase from "firebase";
import './CompanyList.css';


class CompanyList extends React.Component{
    constructor(){
        super();
        this.state={
            company: null
        };
    }
    readDB(){
        console.log("readDB");
        var companiesRef = firebase.database().ref('teste/');
        var list = [];
        companiesRef.once('value').then(function(snapshot){
            list = snapshot.val();
            var arr = Object.keys(list).map(function(key){
                return{
                    _id:key,
                    razao: list[key].razao,
                    site: list[key].site,
                    validated: list[key].validated
                };
            })
            this.setState({company:arr});
        }.bind(this))
    }

    deleteCompany(ID){
        console.log("Removendo Empresa");
        var updatePatch = 'teste/' + ID;
        firebase.database().ref(updatePatch).remove((result)=>{
            if(result==null){
                console.log("Remoção da Firebase Concluida");
            }
            else{
                alert("Não houve comunicação com o Firebase");
                console.log(result);
            }
        });;
        this.readDB();
    }

    approveCompany(ID){
        console.log("Aprovando Empresa");
        var updatePatch = 'teste/' + ID;
        var aprove = {validated: true}
        firebase.database().ref(updatePatch).update(aprove,(result)=>{
            if(result==null){
                console.log("Upload da Firebase Concluido (Aprovação)");
            }
            else{
                alert("Não houve comunicação com o Firebase");
                console.log(result);
            }
        });
        this.readDB();
    }
    rejectCompany(ID){
        console.log("Rejeitando Empresa");
        var updatePatch = 'teste/' + ID;
        var reject = {validated: false}
        firebase.database().ref(updatePatch).update(reject,(result)=>{
            if(result==null){
                console.log("Upload para Firebase Concluido (Rejeição)");
            }
            else{
                alert("Não houve comunicação com o Firebase");
                console.log(result);
            }
        });
        this.readDB();
    }

    componentWillMount(){
        this.readDB();
    }
    render(){
        console.log("CompanyList render");
        return(
            <div>
                {this.state.company==null?
                    <div>Carregando...</div>
                    :
                    <div>
                        <h1 className="dashboardTitle">Lista de Empresas</h1>
                        <h2 className="dashboardTitle">{this.state.company.length} registros inseridos</h2>
                        <table className="dashboardHeader">
                            <thead>
                                <tr>
                                    <th>Nome</th>
                                    <th>Mostrar no Mapa</th>
                                    <th colSpan="4">Controle</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.company.map(function(startup){
                                    return(
                                        <tr key={startup._id}>
                                            <td>
                                                <a className="dashboardName" href={startup.site}>{startup.razao}</a>
                                            </td>
                                            <td>
                                                {startup.validated===true?
                                                    <div className="validada">Validada</div>
                                                    :
                                                    <div className="naovalidada">Não Validada</div>
                                                }
                                            </td>
                                            <td>
                                                <button className="dashboardButton" type="submit" >Edit</button>
                                            </td>
                                            <td>
                                                <button
                                                    className={startup.validated?"dashboardButtonApproved":"dashboardButton"}
                                                    type="submit" onClick={!startup.validated?()=>this.approveCompany(startup._id):null} >
                                                    Approve
                                                </button>
                                            </td>
                                            <td>
                                                <button className="dashboardButton" type="submit" onClick={startup.validated?()=>this.rejectCompany(startup._id):null} >Reject</button>
                                            </td>
                                            <td>
                                                <button className="dashboardButton" type="submit" onClick={()=>this.deleteCompany(startup._id)}>Delete</button>
                                            </td>

                                        </tr>
                                    )
                                }.bind(this))}
                            </tbody>
                        </table>
                        <a className="newCompany" href="/#/form">Inserir nova empresa</a>
                    </div>
                }
            </div>
        );
    }
}
export default CompanyList;
