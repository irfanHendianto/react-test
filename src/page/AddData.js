import { Divider, Typography, Layout,  Form, Input, DatePicker, Button , Select, Row, Col, } from 'antd';
import axios from "axios";
import { useEffect, useState, useContext,Redirect  } from 'react';
import {useHistory} from "react-router-dom";
import {ComponentContext} from "./../context/ComponentContext"
const {Option} = Select
const {Content} = Layout
const {Title} = Typography

const layout = {
  labelCol: {
    span: 24,
  },
  wrapperCol: {
    span: 24,
  },
};


const validateMessages = {
  required: '${label} is required!',

};

const AddData = ()=>{
    const {user,setUser} = useContext(ComponentContext);
    const dateFormat = 'YYYY/MM/DD';
    const [form] = Form.useForm();
    const [category, setCategory] = useState([])
    let history = useHistory();
    useEffect(()=>{
        const fetchCategory = async () =>{
            await axios.get('item-categories', {headers: {"Authorization" : user.token}})
            .then(res =>{
                if(res.data.status === "SUCCESS" ){
                    setCategory(res.data.payload.data);
                }else{
                    setUser({
                        token :""
                    })
                    history.push(`/login`);
                }
            })
            .catch(()=>{
                setUser({
                    token :""
                })
                history.push(`/login`);
            });
        }

        fetchCategory()


    },[category]);

    function convert(str) {
        let date = new Date(str);
        let mnth = ("0" + (date.getMonth() + 1)).slice(-2);
        let day = ("0" + date.getDate()).slice(-2);
        return `${date.getFullYear()}-${mnth}-${day}`;
    }
      
    const onFinish = (values) => {
        let {category,condition,name,price,quantity} = values;
        const stockedDate = convert(values.stockedDate._d)
        axios.post(`items`, {name: name, quantity: parseInt(quantity), price: parseInt(price),condition: condition, category: category, stockedDate: stockedDate}, {headers: {"Authorization" : user.token}})
        .then((res) => {
            if(res.data.status === "SUCCESS" ){
                history.push(`/Home`);
            }else{
                setUser({
                    token :""
                })
                history.push(`/login`);
            }
        })
        .catch(err =>{
            setUser({
                token :""
            })
            history.push(`/login`);
        });
    };
    
    return(
        
        <Layout style={{backgroundColor:'white',padding:"24px"}}>
                                   
            <Content style={{border:'1px solid', borderRadius:'10px',padding:"20px"}}>
                <Title>Form Create Data</Title>
                <Divider></Divider>
                <Form form={form} {...layout} name="nest-messages"  onFinish={onFinish} validateMessages={validateMessages}>
                    <Row>
                        <Col span={12}>
                            <div style={{paddingLeft:'50%'}}>
                                <Form.Item
                                    name="name"
                                    label="Name"
                                    rules={[
                                    {
                                        required: true,
                                    },
                                    ]}
                                >
                                    <Input  style={{width:"80%"}}/>
                                </Form.Item>
                            </div>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="quantity"
                                label="Quantity"
                                rules={[
                                {
                                    required: true,
                                },
                                ]}
                            >
                                <Input style={{width:"50%"}} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={12}>
                            <div style={{paddingLeft:'50%'}}>
                            <Form.Item
                                name="category"
                                label="Category"
                                rules={[{ required: true, message: 'Please select' }]}
                            >
                                <Select placeholder="Category" style={{width:"80%"}} >
                                        {category.map((data)=>
                                            {   
                                                return(
                                                    <Option value={data.name}>{data.name}</Option>
                                                );
                                            })
                                        }
                                
                                </Select>
                            </Form.Item>
                            </div>
                        
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="price"
                                label="Price"
                                rules={[
                                {
                                    required: true,
                                },
                                ]}
                            >
                                <Input style={{width:"50%"}} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={12}>
                            <div style={{paddingLeft:'50%'}}>
                                <Form.Item
                                    name="condition"
                                    label="condition"
                                    rules={[
                                    {
                                        required: true,
                                    },
                                    ]}
                                >
                                    <Input style={{width:"80%"}} />
                                </Form.Item>

                            </div>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="stockedDate"
                                label="stockedDate"
                                rules={[
                                {
                                    required: true
                                },
                                ]}
                            >
                                <DatePicker format={dateFormat}/>
                                {/* <Input style={{width:"50%"}} /> */}
                            </Form.Item>
                        </Col>
                    </Row>

                    <Divider></Divider>
                    <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 10 }}>
                        <Button type="primary" htmlType="submit">
                        Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Content>
        </Layout>
    );
}

export default AddData;