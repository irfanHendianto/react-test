import {Route, Redirect} from "react-router-dom";


function ProtectedRouter ({user:user, component:Component, ...rest}){
    return(
        <Route {...rest} render={(props)=>{ if(user.token !== "" ){ return (<Component/>); } else { return (<Redirect to={{ pathname: "/login", state: {from: props.location}}}/>);}}}/>
    );
}

function ProtectedRouterLogin ({user:user, component:Component, ...rest}){
    return(
        <Route {...rest} render={(props)=>{ if(user.token === ""){ return (<Component/>); } else { return (<Redirect to={{ pathname: "/Home", state: {from: props.location}}}/>);}}}/>
    );
}

export {ProtectedRouter, ProtectedRouterLogin};