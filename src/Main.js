import { Layout, Menu} from 'antd';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Login from '././page/Login';
import ListData from '././page/ListData';
import AddData from '././page/AddData';
import {ComponentContext} from "./context/ComponentContext";
import { useContext } from 'react';
import {ProtectedRouter, ProtectedRouterLogin} from "./ProtectedRouter";
const { Header, Content, Footer } = Layout;


const Main = () =>{
    let {user} = useContext(ComponentContext);
    return (
        <Router>
            <Layout>
                <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
                 
                        <Menu theme="dark" mode="horizontal">
                            {user.token !== "" &&
                                <>
                                    <Menu.Item key="Home">
                                        <Link to="/Home" >
                                            Home
                                        </Link>
                                    </Menu.Item>
                                    <Menu.Item key="Add Data">
                                        <Link to="/Add" >
                                            Add Data
                                        </Link>
                                    </Menu.Item>
                                </>
                            }
                            {
                                user.token === "" && 
                                <>
                                    <Menu.Item key="login">
                                        <Link to="/login" >
                                            Login
                                        </Link>
                                    </Menu.Item>
                                </>
                            }
                        </Menu>
                
                </Header>
                <Content className="site-layout" style={{ padding: '0 50px', marginTop: 64 }}>
                    <div className="site-layout-background" style={{ padding: 24, minHeight: 380, marginTop: '2%' }}>
                    <Switch>
                        <ProtectedRouter exact path= "/Home" component={ListData}  user={user} />
                        <ProtectedRouter exact path= "/Add" component={AddData}  user={user} />
                        <ProtectedRouterLogin exact path="/login" component={Login} user={user} />
                        {/* <Route exact path="/login">
                            <Login/>
                        </Route> */}
                    </Switch>
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
        </Layout>
      </Router>
    );
}

export default Main;
