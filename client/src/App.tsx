import React from 'react';
import './App.css';
import { XXXL } from '@zendeskgarden/react-typography';

import TicketList from './components/TicketList';
import { ThemeProvider } from '@zendeskgarden/react-theming';

const App = () => (
  <div className="App">
    <ThemeProvider>
      <XXXL className="center">Mobile Ticket Viewer</XXXL>
      <TicketList />
    </ThemeProvider>
  </div>
);

export default App;
