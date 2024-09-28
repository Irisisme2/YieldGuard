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
  Button,
  Flex,
  Input,
  Tooltip,
  Select,
  useToast,
} from '@chakra-ui/react';
import Card from 'components/card/Card.js';
import { Line } from 'react-chartjs-2';
import { saveAs } from 'file-saver'; // Importing file-saver for CSV download

const ImpermanentLossAnalysis = () => {
  const [ilData, setIlData] = useState({
    priceMovements: [],
    impermanentLoss: [],
  });

  const [riskMetrics, setRiskMetrics] = useState({
    volatility: 0,
    historicalReturns: 0,
    marketCondition: '',
  });

  const [priceChange, setPriceChange] = useState('');
  const [historicalData, setHistoricalData] = useState({
    daily: [],
    weekly: [],
    monthly: [],
  });

  const [comparisonData, setComparisonData] = useState([]);
  const toast = useToast();

  const generateRandomILData = () => {
    const priceMovements = [];
    const impermanentLoss = [];

    for (let i = 0; i < 10; i++) {
      const priceChange = (Math.random() * 10).toFixed(2);
      priceMovements.push(priceChange);
      impermanentLoss.push(((Math.random() * 0.5) * (i + 1)).toFixed(2));
    }

    setIlData({ priceMovements, impermanentLoss });
    setRiskMetrics({
      volatility: (Math.random() * 100).toFixed(2),
      historicalReturns: (Math.random() * 10).toFixed(2),
      marketCondition: Math.random() > 0.5 ? 'Stable' : 'Volatile',
    });
  };

  const fetchHistoricalData = () => {
    setHistoricalData({
      daily: [0.5, 0.6, 0.7, 0.8, 0.9],
      weekly: [0.4, 0.5, 0.6, 0.7, 0.6],
      monthly: [0.6, 0.7, 0.8, 0.9, 1.0],
    });
  };

  const comparePriceChanges = () => {
    const comparisons = [];
    const changePercentage = parseFloat(priceChange);

    for (let i = 1; i <= 5; i++) {
      const change = changePercentage + (i * 2); // Incremental price changes
      comparisons.push({
        change: change,
        impermanentLoss: ((Math.random() * 0.5) * i).toFixed(2), // Simulating IL based on price change
      });
    }

    setComparisonData(comparisons);
    toast({
      title: "Comparison Generated",
      description: "Comparative analysis based on the expected price change has been generated.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  useEffect(() => {
    generateRandomILData();
    fetchHistoricalData();
  }, []);

  const chartData = {
    labels: ilData.priceMovements,
    datasets: [
      {
        label: 'Estimated Impermanent Loss (%)',
        data: ilData.impermanentLoss,
        borderColor: 'rgba(255,99,132,1)',
        backgroundColor: 'rgba(255,99,132,0.2)',
        fill: true,
      },
    ],
  };

  const handlePriceChange = (e) => {
    setPriceChange(e.target.value);
  };

  const downloadCSV = () => {
    const csvContent = "data:text/csv;charset=utf-8," 
      + comparisonData.map(e => `${e.change},${e.impermanentLoss}`).join("\n");

    const encodedUri = encodeURI(csvContent);
    saveAs(encodedUri, "impermanent_loss_analysis.csv");
    toast({
      title: "Download Started",
      description: "Your CSV report is being downloaded.",
      status: "info",
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <Card>
      <Box p={5}>
        <Heading as="h2" size="lg" mb={4}>
          Impermanent Loss Analysis 📉
        </Heading>

        <Line 
          data={chartData} 
          options={{
            responsive: true,
            plugins: {
              legend: {
                position: 'top',
              },
              title: {
                display: true,
                text: 'Estimated Impermanent Loss Based on Price Movements',
              },
            },
          }} 
        />

        <Text mt={4} fontSize="lg">
          Understanding Impermanent Loss:
        </Text>
        <Text mb={4}>
          Impermanent loss occurs when the price of tokens in a liquidity pool diverges in any direction. This analysis helps you understand the potential risks involved.
        </Text>

        <Flex mb={4}>
          <Input
            type="number"
            placeholder="Expected Price Change (%)"
            value={priceChange}
            onChange={handlePriceChange}
            width="300px"
            mr={2}
          />
          <Button 
            colorScheme="teal" 
            onClick={comparePriceChanges} 
            disabled={!priceChange} // Disable button if priceChange is empty
          >
            Compare
          </Button>
        </Flex>

        {/* Comparative Analysis Table */}
        <Heading as="h3" size="md" mb={4}>
          Comparative Analysis Results
        </Heading>
        <Table variant="striped" colorScheme="blue">
          <Thead>
            <Tr>
              <Th>Price Change (%)</Th>
              <Th isNumeric>Estimated Impermanent Loss (%)</Th>
            </Tr>
          </Thead>
          <Tbody>
            {comparisonData.map((data, index) => (
              <Tr key={index}>
                <Td>{data.change}</Td>
                <Td isNumeric>{data.impermanentLoss}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>

        <Button colorScheme="teal" onClick={downloadCSV} mt={4} disabled={comparisonData.length === 0}>
          Download CSV Report
        </Button>

        {/* Risk Assessment Section */}
        <Heading as="h3" size="md" mb={4}>
          Risk Assessment 🚨
        </Heading>
        <Table variant="striped" colorScheme="blue">
          <Thead>
            <Tr>
              <Th>Risk Metric</Th>
              <Th isNumeric>Value</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>
                <Tooltip label="Indicates how much the asset price fluctuates. Higher values indicate more risk.">
                  <Text>Volatility (%)</Text>
                </Tooltip>
              </Td>
              <Td isNumeric>{riskMetrics.volatility}</Td>
            </Tr>
            <Tr>
              <Td>
                <Tooltip label="Historical performance of the asset. A higher percentage indicates better returns.">
                  <Text>Historical Returns (%)</Text>
                </Tooltip>
              </Td>
              <Td isNumeric>{riskMetrics.historicalReturns}</Td>
            </Tr>
            <Tr>
              <Td>
                <Tooltip label="Market stability assessment based on recent trends.">
                  <Text>Market Condition</Text>
                </Tooltip>
              </Td>
              <Td>{riskMetrics.marketCondition}</Td>
            </Tr>
          </Tbody>
        </Table>

        <Text mt={4} fontSize="lg">
          Key Insights:
        </Text>
        <Text mb={4}>
          Monitor these metrics to assess the risk associated with providing liquidity. Higher volatility may indicate a greater potential for impermanent loss.
        </Text>

        {/* Historical Performance Comparison */}
        <Heading as="h3" size="md" mb={4}>
          Historical Performance Comparison 📊
        </Heading>
        <Select placeholder="Select Period" mb={4} onChange={fetchHistoricalData}>
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
        </Select>
        <Table variant="striped" colorScheme="green">
          <Thead>
            <Tr>
              <Th>Period</Th>
              <Th isNumeric>Return (%)</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>Daily</Td>
              <Td isNumeric>{historicalData.daily.join(', ')}</Td>
            </Tr>
            <Tr>
              <Td>Weekly</Td>
              <Td isNumeric>{historicalData.weekly.join(', ')}</Td>
            </Tr>
            <Tr>
              <Td>Monthly</Td>
              <Td isNumeric>{historicalData.monthly.join(', ')}</Td>
            </Tr>
          </Tbody>
        </Table>

        <Button colorScheme="teal" onClick={generateRandomILData} mt={4}>
          Refresh Data
        </Button>
      </Box>
    </Card>
  );
};

export default ImpermanentLossAnalysis;
