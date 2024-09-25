import React, { useState, useEffect } from 'react';
import {
  Box,
  Text,
  SimpleGrid,
  Flex,
  Select,
  Spinner,
  Tooltip,
} from '@chakra-ui/react';
import { Line, Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip as ChartTooltip,
  Legend,
  ArcElement
} from 'chart.js';
import Card from 'components/card/Card.js';

// Register required Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, ChartTooltip, Legend, ArcElement);

const AnalyticsSection = () => {
  const [dateRange, setDateRange] = useState('6m');
  const [selectedPool, setSelectedPool] = useState('all');
  const [chartType, setChartType] = useState('line');
  const [loading, setLoading] = useState(true);
  const [alertMessage, setAlertMessage] = useState('');

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (selectedPool === 'pool1' && dateRange === '1m') {
        setAlertMessage('Yield has dropped significantly in the last month!');
      } else {
        setAlertMessage('');
      }
    }, 1000);
  }, [selectedPool, dateRange]);

  const poolData = {
    all: {
      liquidity: [1000, 1200, 1150, 1400, 1300, 1500, 1600],
      yield: [3.0, 3.5, 4.0, 4.5, 5.0, 4.8, 5.2],
      loss: [-0.5, -0.3, -0.7, -1.0, -0.6, -0.8, -0.4],
      tvl: 10000, // Total Value Locked
      apr: 12.5, // Annual Percentage Rate
    },
    pool1: {
      liquidity: [900, 1100, 1200, 1250, 1300, 1350, 1400],
      yield: [2.5, 3.0, 3.2, 3.8, 4.0, 4.2, 4.4],
      loss: [-0.4, -0.2, -0.6, -0.8, -0.5, -0.7, -0.3],
      tvl: 5000,
      apr: 10.0,
    },
    pool2: {
      liquidity: [1500, 1400, 1300, 1350, 1250, 1450, 1550],
      yield: [4.0, 4.5, 4.7, 4.8, 5.0, 5.3, 5.5],
      loss: [-0.6, -0.5, -0.8, -1.0, -0.7, -0.9, -0.6],
      tvl: 7000,
      apr: 15.0,
    },
    pool3: {
      liquidity: [2000, 2100, 2200, 2150, 2250, 2300, 2400],
      yield: [5.0, 5.5, 5.8, 6.0, 6.2, 6.3, 6.5],
      loss: [-0.7, -0.4, -1.0, -1.2, -0.8, -1.1, -0.9],
      tvl: 8000,
      apr: 14.0,
    },
  };

  const getDataByRange = (range) => {
    const rangeMap = {
      '1m': 1,
      '3m': 3,
      '6m': 6,
      '1y': 7,
    };
    return rangeMap[range] || 6;
  };

  const renderChartData = (type) => {
    const rangeLength = getDataByRange(dateRange);
    const dataSet = poolData[selectedPool];
    if (!dataSet) return null;

    return {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'].slice(0, rangeLength),
      datasets: [
        {
          label: type === 'liquidity' ? 'Liquidity Performance' : (type === 'yield' ? 'Yield' : 'Impermanent Loss'),
          data: dataSet[type].slice(0, rangeLength),
          borderColor: type === 'liquidity' ? '#3182CE' : (type === 'yield' ? '#38A169' : '#E53E3E'),
          backgroundColor: type === 'liquidity' ? 'rgba(49, 130, 206, 0.2)' : (type === 'yield' ? 'rgba(56, 161, 105, 0.2)' : 'rgba(229, 62, 62, 0.2)'),
          tension: 0.3,
          fill: true,
          pointHoverRadius: 6,
          pointHitRadius: 8,
        },
      ],
    };
  };

  const renderChart = (type) => {
    switch (chartType) {
      case 'bar':
        return <Bar data={renderChartData(type)} options={{ responsive: true }} />;
      case 'pie':
        return <Pie data={renderChartData(type)} options={{ responsive: true }} />;
      default:
        return <Line data={renderChartData(type)} options={{ responsive: true }} />;
    }
  };

  const renderContent = () => {
    if (loading) {
      return <Spinner size="xl" />;
    }

    return (
      <SimpleGrid columns={{ base: 1, md: 2 }} gap="20px">
        {/* Alert Message */}
        {alertMessage && (
          <Box mb="20px" p="4" bg="red.100" borderRadius="md">
            <Text color="red.800">{alertMessage}</Text>
          </Box>
        )}
        
        {/* Real-Time Performance Graph with Chart Type Selector */}
        <Card p="4" shadow="md" borderWidth="1px" >
          <Flex justifyContent="space-between" alignItems="center" mb="10px">
            <Text fontSize="xl" fontWeight="bold">Real-Time Performance 📈</Text>
            <Flex alignItems="center">
              <Select
                value={chartType}
                onChange={(e) => setChartType(e.target.value)}
                width="120px"
                mr="10px"
              >
                <option value="line">Line Chart</option>
                <option value="bar">Bar Chart</option>
                <option value="pie">Pie Chart</option>
              </Select>
              <Select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                width="120px"
              >
                <option value="1m">1 Month</option>
                <option value="3m">3 Months</option>
                <option value="6m">6 Months</option>
                <option value="1y">1 Year</option>
              </Select>
            </Flex>
          </Flex>
          <Box h="300px">
            {renderChart('liquidity')}
          </Box>
        </Card>

        {/* Historical Data Visualization */}
        <Card p="4" shadow="md" borderWidth="1px" >
          <Flex justifyContent="space-between" alignItems="center" mb="10px">
            <Text fontSize="xl" fontWeight="bold">Historical Data 📊</Text>
            <Select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              width="120px"
            >
              <option value="1m">1 Month</option>
              <option value="3m">3 Months</option>
              <option value="6m">6 Months</option>
              <option value="1y">1 Year</option>
            </Select>
          </Flex>
          <Box h="300px">
            {renderChart('yield')}
          </Box>
        </Card>

        {/* Impermanent Loss Visualization */}
        <Card p="4" shadow="md" borderWidth="1px" >
          <Text fontSize="xl" fontWeight="bold" mb="10px">Impermanent Loss ⚖️</Text>
          <Box h="300px">
            {renderChart('loss')}
          </Box>
        </Card>

        {/* Additional Metrics */}
        <Card p="4" shadow="md" borderWidth="1px" >
          <Text fontSize="xl" fontWeight="bold" mb="10px">Additional Metrics 📈</Text>
          <Text>Total Value Locked (TVL): ${poolData[selectedPool]?.tvl}</Text>
          <Text>Annual Percentage Rate (APR): {poolData[selectedPool]?.apr}%</Text>
        </Card>
      </SimpleGrid>
    );
  };

  return (
    <Card p="6" shadow="md" borderWidth="1px">
      <Text fontSize="2xl" fontWeight="bold" mb="10px">Analytics Dashboard 📊</Text>
      {renderContent()}
    </Card>
  );
};

export default AnalyticsSection;
