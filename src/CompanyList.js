import React from 'react';
import * as firebase from "firebase";

class CompanyList extends React.Component{
    constructor(){
        super();
        this.state={
            company: null
        };
    }
    readDB(){
        console.log("readDB");
        var companiesRef = firebase.database().ref('company');
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
            console.log(arr);
            this.setState({company:arr});

        }.bind(this))
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
                    <table className='table'>
                        <thead>
                            <tr>
                                <th>Lista de Empresas</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.company.map(function(startup){
                                return(
                                    <tr key={startup._id}>
                                        <td>
                                            <a href={startup.site}>{startup.razao}</a>
                                            {startup.validated === true ?
                                                <div>Validada</div>
                                                :
                                                <div>Não Validada</div>
                                            }
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                }
            </div>
        );
    }
}
export default CompanyList;
