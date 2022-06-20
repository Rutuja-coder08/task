import { useEffect } from 'react';
import { useState } from 'react';
import { Container, Input, Icon, Segment } from 'semantic-ui-react'

function SearchBar(props: any) {

    const [search, setSearch] = useState("")

    // fetching data from input and storing into search
    const onSearchChange = (e: any) => {
        setSearch(e.target.value)
    }

    // sending data to parent component
    useEffect(() => {
        props.searchField(search)
    },[search])

    return (

        <Container textAlign='center'>
            <Segment color='teal' inverted textAlign='center'>
                <Input
                    icon={<Icon name='search' inverted circular link />}
                    placeholder='Search...'
                    onChange={onSearchChange}
                />
            </Segment>

        </Container>

    )
}

export default SearchBar;