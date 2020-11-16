/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */
import React from 'react';
import {
  Modal,
  Header,
  Body,
  Footer,
  FooterItem,
  Close,
} from '@zendeskgarden/react-modals';
import { Paragraph } from '@zendeskgarden/react-typography';
import { Row, Col } from '@zendeskgarden/react-grid';
import Ticket from '../../../interfaces/Ticket';
import { Tag } from '@zendeskgarden/react-tags';

import getTagColor from '../modules/util';

interface Props {
  ticket: Ticket;
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const TicketModal: React.FC<Props> = ({ ticket, visible, setVisible }) => {
  return (
    <Row>
      <Col textAlign="center">
        {visible && (
          <Modal isLarge onClose={() => setVisible(false)}>
            <Header>
              {ticket.id} - {ticket.subject} - {ticket.status}
            </Header>
            <Body>
              <Paragraph>{ticket.description}</Paragraph>
              <Paragraph>
                Created: {ticket.created_at}
                <br />
                Updated: {ticket.updated_at}
              </Paragraph>

              <Paragraph>
                Requester: {ticket.requester_id}
                <br />
                Submitter: {ticket.submitter_id}
                <br />
                Assignee: {ticket.assignee_id}
                <br />
                Organization: {ticket.organization_id}
                <br />
                Group: {ticket.group_id}
                <br />
                Brand: {ticket.brand_id}
              </Paragraph>
            </Body>
            <Footer>
              <FooterItem>
                {ticket.tags &&
                  ticket.tags.map((tag) => (
                    <Tag
                      size={'large'}
                      key={tag}
                      hue={getTagColor(tag)}
                      style={{ margin: '0 0.5em' }}
                    >
                      <span>{tag}</span>
                    </Tag>
                  ))}
              </FooterItem>
            </Footer>
            <Close aria-label="Close modal" />
          </Modal>
        )}
      </Col>
    </Row>
  );
};

export default TicketModal;
