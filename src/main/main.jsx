import React from 'react';
import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';
import styled from 'styled-components';
import Content from './content/content';

const Centered = styled.div`
    margin: 0 auto;
    text-align: -webkit-center;    
`;

const Text = styled.h2`
    color: #bababa;
`;


export default class Main extends React.Component
{
    render()
    {
        return (
            <div id="main">
                <Row>
                    <Centered><Text>Header</Text></Centered>
                </Row>
                <Row>
                    <Col lg={2}>
                        <Centered><Text>Left</Text></Centered>
                    </Col>
                    <Col lg={8}>
                        <Content />
                    </Col>
                    <Col lg={2}>
                        <Centered><Text>Right</Text></Centered>
                    </Col>
                </Row>
                <Row>
                    <Centered><Text>Footer</Text></Centered>
                </Row>
            </div>
        );
    }
}
