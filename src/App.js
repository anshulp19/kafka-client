import React, { Component } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';

const ws = new WebSocket('ws://localhost:3210');

class App extends Component {   
  constructor(props) {
    super(props);
    this.state = {
      data: []
    }
  }
  componentWillMount() {
    ws.onopen = () => {
      console.log('WebSocket Client Connected');
    };

    ws.onmessage = (message) => {
      const info = this.state.data;
      info.push(JSON.parse(message.data));
      this.setState({
        data: info,
      });
    };
  }

  componentDidMount() {
  }
  
  render() {
    console.log("data: " + JSON.stringify(this.state.data));
    return (
      this.state.data.length === 0 ? (<span> Fetching</span>)
      : (
      <LineChart
        width={500}
        height={300}
        data={this.state.data}
        margin={{
          top: 5, right: 30, left: 20, bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="factoryID" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="persons" stroke="#8884d8" activeDot={{ r: 8 }} />
      </LineChart>
      )
    );
  }
}

export default App;