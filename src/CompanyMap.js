import React from 'react';
import * as firebase from "firebase";
//import {withGoogleMap,GoogleMap, Marker,InfoWindow,} from "react-google-map";

import iconMarker from "./assets/marker.svg"
import iconMarkerHover from "./assets/marker_onhover.svg"
import styles from "./index.css"

const MY_API_KEY = "AIzaSyBXCNhBckFM8dO4bqllMKvMaVahZbacSPA"
const googleMaps = null;

class CompanyMap extends React.Component{
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
                    localizacao: list[key].localizacao
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
        console.log("CompanyMap render");
        return (
           <div></div>
        );
    }
}
export default CompanyMap;
