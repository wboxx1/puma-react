import React from 'react';
import Plot from 'react-plotly.js';
import styled from 'styled-components';
import Row from 'react-bootstrap/lib/Row';
import Button from 'react-bootstrap/lib/Button';
import startService from './survey.service';

const StyledButton = styled(Button)`
  font-size: 1em;
  margin: 0 auto;
  padding: 0.25em 1em;
  border-radius: 3px;
  rgba(66, 114, 136, 1);
`;

const Centered = styled.div`
    margin: 0 auto;
`;

export default class Survey extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state =
        {
            data: [],
            revision: 0,
            layout: { autosize: true },
            frames: [],
            useResizeHandler: true,
            style: { width: '100%', height: '100%' },
        };
        this.startCollecting = this.startCollecting.bind(this);
        this.stopCollecting = this.stopCollecting.bind(this);
    }

    startCollecting()
    {
        startService();
        let count = 0;

        this.timer = setInterval(() =>
        {
            // do sumpin
            const range = [];
            const vals = [];
            for (let i = 0; i < 100000; i += 1)
            {
                range[i] = i;
                vals[i] = Math.random();
            }

            const newData = [{
                x: range,
                y: vals,
                mode: 'lines',
            }];

            this.setState({
                data: newData,
                revision: this.revision += 1,
            });

            count += 1;
            if (count === 20)
            {
                clearInterval();
            }
        }, 500);
    }

    stopCollecting()
    {
        clearInterval(this.timer);
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
                    <StyledButton variant="light" onClick={this.startCollecting}>Start Collecting</StyledButton>
                    <StyledButton variant="light" onClick={this.stopCollecting}>Stop Collecting</StyledButton>
                </Row>
            </Centered>
        );
    }
}
