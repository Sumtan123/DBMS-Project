import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import {Navbar_RestoFood} from '../Navbar/Navbar'; // Adjust the path if necessary

test("Navbar matches snapshot", () => {
  const { asFragment } = render(
    <BrowserRouter>
      <Navbar_RestoFood user={{ Cust_Name: "John" }} setUser={jest.fn()} />
    </BrowserRouter>
  );
  expect(asFragment()).toMatchSnapshot();
});
