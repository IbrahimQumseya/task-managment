import React from 'react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
// We're using our own custom render function and not RTL's render.
// Our custom utils also re-export everything from RTL
// so we can import fireEvent and screen here as well
import i18n from '../../asserts/languages';
import { render, fireEvent } from '../../redux/test-userSlice-utils';
import userEvent from '@testing-library/user-event';
import { I18nextProvider } from 'react-i18next';
import '@testing-library/jest-dom';
import { screen } from '@testing-library/react';
import AddATask from './AddATask';
// We use msw to intercept the network request during the test,
// and return the response 'John Smith' after 150ms
// when receiving a get request to the `/api/user` endpoint
export const handlers = [
  rest.get('/api/user', (req, res, ctx) => {
    return res(ctx.json('John Smith'), ctx.delay(150));
  }),
];

const server = setupServer(...handlers);

// Enable API mocking before tests.
beforeAll(() => {
  i18n.init();

  server.listen();
});

// Reset any runtime request handlers we may add during the tests.
afterEach(() => server.resetHandlers());
afterEach(() => {
  jest.mock('react-i18next', () => ({
    // this mock makes sure any components using the translate HoC receive the t function as a prop
    withTranslation: () => (Component) => {
      Component.defaultProps = { ...Component.defaultProps, t: () => '' };
      return Component;
    },
  }));
});

// // Disable API mocking after the tests are done.
// afterAll(() => server.close());
describe('AddATask', () => {
  test('AddTask Buttom Enable', async () => {
    render(<AddATask />);
    userEvent.type(screen.getByRole('textbox', { name: /Title/i }), 'Title1');
    userEvent.type(screen.getByRole('textbox', { name: /Description/i }), 'Description1');

    userEvent.click(screen.getByRole('button', { name: /Add a task/i }));
    screen.getByRole('');
  });
});
