import {Table ,Icon, Menu, Container} from 'semantic-ui-react'
import {useEffect , useState} from 'react'
import  _ from 'lodash'
import axios from 'axios'


function TableData(props : any) {
    const[data, setData] = useState([])
    const[paginatedData , setPaginatedData] = useState([]);

    // fetching dataset for the Table
    useEffect(()=>{
        axios.get('https://api.github.com/users')
          .then((res : any) => res.data)
        // fetch('https://api.github.com/users')
        //   .then((res : any) => res.json())
          .then(res   => {setData(res) ;
            //  console.log(res.slice(0,pageSize));
             setPaginatedData((res).slice(0,pageSize))
          })
          .catch(console.log);     
      },[])

  
    const pageSize = 10;      
    const pageCount = data? Math.ceil(data.length/pageSize) : 0 ;
    if(pageCount === 1) return null;

    // creates an array of [1,2,3]
    const pages = _.range(1 ,pageCount+1);

 

// dividing the dataset into pages
const paginate = (pageNo : number) => {
    const startIndex = (pageNo - 1) * pageSize;

    // updates the paginatedData array with new values for each page
    const paginatedData = _(data).slice(startIndex).take(pageSize).value();
    setPaginatedData(paginatedData)
}
    

return(

    <Container textAlign='center'>
        <Table celled sortable size='small' selectable striped collapsing color='teal' >
            <Table.Header >
                <Table.Row textAlign='center'>
                    <Table.HeaderCell>Name</Table.HeaderCell>
                    <Table.HeaderCell>ID</Table.HeaderCell>
                    <Table.HeaderCell>Node Id</Table.HeaderCell>
                    <Table.HeaderCell>Avatar Url</Table.HeaderCell>
                    <Table.HeaderCell>User Type</Table.HeaderCell>
                    <Table.HeaderCell>Url</Table.HeaderCell>
                    <Table.HeaderCell>Followers Url</Table.HeaderCell>
                </Table.Row>
            </Table.Header>

            <Table.Body>
                {
                    paginatedData.filter((val: any) => {
                        if (props.search === "") {
                            return val;
                        } else if (
                            val.login.toLowerCase().includes(props.search.toLowerCase()) ||
                            val.node_id.toLowerCase().includes(props.search.toLowerCase()) ||
                            val.avatar_url.toLowerCase().includes(props.search.toLowerCase()) ||
                            val.url.toLowerCase().includes(props.search.toLowerCase()) ||
                            val.html_url.toLowerCase().includes(props.search.toLowerCase()) ||
                            val.id.toString().includes(props.search.toString())
                        ) {
                            return val
                        }
                    }).map((item: any) => (
                        <Table.Row key={item.id} >
                            <Table.Cell>{item.login}</Table.Cell>
                            <Table.Cell>{item.id}</Table.Cell>
                            <Table.Cell>{item.node_id}</Table.Cell>
                            <Table.Cell>{item.avatar_url}</Table.Cell>
                            <Table.Cell>{item.type}</Table.Cell>
                            <Table.Cell>{item.url}</Table.Cell>
                            <Table.Cell>{item.followers_url}</Table.Cell>
                        </Table.Row>
                    ))
                }
            </Table.Body>
        </Table>

        <Container fluid textAlign='center' >
            <Menu pagination>
                <Menu.Item as='a' icon>
                    <Icon name='chevron left' />
                </Menu.Item>
                {pages.map((page) => (
                    <Menu.Item onClick={() => paginate(page)}>{page}</Menu.Item>
                ))}
                <Menu.Item as='a' icon>
                    <Icon name='chevron right' />
                </Menu.Item>
            </Menu>
        </Container>
    </Container>
)
}

export default TableData