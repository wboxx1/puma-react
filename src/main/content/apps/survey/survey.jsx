import React from 'react';
import Plot from 'react-plotly.js';
import styled from 'styled-components';
import Container from 'react-bootstrap/lib/Container';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import PropTypes from 'prop-types';

const Button = styled.button`
  color: palevioletred;
  font-size: 1em;
  margin: 0 auto;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
`;

const Centered = styled.div`
    margin: 0 auto;
`;

export default class Survey extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = { data: [], layout: {}, frames: [], config: {}, revision: undefined };
    }

    render()
    {
        return (
            <Centered>
                <Row>
                    <Centered>
                        <Plot
                            data={this.state.data}
                            layout={this.state.layout}
                            frames={this.state.frames}
                            config={this.state.config}
                            onInitialized={figure => this.setState(figure)}
                            onUpdate={figure => this.setState(figure)}
                        />
                    </Centered>
                </Row>
                <Row>
                    <Button>Start Collecting</Button>
                </Row>
            </Centered>
        );
    }
}
