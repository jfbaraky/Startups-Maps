import React from 'react'
import { HashRouter as Router, Route ,Redirect, hashHistory} from 'react-router-dom';

import CompanyForm from './CompanyForm';
import CompanyList from './CompanyList';

class Routes extends React.Component {
    render() {
        return (
            <Router history={hashHistory}>
                <div>
                    <Route exact path='/list' component={CompanyList}/>
                    <Route path='/form' component={CompanyForm}/>
                    <Redirect from='*' to='/list' />
                </div>
            </Router>
        );
    }
};
export default Routes;



