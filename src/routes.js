import React from 'react'
import { HashRouter as Router, Route ,Redirect, hashHistory} from 'react-router-dom';

import CompanyForm from './CompanyForm';
import CompanyList from './CompanyList';
import CompanyMap from './CompanyMap';

class Routes extends React.Component {
    render() {
        return (
            <Router history={hashHistory}>
                <div>
                    <Route path='/' component={CompanyMap}/>
                    <Route path='/list' component={CompanyList}/>
                    <Route path='/form' component={CompanyForm}/>
                    <Redirect from='*' to='/' />
                </div>
            </Router>
        );
    }
};
export default Routes;



