import React, { useState, useEffect } from 'react';
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
  Button,
  Tooltip,
  Select,
  Flex,
} from '@chakra-ui/react';
import Card from 'components/card/Card.js';
import { Line } from 'react-chartjs-2'; // Importing Line chart from react-chartjs-2

const FeeStructureOverview = () => {
  const [feesData, setFeesData] = useState({
    transactionFees: 0.3,
    incentiveFees: 0.1,
    totalFees: 0.4,
    liquidityProviders: [
      { name: 'Provider 1', feeShare: 60 },
      { name: 'Provider 2', feeShare: 30 },
      { name: 'Provider 3', feeShare: 10 },
    ],
  });

  const [timeFrame, setTimeFrame] = useState('daily');
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });

  // Function to generate random fees for demonstration
  const generateRandomFees = () => {
    return {
      transactionFees: (Math.random() * 1).toFixed(2),
      incentiveFees: (Math.random() * 1).toFixed(2),
      totalFees: ((Math.random() * 0.5) + 0.1).toFixed(2),
      liquidityProviders: [
        { name: 'Provider 1', feeShare: Math.floor(Math.random() * 100) },
        { name: 'Provider 2', feeShare: Math.floor(Math.random() * 100) },
        { name: 'Provider 3', feeShare: Math.floor(Math.random() * 100) },
      ],
    };
  };

  // Function to fetch fee data and update chart
  const fetchFeesData = () => {
    const newFeesData = generateRandomFees();
    setFeesData(newFeesData);
    updateChartData(newFeesData);
  };

  // Function to update chart data based on selected timeframe
  const updateChartData = (feesData) => {
    const labels = [];
    const transactionVolumeData = [];
    const incentiveFeesData = [];

    // Generating mock data for the chart
    for (let i = 0; i < 10; i++) {
      labels.push(`Day ${i + 1}`);
      transactionVolumeData.push(Math.floor(Math.random() * 1000));
      incentiveFeesData.push(Math.floor(Math.random() * 500));
    }

    setChartData({
      labels,
      datasets: [
        {
          label: 'Transaction Volume',
          data: transactionVolumeData,
          borderColor: 'rgba(75,192,192,1)',
          backgroundColor: 'rgba(75,192,192,0.2)',
          fill: true,
        },
        {
          label: 'Incentive Fees',
          data: incentiveFeesData,
          borderColor: 'rgba(255,99,132,1)',
          backgroundColor: 'rgba(255,99,132,0.2)',
          fill: true,
        },
      ],
    });
  };

  useEffect(() => {
    fetchFeesData();
    const interval = setInterval(() => {
      fetchFeesData();
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Card>
      <Box p={5}>
        <Heading as="h2" size="lg" mb={4}>
          Fees Structure Overview 💵
        </Heading>
        
        {/* Timeframe Selection */}
        <Flex justify="space-between" mb={4}>
          <Select
            placeholder="Select Timeframe"
            onChange={(e) => setTimeFrame(e.target.value)}
            width="200px"
          >
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </Select>
          <Button colorScheme="teal" onClick={fetchFeesData}>
            Refresh Data
          </Button>
        </Flex>

        {/* Fee Structure Table */}
        <Table variant="striped" colorScheme="teal" mb={5}>
          <Thead>
            <Tr>
              <Th>Fee Type</Th>
              <Th isNumeric>Percentage (%)</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>
                <Tooltip label="Fee charged for each transaction." aria-label="A tooltip">
                  <Text as="span">Transaction Fees</Text>
                </Tooltip>
              </Td>
              <Td isNumeric>{feesData.transactionFees}</Td>
            </Tr>
            <Tr>
              <Td>
                <Tooltip label="Fees distributed as incentives to liquidity providers." aria-label="A tooltip">
                  <Text as="span">Incentive Fees</Text>
                </Tooltip>
              </Td>
              <Td isNumeric>{feesData.incentiveFees}</Td>
            </Tr>
            <Tr>
              <Td>Total Fees</Td>
              <Td isNumeric>{feesData.totalFees}</Td>
            </Tr>
          </Tbody>
        </Table>

        {/* Fee Distribution Table */}
        <Heading as="h3" size="md" mb={4}>
          Fee Distribution Among Liquidity Providers
        </Heading>
        <Table variant="striped" colorScheme="blue">
          <Thead>
            <Tr>
              <Th>Liquidity Provider</Th>
              <Th isNumeric>Fee Share (%)</Th>
            </Tr>
          </Thead>
          <Tbody>
            {feesData.liquidityProviders.map((provider, index) => (
              <Tr key={index}>
                <Td>{provider.name}</Td>
                <Td isNumeric>{provider.feeShare}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>

        {/* Chart Visualization */}
        <Heading as="h3" size="md" mb={4}>
          Fee and Volume Chart
        </Heading>
        <Line data={chartData} options={{
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
            },
            title: {
              display: true,
              text: 'Transaction Volume & Incentive Fees Over Time',
            },
          },
        }} />
      </Box>
    </Card>
  );
};

export default FeeStructureOverview;
