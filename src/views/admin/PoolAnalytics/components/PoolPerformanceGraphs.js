import React, { useState, useEffect } from 'react';
import {
  Box, Text, Tabs, TabList, TabPanels, Tab, TabPanel, Select, Spinner, useToast, Checkbox, Button, useColorMode,
  Input, Flex, Skeleton,
} from '@chakra-ui/react';
import Card from 'components/card/Card.js';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine, Brush
} from 'recharts';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { CSVLink } from "react-csv";

// Expanded example data for historical performance
const exampleData = {
  historicalYields: [
    { date: '2024-09-01', yield: 2.5 },
    { date: '2024-09-02', yield: 3.1 },
    { date: '2024-09-03', yield: 2.8 },
    { date: '2024-09-04', yield: 3.5 },
    { date: '2024-09-05', yield: 3.2 },
    { date: '2024-09-06', yield: 3.4 },
    { date: '2024-09-07', yield: 3.0 },
  ],
  liquidity: [
    { date: '2024-09-01', liquidity: 100000 },
    { date: '2024-09-02', liquidity: 120000 },
    { date: '2024-09-03', liquidity: 110000 },
    { date: '2024-09-04', liquidity: 130000 },
    { date: '2024-09-05', liquidity: 125000 },
    { date: '2024-09-06', liquidity: 140000 },
    { date: '2024-09-07', liquidity: 135000 },
  ],
  transactionVolume: [
    { date: '2024-09-01', volume: 5000 },
    { date: '2024-09-02', volume: 8000 },
    { date: '2024-09-03', volume: 7000 },
    { date: '2024-09-04', volume: 10000 },
    { date: '2024-09-05', volume: 9500 },
    { date: '2024-09-06', volume: 12000 },
    { date: '2024-09-07', volume: 11000 },
  ],
};

const PoolPerformanceGraphs = () => {
  const [selectedData, setSelectedData] = useState(exampleData.historicalYields);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [startDate, setStartDate] = useState(new Date('2024-09-01'));
  const [endDate, setEndDate] = useState(new Date('2024-09-07'));
  const [normalizeData, setNormalizeData] = useState(false);
  const { colorMode, toggleColorMode } = useColorMode();
  const toast = useToast();

  const handleTabChange = (index) => {
    setLoading(true);
    setError(false);

    setTimeout(() => {
      try {
        switch (index) {
          case 0:
            setSelectedData(exampleData.historicalYields);
            break;
          case 1:
            setSelectedData(exampleData.liquidity);
            break;
          case 2:
            setSelectedData(exampleData.transactionVolume);
            break;
          default:
            break;
        }
        setLoading(false);
      } catch (err) {
        setError(true);
        setLoading(false);
        toast({
          title: 'Error',
          description: 'Failed to load data. Please try again later.',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }
    }, 1000);
  };

  const normalizeSelectedData = (data) => {
    if (!normalizeData) return data;
    const maxVal = Math.max(...data.map((item) => item.yield || item.liquidity || item.volume));
    return data.map((item) => {
      const key = Object.keys(item).find((k) => k !== 'date');
      return { ...item, [key]: (item[key] / maxVal) * 100 };
    });
  };

  const filteredData = normalizeSelectedData(selectedData);

  return (
    <Card>
      <Box mb={4}>
        <Text fontSize="2xl" fontWeight="bold" mb={4}>
          Pool Performance Graphs
        </Text>
        <Button onClick={toggleColorMode} mb={4}>
          Toggle {colorMode === 'light' ? 'Dark' : 'Light'} Mode
        </Button>
        <Box mb={4}>
          <Text>Date Range:</Text>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            selectsStart
            startDate={startDate}
            endDate={endDate}
          />
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
          />
        </Box>
        <Checkbox isChecked={normalizeData} onChange={(e) => setNormalizeData(e.target.checked)} mb={4}>
          Normalize Data
        </Checkbox>
        <CSVLink
          data={filteredData}
          filename={"pool-performance-data.csv"}
          className="btn btn-primary"
          target="_blank"
        >
          <Button colorScheme="green" mb={4}>
            Download CSV
          </Button>
        </CSVLink>
      </Box>

      <Tabs variant="enclosed" onChange={handleTabChange}>
        <TabList>
          <Tab>Historical Yields</Tab>
          <Tab>Liquidity Changes</Tab>
          <Tab>Transaction Volume</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            {loading ? (
              <Skeleton height="300px" />
            ) : error ? (
              <Text color="red.500">Failed to load data.</Text>
            ) : (
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={filteredData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip contentStyle={{ backgroundColor: '#f5f5f5', borderRadius: '5px' }} />
                  <Legend verticalAlign="top" height={36} />
                  <Brush dataKey="date" height={30} stroke="#8884d8" />
                  <ReferenceLine y={3} label="Average" stroke="red" />
                  <Line
                    type="monotone"
                    dataKey={Object.keys(filteredData[0]).find((k) => k !== 'date')}
                    stroke="#8884d8"
                    activeDot={{ r: 8 }}
                    strokeWidth={2}
                    animationDuration={500}
                  />
                </LineChart>
              </ResponsiveContainer>
            )}
          </TabPanel>

          <TabPanel>
            {loading ? (
              <Skeleton height="300px" />
            ) : error ? (
              <Text color="red.500">Failed to load data.</Text>
            ) : (
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={filteredData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip contentStyle={{ backgroundColor: '#f5f5f5', borderRadius: '5px' }} />
                  <Legend verticalAlign="top" height={36} />
                  <Brush dataKey="date" height={30} stroke="#82ca9d" />
                  <Line
                    type="monotone"
                    dataKey="liquidity"
                    stroke="#82ca9d"
                    activeDot={{ r: 8 }}
                    strokeWidth={2}
                    animationDuration={500}
                  />
                </LineChart>
              </ResponsiveContainer>
            )}
          </TabPanel>

          <TabPanel>
            {loading ? (
              <Skeleton height="300px" />
            ) : error ? (
              <Text color="red.500">Failed to load data.</Text>
            ) : (
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={filteredData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip contentStyle={{ backgroundColor: '#f5f5f5', borderRadius: '5px' }} />
                  <Legend verticalAlign="top" height={36} />
                  <Brush dataKey="date" height={30} stroke="#ffc658" />
                  <Line
                    type="monotone"
                    dataKey="volume"
                    stroke="#ffc658"
                    activeDot={{ r: 8 }}
                    strokeWidth={2}
                    animationDuration={500}
                  />
                </LineChart>
              </ResponsiveContainer>
            )}
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Card>
  );
};

export default PoolPerformanceGraphs;

