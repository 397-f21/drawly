import { render, waitFor } from '@testing-library/react';
import * as React from "react";
import Calendar from '../components/Calendar';

describe("Check in button", () => {
    it("Renders Calendar component upon tab switching to cal mode", async () => {
        const { getByTestId } =  await waitFor(() => render(<Calendar />));
        const cal = getByTestId("cal");
        expect(cal).toBeTruthy();
    });
});