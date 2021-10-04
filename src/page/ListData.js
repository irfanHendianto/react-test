import {Layout, Space, Table,Pagination   } from 'antd';
import {useEffect, useState, useContext} from "react";
import axios from "axios";
import {ComponentContext} from "./../context/ComponentContext";
import {useHistory} from "react-router-dom";


const ListData = ()=>{
    const {user,setUser} = useContext(ComponentContext)
    const [product, setProduct] = useState([]);
    const [fetch,setFetch] = useState(true);
    const [totalElementsCount, setTotalElementsCount] = useState(0);
    const [elementsPerPage,] = useState(2);
    const [pagesCount, setPagesCount] = useState(1);
    let history = useHistory()
    const columns = [
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'title',
          sorter: (a, b) => a.title.length - b.title.length,
          sortDirections: ['descend','ascend'],
        },
        {
          title: 'Quantity',
          dataIndex: 'quantity',
          key: 'quantity',
          sorter: (a, b) => a - b,
          sortDirections: ['descend','ascend'],
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
            sorter: (a, b) => a - b,
            sortDirections: ['descend','ascend'],
        },
        {
            title: 'Condition',
            dataIndex: 'condition',
            key: 'condition',
            filters:[
                {
                  text: 'NEW',
                  value: 'NEW',
                },
                {
                  text: 'SECOND',
                  value: 'SECOND',
                },
            ],
              onFilter: (value, record) => record.condition.match(value)
          },
          {
            title: 'Category',
            dataIndex: 'category',
            key: 'category',
          },
        {
            title: 'Date',
            dataIndex: 'stockedDate',
            key: 'stockedDate',
            sorter: (a, b) => a - b,
            sortDirections: ['descend','ascend'],
        },
      ];
    //   function onChange(pagination, filters, sorter, extra) {
    //     console.log('params', pagination, filters, sorter, extra);
    //   }
    useEffect(()=>{
        const fetchDataMovie = async ()=>{
            await axios.get(`items?page=1&size=${elementsPerPage}`, {headers: {"Authorization" : user.token}}).
            then((res) =>{
                if(res.data.status === "SUCCESS"){
                    setTotalElementsCount(res.data.payload.total)
                    setProduct(res.data.payload.data.map((el,index)=> {
                        const {name, quantity, price,condition,category,stockedDate} = el;
                        const key = index+1;
                        return {key,name, quantity, price,condition,category,stockedDate}
                      }));

                }else{
                    setUser({
                        token :""
                    })
                    history.push(`/login`);
                }
            })
            .catch( () =>{
                setUser({
                    token :""
                })
                history.push(`/login`);
            });
        }
        setPaginationStates();
        if(fetch){
            fetchDataMovie()
            setFetch(false)
        }
    },[fetch,pagesCount,elementsPerPage,totalElementsCount]);

    const setPaginationStates = () => {
        let pageCountTemp = Math.ceil(totalElementsCount / elementsPerPage)
        setPagesCount(pageCountTemp)

    }

    const handlePageClick = async(pageNumber) => {
        await axios.get(`items?page=${pageNumber}&size=${elementsPerPage}`, {headers: {"Authorization" : user.token}})
        .then(res => {
            if(res.data.status === "SUCCESS"){
                setProduct(res.data.payload.data.map((el,index)=> {
                    const {name, quantity, price,condition,category,stockedDate} = el;
                    const key = index+1;
                    return {key,name, quantity, price,condition,category,stockedDate}
                  }))
            }else{
                setUser({
                    token :""
                })
                history.push(`/login`);
            }
        })
        .catch(() =>{
            setUser({
                token :""
            })
            history.push(`/login`);
        });
        
    }
    return(
        <Layout>
            <Space direction="vertical" size={10} style={{backgroundColor:'white', padding:'24px'}}>
                <Table  dataSource={product} columns={columns} size={10} pagination={false} style={{backgroundColor:'white'}}>
                </Table>
                {pagesCount > 1 &&
                    <Pagination
                    defaultCurrent={1}
                    onChange={handlePageClick}
                    pageSize={elementsPerPage}
                    total={totalElementsCount}
                    showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
                    showSizeChanger={false}
                    style={{margin:'10px',marginTop:'20px',marginLeft:'60px',marginBottom:'50px'}}
                    />
                }
            </Space>
        </Layout>
    );
}

export default ListData;