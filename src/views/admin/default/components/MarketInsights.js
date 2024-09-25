import React, { useEffect, useState } from 'react';
import {
  Box,
  Text,
  SimpleGrid,
  Divider,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Icon,
  Tooltip,
  Button,
  Flex,
  Tag,
  VStack,
  HStack,
  Progress,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Select,
  Input,
} from '@chakra-ui/react';
import { InfoIcon } from '@chakra-ui/icons';
import { Line, Bar } from 'react-chartjs-2';
import Card from "components/card/Card.js"; // Import your custom Card component

const MarketInsights = () => {
  const [marketData, setMarketData] = useState({
    trends: [],
    alerts: [],
    additionalMetrics: {},
  });
  const [loading, setLoading] = useState(true);
  const [dateRange, setDateRange] = useState('last-30-days');
  const [searchQuery, setSearchQuery] = useState('');
  const { isOpen: isTrendOpen, onOpen: onTrendOpen, onClose: onTrendClose } = useDisclosure();
  const { isOpen: isAlertOpen, onOpen: onAlertOpen, onClose: onAlertClose } = useDisclosure();
  const [selectedTrend, setSelectedTrend] = useState(null);
  const [selectedAlert, setSelectedAlert] = useState(null);

  useEffect(() => {
    const fetchData = () => {

      // Alerty do wyświetlenia w pop-upie
const alertData = [
  {
    title: "Price Spike Detected",
    description: "A sudden price increase of 15% has been observed in the top trading pair.",
    date: "September 21, 2024",
    severity: "high",
    details: "Monitor your positions closely. The sudden spike may lead to a volatile market. Affected pairs include BTC/USD and ETH/USD.",
  },
  {
    title: "Market Correction Warning",
    description: "Analysts are warning of a possible market correction based on current trends.",
    date: "September 22, 2024",
    severity: "medium",
    details: "Many analysts predict a short-term correction as traders take profits after a long rally. Be cautious with your positions.",
  },
  {
    title: "New Regulatory Announcement",
    description: "New regulations may impact the trading environment significantly.",
    date: "September 23, 2024",
    severity: "medium",
    details: "The SEC has announced changes that could affect the liquidity of certain assets. Keep an eye on official updates.",
  },
  {
    title: "Bullish Market Sentiment",
    description: "Overall market sentiment is increasingly bullish, with expectations for continued growth.",
    date: "September 24, 2024",
    severity: "low",
    details: "With an increase in investor activity, this could lead to higher asset prices in the coming weeks.",
  },
  {
    title: "High Volatility Alert",
    description: "The market is experiencing unusually high volatility, impacting several assets.",
    date: "September 25, 2024",
    severity: "high",
    details: "Stay alert! High volatility can lead to sudden price swings. Consider risk management strategies.",
  },
];

      const newMarketData = {
        trends: [
          {
            title: "Increased Trading Volume",
            description: "Recent data shows a 30% increase in trading volume, indicating heightened market activity.",
            date: "September 20, 2024",
            details: "Trading volume has increased significantly due to investor interest in cryptocurrency. This trend may continue as new products are introduced.",
          },
          {
            title: "Regulatory Changes",
            description: "Upcoming regulations may impact liquidity strategies. Stay informed about potential changes in laws affecting trading.",
            date: "September 18, 2024",
            details: "The SEC is proposing new guidelines that could change how exchanges operate. Traders should keep an eye on these developments.",
          },
          {
            title: "Market Sentiment",
            description: "Overall market sentiment is bullish, with a growing number of analysts projecting price increases in the next quarter.",
            date: "September 19, 2024",
            details: "Bullish sentiment suggests that more investors are entering the market, leading to increased prices. Market trends indicate continued growth.",
          },
        ],
        alerts: [
          {
            title: "Price Spike Detected",
            description: "A sudden price increase of 15% has been observed in the top trading pair.",
            date: "September 21, 2024",
            severity: "high",
            details: "Monitor your positions closely. The sudden spike may lead to a volatile market.",
          },
          {
            title: "Market Correction Warning",
            description: "Analysts are warning of a possible market correction based on current trends. Consider adjusting your positions.",
            date: "September 22, 2024",
            severity: "medium",
            details: "Many analysts predict a short-term correction as traders take profits after a long rally.",
          },
        ],
        additionalMetrics: {
          totalMarketCap: "$1,500,000,000",
          liquidityPoolVolume: "$250,000,000",
          recentPriceChange: "+3.5%",
          volatility: 2.8,
          sentimentScore: 75,
        },
      };
      setMarketData(newMarketData);
      setLoading(false);
    };

    fetchData();
    const interval = setInterval(fetchData, 60000); // Simulate real-time updates every minute

    return () => clearInterval(interval);
  }, []);

  const trendChartData = {
    labels: marketData.trends.map((trend) => trend.date),
    datasets: [
      {
        label: 'Market Trends',
        data: [30, 20, 25], // Simulated data points for trends
        borderColor: '#3182CE',
        backgroundColor: 'rgba(49, 130, 206, 0.2)',
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const alertChartData = {
    labels: marketData.alerts.map((alert) => alert.date),
    datasets: [
      {
        label: 'Alerts Over Time',
        data: [2, 1], // Simulated alert frequencies
        backgroundColor: '#E53E3E',
      },
    ],
  };

  const handleTrendClick = (trend) => {
    setSelectedTrend(trend);
    onTrendOpen();
  };

  const handleAlertClick = (alert) => {
    setSelectedAlert(alert);
    onAlertOpen();
  };

  const filteredTrends = marketData.trends.filter(trend => 
    trend.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredAlerts = marketData.alerts.filter(alert => 
    alert.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box >
      <Card >
        <Box p="4">
          <Text fontSize="2xl" fontWeight="bold" mb="4">
            Market Insights 🧠
          </Text>

          {loading ? (
            <Text>Loading data...</Text>
          ) : (
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing="20px">
              {/* Market Trends Section */}
              <Card shadow="md" borderWidth="1px">
                <Text fontSize="xl" fontWeight="bold">Market Trends</Text>
                <Line data={trendChartData} options={{ responsive: true }} />
                <Divider my="4" />
                <Select placeholder="Select Date Range" mb="4" value={dateRange} onChange={(e) => setDateRange(e.target.value)}>
                  <option value="last-7-days">Last 7 Days</option>
                  <option value="last-30-days">Last 30 Days</option>
                  <option value="last-90-days">Last 90 Days</option>
                </Select>
                <Input 
                  placeholder="Search Trends..." 
                  mb="4" 
                  value={searchQuery} 
                  onChange={(e) => setSearchQuery(e.target.value)} 
                />
                {filteredTrends.map((trend, index) => (
                  <Card key={index} mb="4" onClick={() => handleTrendClick(trend)} cursor="pointer" shadow="md" borderWidth="1px">
                    <Text fontWeight="bold">{trend.title}</Text>
                    <Text fontSize="sm" color="gray.500">{trend.date}</Text>
                    <Text>{trend.description}</Text>
                    <Divider my="2" />
                  </Card>
                ))}
              </Card>

              {/* Alerts Section */}
              <Card shadow="md" borderWidth="1px">
                <Text fontSize="xl" fontWeight="bold">Alerts & Notifications</Text>
                <Bar data={alertChartData} options={{ responsive: true }} />
                <Divider my="4" />
                <Input 
                  placeholder="Search Alerts..." 
                  mb="4" 
                  value={searchQuery} 
                  onChange={(e) => setSearchQuery(e.target.value)} 
                />
                {filteredAlerts.map((alert, index) => (
  <Box key={index} mb="4" onClick={() => handleAlertClick(alert)} cursor="pointer">
    <Flex justify="space-between" align="center">
      <Text fontWeight="bold">{alert.title}</Text>
      <Tag colorScheme={alert.severity === 'high' ? 'red' : alert.severity === 'medium' ? 'orange' : 'green'}>
        {alert.severity.charAt(0).toUpperCase() + alert.severity.slice(1)}
      </Tag>
    </Flex>
    <Text fontSize="sm" color="gray.500">{alert.date}</Text>
    <Text>{alert.description}</Text>
    <Divider my="2" />
  </Box>
))}
              </Card>
            </SimpleGrid>
          )}

          {/* Additional Metrics Section */}
          <Divider my="4" />
          <Card shadow="md" borderWidth="1px">
            <Text fontSize="xl" fontWeight="bold" mb="4">Market Metrics</Text>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing="20px">
              <Stat>
                <StatLabel>Total Market Cap</StatLabel>
                <StatNumber>{marketData.additionalMetrics.totalMarketCap}</StatNumber>
                <StatHelpText>
                  <Icon as={InfoIcon} w={4} h={4} color="gray.500" />
                  Total market capitalization across all assets.
                </StatHelpText>
              </Stat>

              <Stat>
                <StatLabel>Liquidity Pool Volume</StatLabel>
                <StatNumber>{marketData.additionalMetrics.liquidityPoolVolume}</StatNumber>
                <StatHelpText>
                  <Icon as={InfoIcon} w={4} h={4} color="gray.500" />
                  Total volume in liquidity pools.
                </StatHelpText>
              </Stat>

              <Stat>
                <StatLabel>Recent Price Change</StatLabel>
                <StatNumber color="green.500">{marketData.additionalMetrics.recentPriceChange}</StatNumber>
                <StatHelpText>
                  <Icon as={InfoIcon} w={4} h={4} color="gray.500" />
                  Price change over the last 24 hours.
                </StatHelpText>
              </Stat>

              <Stat>
                <StatLabel>Market Volatility</StatLabel>
                <StatNumber color={marketData.additionalMetrics.volatility > 2 ? 'red.500' : 'green.500'}>
                  {marketData.additionalMetrics.volatility}%
                </StatNumber>
                <StatHelpText>
                  <Icon as={InfoIcon} w={4} h={4} color="gray.500" />
                  Measures the price fluctuation in the market.
                </StatHelpText>
              </Stat>

              <Stat>
                <StatLabel>Market Sentiment Score</StatLabel>
                <HStack>
                  <StatNumber>{marketData.additionalMetrics.sentimentScore}</StatNumber>
                  <Tooltip label="A score above 70 indicates positive sentiment." placement="top">
                    <InfoIcon w={4} h={4} color="gray.500" />
                  </Tooltip>
                </HStack>
                <Progress value={marketData.additionalMetrics.sentimentScore} size="sm" colorScheme="green" />
                <StatHelpText>
                  Based on recent trader sentiment analysis.
                </StatHelpText>
              </Stat>
            </SimpleGrid>
          </Card>

        </Box>
      </Card>

      {/* Trend Detail Modal */}
      <Modal isOpen={isTrendOpen} onClose={onTrendClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{selectedTrend?.title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>{selectedTrend?.details}</Text>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={onTrendClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Alert Detail Modal */}
<Modal isOpen={isAlertOpen} onClose={onAlertClose}>
  <ModalOverlay />
  <ModalContent>
    <ModalHeader>{selectedAlert?.title}</ModalHeader>
    <ModalCloseButton />
    <ModalBody>
      <Text fontWeight="bold">Description:</Text>
      <Text>{selectedAlert?.description}</Text>
      <Text fontWeight="bold" mt="4">Date:</Text>
      <Text>{selectedAlert?.date}</Text>
      <Text fontWeight="bold" mt="4">Details:</Text>
      <Text>{selectedAlert?.details}</Text>
      <Text fontWeight="bold" mt="4">Severity:</Text>
      <Tag colorScheme={selectedAlert?.severity === 'high' ? 'red' : selectedAlert?.severity === 'medium' ? 'orange' : 'green'}>
        {selectedAlert?.severity.charAt(0).toUpperCase() + selectedAlert?.severity.slice(1)}
      </Tag>
    </ModalBody>
    <ModalFooter>
      <Button colorScheme="blue" onClick={onAlertClose}>Close</Button>
    </ModalFooter>
  </ModalContent>
</Modal>
    </Box>
  );
};

export default MarketInsights;
