import { useState } from 'react';
import { Container, Divider, Header, Icon } from 'semantic-ui-react'
import SearchBar from './Components/SearchBar';

import TableData from './Components/Table';

function App() {

  const [searchData, setSearchData] = useState("")

  // fetching data to search from child and storing it into searchData 
  const searchText = (searchDataFromChild: any) => {
    setSearchData(searchDataFromChild)
  }


  return (
    <Container fluid >
      <Header as='h3' textAlign='center' icon > 
        <Icon name='table'> Github Users Data</Icon>
      </Header>
      <Divider hidden />
      <SearchBar searchField={searchText} />
      <Divider hidden />
      <TableData search={searchData} />
    </Container>
  );
}


export default App;