/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import {
  Body,
  Cell,
  Head,
  HeaderCell,
  HeaderRow,
  Row,
  Table,
} from '@zendeskgarden/react-tables';
import { Pagination } from '@zendeskgarden/react-pagination';
import { Tag } from '@zendeskgarden/react-tags';
import { Button } from '@zendeskgarden/react-buttons';

import getTickets from '../modules/api';
import getTagColor from '../modules/util';

import Ticket from '../../../interfaces/Ticket';
import ErrorNotification from './ErrorNotification';
import TicketModal from './TicketModal';
import { Skeleton } from '@zendeskgarden/react-loaders';

const StyledTable = styled(Table)`
  margin-bottom: ${(p) => p.theme.space.md};
  min-width: 500px;
`;

const TicketList: React.FC = () => {
  const pageSize = 25;
  const [currentPage, setCurrentPage] = useState(1);
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentTicket, setCurrentTicket] = useState<Ticket>();
  const [visible, setVisible] = useState<boolean>(false);
  const [nextPage, setNextPage] = useState<string | null>();
  const [totalPages, setTotalPages] = useState<number>(0);

  useEffect(() => {
    (async () => {
      try {
        const data = await getTickets('');
        console.log(data);
        setTickets(data.tickets);
        setNextPage(data.next_page);
        setLoading(false);
      } catch (err) {
        setError(true);
        setLoading(false);
        console.log(err);
      }
    })();
  }, []);

  useEffect(() => {
    console.log('Setting total pages');
    setTotalPages(Math.ceil(tickets.length / pageSize));
  }, [tickets]);

  const createRow = (row: Ticket, index: number) => (
    <Row key={index}>
      <Cell>{row.id}</Cell>
      <Cell>{row.subject}</Cell>
      <Cell>{row.status}</Cell>
      <Cell>{row.updated_at}</Cell>
      <Cell>
        <div>
          {row.tags &&
            row.tags.map((tag) => (
              <Tag
                key={tag}
                hue={getTagColor(tag)}
                style={{ margin: '0 0.5em' }}
              >
                <span>{tag}</span>
              </Tag>
            ))}
        </div>
      </Cell>
      <Cell>
        <Button
          onClick={() => {
            setVisible(true);
            setCurrentTicket(row);
          }}
        >
          View
        </Button>
      </Cell>
    </Row>
  );

  const skeletonRow = () => (
    <Row>
      {[...Array(6)].map((e, i) => (
        <Cell>
          <Skeleton />
        </Cell>
      ))}
    </Row>
  );

  const getNextPageTickets = async () => {
    if (nextPage) {
      setLoading(true);
      try {
        const data = await getTickets(nextPage);
        console.log('getNextPageTickets');
        console.log(data);
        setTickets([...tickets, ...data.tickets]);
        setNextPage(data.next_page);
        setLoading(false);
      } catch (err) {
        setError(true);
        setLoading(false);
        console.log(err);
      }
    }
  };

  return error ? (
    <ErrorNotification />
  ) : (
    <div style={{ overflowX: 'auto' }}>
      <StyledTable>
        <Head>
          <HeaderRow>
            <HeaderCell width={'10%'}>ID</HeaderCell>
            <HeaderCell>Subject</HeaderCell>
            <HeaderCell width={'10%'}>Status</HeaderCell>
            <HeaderCell width={'20%'}>Updated at</HeaderCell>
            <HeaderCell>Tags</HeaderCell>
            <HeaderCell width={'10%'} />
          </HeaderRow>
        </Head>
        <Body>
          {loading
            ? [...Array(25)].map((e, i) => skeletonRow())
            : currentPage === 1
            ? tickets.slice(currentPage - 1, pageSize).map(createRow)
            : currentPage === totalPages && nextPage
            ? getNextPageTickets()
            : tickets
                .slice(
                  currentPage * pageSize - pageSize,
                  currentPage * pageSize
                )
                .map(createRow)}
        </Body>
      </StyledTable>
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onChange={setCurrentPage}
      />
      {visible && currentTicket && (
        <TicketModal
          ticket={currentTicket}
          visible={visible}
          setVisible={setVisible}
        />
      )}
    </div>
  );
};

export default TicketList;
