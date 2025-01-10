import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export function BehaviorGraph({ data }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="timestamp" />
        <YAxis domain={[0, 5]} />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="confidence" stroke="#8884d8" activeDot={{ r: 8 }} />
        <Line type="monotone" dataKey="movement" stroke="#82ca9d" />
        <Line type="monotone" dataKey="happy" stroke="#ffc658" />
        <Line type="monotone" dataKey="sad" stroke="#ff7300" />
        <Line type="monotone" dataKey="angry" stroke="#ff0000" />
        <Line type="monotone" dataKey="surprised" stroke="#00ff00" />
      </LineChart>
    </ResponsiveContainer>
  );
}

