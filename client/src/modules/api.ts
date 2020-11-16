import axios from 'axios';
import Ticket from '../../../interfaces/Ticket';

const URL = process.env.REACT_APP_API_URL
  ? process.env.REACT_APP_API_URL
  : '/api';

interface TicketsDTO {
  tickets: Ticket[];
  next_page: string | null;
}

const getTickets = async (link: string): Promise<TicketsDTO> => {
  return await axios
    .post(`${URL}/tickets`, {
      link,
    })
    .then((res) => res.data);
};

export default getTickets;
