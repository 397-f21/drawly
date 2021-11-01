import { render, fireEvent } from '@testing-library/react';
import * as React from "react";
import Canvas from '../components/Canvas';

const mockEnqueue = jest.fn();
jest.mock('notistack', () => ({
    ...jest.requireActual('notistack'),
    useSnackbar: () => {
        return {
            enqueueSnackbar: mockEnqueue
        };
    }
}));

describe("Clear canvas button", () => {
    it("Tests if clear canvas button renders", () => {
        const { getByTestId } = render(<Canvas />);
        const clearButton = getByTestId('clear-button');
        expect(clearButton).toBeTruthy();
    });

    it("Tests if clicking clear canvas button clears canvas", async () => {
        const ref = React.createRef();
        const { getByTestId } = render(<Canvas ref={ref}/>);
        expect(ref.current.state.currentPaths.length).toBe(0);

        const pathsToLoad = `[
            {
              "drawMode": true,
              "strokeColor": "#000000",
              "strokeWidth": 4,
              "paths": [
                {
                  "x": 100,
                  "y": 100
                }
              ],
              "startTimestamp": 0,
              "endTimestamp": 0
            }
          ]`;
        const pathsToUpdate = JSON.parse(pathsToLoad);
        ref.current?.loadPaths(pathsToUpdate);
        expect(ref.current.state.currentPaths.length).toBe(1);
        const clearButton = getByTestId('clear-button');
        await fireEvent.click(clearButton);
        expect(ref.current.state.currentPaths.length).toBe(0);
    });
});


describe("Canvas renders", () => {
  it("Tests if canvas renders", () => {
      const { getByTestId } = render(<Canvas />);
      const canvasRenders = getByTestId('canvas-renders');
      expect(canvasRenders).toBeTruthy();
  });
});