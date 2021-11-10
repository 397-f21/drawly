import {render, fireEvent, screen, waitFor} from "@testing-library/react";
import Calendar from '../components/Calendar';
// import { useData, useUserState } from '../utilities/firebase.js';
import * as Functions from '../utilities/firebase'
import svgConst from './svgConstants';

test('images render to correct location on cal', async () => {
    const mockUser = [{
        username: 'ligma',
        uid: 'ligmanuts'
    }]
    const mockData = [
        {
            "Mon Nov 01 2021 13:23:13 GMT-0500 (Central Daylight Time)" : svgConst
        },
        false,
        null
    ]
    let root = document.createElement("div").setAttribute("id", "root")
    console.log(typeof(root))
    jest.spyOn(Functions, 'useUserState').mockImplementation(() => mockUser);
    jest.spyOn(Functions, 'useData').mockImplementation(() => mockData);
    await waitFor(() => render(<Calendar testing={true}/>));
    const icon = screen.getByTestId('icon')
    expect(icon).toHaveStyle('grid-area: a10');

})