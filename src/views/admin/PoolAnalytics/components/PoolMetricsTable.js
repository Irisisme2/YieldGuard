import React, { useEffect, useState } from 'react';
import {
  Box,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Heading,
  Tooltip,
  IconButton,
  useToast,
  Button,
  Select,
  Flex,
} from '@chakra-ui/react';
import { InfoIcon } from '@chakra-ui/icons';
import Card from 'components/card/Card.js';
import { Bar } from 'react-chartjs-2';

const PoolMetricsTable = () => {
  const [poolMetrics, setPoolMetrics] = useState({
    totalLiquidity: 500000,
    volume: {
      daily: 15000,
      weekly: 80000,
      monthly: 300000,
    },
    liquidityProviders: 75,
    priceImpact: 2.5,
    averageTradeSize: 200,
  });

  const [timeFrame, setTimeFrame] = useState('daily');

  const volumeData = {
    labels: ['Daily', 'Weekly', 'Monthly'],
    datasets: [
      {
        label: 'Volume',
        data: [poolMetrics.volume.daily, poolMetrics.volume.weekly, poolMetrics.volume.monthly],
        backgroundColor: [
          'rgba(75, 192, 192, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(255, 99, 132, 0.6)',
        ],
      },
    ],
  };

  const updateMetrics = () => {
    setPoolMetrics((prevMetrics) => ({
      ...prevMetrics,
      totalLiquidity: prevMetrics.totalLiquidity + Math.floor(Math.random() * 1000),
      volume: {
        daily: prevMetrics.volume.daily + Math.floor(Math.random() * 500),
        weekly: prevMetrics.volume.weekly + Math.floor(Math.random() * 3000),
        monthly: prevMetrics.volume.monthly + Math.floor(Math.random() * 15000),
      },
      liquidityProviders: prevMetrics.liquidityProviders + Math.floor(Math.random() * 2),
      priceImpact: (Math.random() * 5).toFixed(2),
      averageTradeSize: Math.floor(Math.random() * 500) + 100,
    }));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      updateMetrics();
      showToast();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const toast = useToast();
  const showToast = () => {
    toast({
      title: 'Data Updated',
      description: 'Pool metrics have been updated.',
      status: 'info',
      duration: 2000,
      isClosable: true,
    });
  };

  return (
    <Card>
      <Box p={5}>
        <Heading as="h2" size="lg" mb={4}>
          Detailed Pool Metrics
        </Heading>
        <Flex justify="space-between" align="center" mb={4}>
          <Select
            placeholder="Select Time Frame"
            value={timeFrame}
            onChange={(e) => setTimeFrame(e.target.value)}
            width="200px"
          >
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </Select>
          <Button colorScheme="blue" onClick={() => { updateMetrics(); showToast(); }}>
            Refresh Data
          </Button>
        </Flex>
        <Table variant="striped" colorScheme="teal">
          <Thead>
            <Tr>
              <Th>Metric</Th>
              <Th isNumeric>Value</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>Total Liquidity</Td>
              <Td isNumeric>${poolMetrics.totalLiquidity.toLocaleString()}</Td>
            </Tr>
            <Tr>
              <Td>Daily Volume</Td>
              <Td isNumeric>${poolMetrics.volume.daily.toLocaleString()}</Td>
            </Tr>
            <Tr>
              <Td>Weekly Volume</Td>
              <Td isNumeric>${poolMetrics.volume.weekly.toLocaleString()}</Td>
            </Tr>
            <Tr>
              <Td>Monthly Volume</Td>
              <Td isNumeric>${poolMetrics.volume.monthly.toLocaleString()}</Td>
            </Tr>
            <Tr>
              <Td>Liquidity Providers</Td>
              <Td isNumeric>{poolMetrics.liquidityProviders}</Td>
            </Tr>
            <Tr>
              <Td>Price Impact</Td>
              <Td isNumeric>{poolMetrics.priceImpact}%</Td>
            </Tr>
            <Tr>
              <Td>Average Trade Size</Td>
              <Td isNumeric>${poolMetrics.averageTradeSize.toLocaleString()}</Td>
            </Tr>
          </Tbody>
        </Table>

        <Box mt={6}>
          <Heading as="h3" size="lg" mb={4}>
            Volume Chart
          </Heading>
          <Bar
            data={volumeData}
            options={{
              responsive: true,
              scales: {
                y: {
                  beginAtZero: true,
                  title: {
                    display: true,
                    text: 'Volume ($)',
                  },
                },
              },
              plugins: {
                legend: {
                  display: true,
                  position: 'top',
                },
              },
            }}
          />
        </Box>
      </Box>
    </Card>
  );
};

export default PoolMetricsTable;
