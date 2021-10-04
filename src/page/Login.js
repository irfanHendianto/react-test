import { Form, Input, Button, Typography, Divider ,Space } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import {useState, useContext,useEffect} from "react";
import {ComponentContext} from "./../context/ComponentContext"
import axios from "axios";
import {useHistory} from "react-router-dom";

const {Title} = Typography;

const validateMessages = {
    required: '${label} is required!',
};

const Login = () =>{
    let history = useHistory()
    const [form] = Form.useForm();
    const {setUser} = useContext(ComponentContext);
    const [input,] = useState({
        Username:"",
        Password:""
    });

    const onFinish = async (values) => {
        let {Username, Password} = values
        const token = Buffer.from(`${Username}:${Password}`, 'utf8').toString('base64');
        await axios.post(`login`,{Username: Username, Password: Password},{headers: {"Authorization" : "Basic "+ token}}).
        then(res =>{
            setUser({
                token: res.headers.authorization
            })
            history.push(`/Home`);
        });
    };

    return (
            <div style={{margin:'auto',textAlign:'center',width:'50%'}}>  
                <Title>Login</Title>
                <Divider style={{width:'50%'}}></Divider>
                <Form
                form={form}
                initialValues={input}
                validateMessages={validateMessages}
                onFinish={onFinish}
                >
                        <Form.Item
                        name='Username'
                        rules={[
                        {
                            required: true
                        },
                        ]}
                    >
                        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" style={{width:'50%'}} />
                    </Form.Item>
                    <Form.Item
                        name="Password"
                        rules={[{ required: true }]}
                    >
                        <Input
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder="Password"
                        style={{width:'50%'}}
                        />
                    </Form.Item>
    
                    <Form.Item>
                        <Space>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                            Log in 
                            </Button>
                        </Space>
                    </Form.Item>
                </Form>
            </div>
    );
}

export default Login;