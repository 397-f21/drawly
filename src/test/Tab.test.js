import {render, fireEvent, screen, waitFor} from "@testing-library/react"
import App from '../App'

const mockEnqueue = jest.fn();
jest.mock('notistack', () => ({
    ...jest.requireActual('notistack'),
    useSnackbar: () => {
        return {
            enqueueSnackbar: mockEnqueue
        };
    }
}));

test('tab switches mode', async () => {
    await waitFor(() => render(<App/>));
    const drawTab = screen.getByTestId('draw-tab');
    const calTab = screen.getByTestId('cal-tab');
    await waitFor(() => fireEvent.click(calTab));
    expect(screen.getByTestId('cal')).toBeTruthy();
    await waitFor(() => fireEvent.click(drawTab));
    expect(screen.getByTestId('canvas')).toBeTruthy();
})