import React from 'react';
import * as firebase from 'firebase'



class CompanyEdit extends React.Component{
    constructor(props) {
        super(props);
        this.newUpdateKey = this.props._id;
        this.state={
            company: null
        };

        this.handleClick = this.handleClick.bind(this);
    }
    readDB(){
        console.log("readDB");
        var companiesRef = firebase.database().ref('teste/'+ this.newUpdateKey);
        companiesRef.once('value').then(function(snapshot){
            console.log(snapshot);
        }.bind(this))
    }

    render(){
        return (
            <div></div>
        );
    }
}

export default CompanyEdit;

/**
 * Created by Guru Machine on 28/04/2017.
 */
