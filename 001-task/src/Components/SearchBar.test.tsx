import { render , screen } from '@testing-library/react'
import SearchBar from './SearchBar'

describe("SearchBar Component" , () =>{

    test("taking input and searching" , () => {
        render(<SearchBar/>)
        const inputBar = screen.getByPlaceholderText("Search...")
        expect(inputBar).toBeInTheDocument();
    })

})