import { render, fireEvent } from '@testing-library/react';
import * as React from "react";
import Calendar from '../components/Calendar';

describe("Check in button", () => {
    it("Renders Calendar component upon tab switching to cal mode", () => {
        const { getByTestId } = render(<Calendar />);
        const cal = getByTestId("cal");
        expect(cal).toBeTruthy;
    });
});