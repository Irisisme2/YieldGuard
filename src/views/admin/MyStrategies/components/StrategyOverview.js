import React, { useState, useEffect } from 'react';
import {
  Box,
  SimpleGrid,
  Text,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Image,
  Divider,
  Select,
  Flex,
  IconButton,
  useDisclosure,
  VStack,
  Input,
  useToast,
  Spinner,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Tooltip,
  Checkbox,
} from '@chakra-ui/react';
import { MdEdit, MdPause, MdStop } from 'react-icons/md';
import { FaFileCsv } from 'react-icons/fa';
import Card from 'components/card/Card.js';
import eth from 'assets/img/icons/eth.png';
import btc from 'assets/img/icons/btc.png';
import ltc from 'assets/img/icons/ltc.png';
import ada from 'assets/img/icons/ada.png';
import dot from 'assets/img/icons/dot.png';
import usdc from 'assets/img/icons/usdc.png';

// Sample strategies data with images and performance data
const initialStrategiesData = [
  {
    id: 1,
    name: "ETH Liquidity Strategy",
    status: "Active",
    liquidityAmount: "$50,000",
    currentYield: "5.2%",
    impermanentLoss: "$1,500",
    rewardsEarned: "$2,000",
    image: eth,
    actionHistory: [
      "Created on: 2024-01-10",
      "Modified on: 2024-01-20",
      "Paused on: 2024-01-25",
    ],
  },
  {
    id: 2,
    name: "BTC Liquidity Strategy",
    status: "Paused",
    liquidityAmount: "$30,000",
    currentYield: "3.8%",
    impermanentLoss: "$800",
    rewardsEarned: "$1,500",
    image: btc,
    actionHistory: [
      "Created on: 2024-01-12",
      "Modified on: 2024-01-18",
    ],
  },
  {
    id: 3,
    name: "LTC Liquidity Strategy",
    status: "Stopped",
    liquidityAmount: "$25,000",
    currentYield: "4.1%",
    impermanentLoss: "$600",
    rewardsEarned: "$1,000",
    image: ltc,
    actionHistory: [
      "Created on: 2024-01-14",
      "Stopped on: 2024-01-21",
    ],
  },
  {
    id: 4,
    name: "ADA Liquidity Strategy",
    status: "Active",
    liquidityAmount: "$40,000",
    currentYield: "6.0%",
    impermanentLoss: "$2,000",
    rewardsEarned: "$3,500",
    image: ada,
    actionHistory: [
      "Created on: 2024-01-11",
      "Modified on: 2024-01-22",
    ],
  },
  {
    id: 5,
    name: "DOT Liquidity Strategy",
    status: "Active",
    liquidityAmount: "$20,000",
    currentYield: "2.5%",
    impermanentLoss: "$200",
    rewardsEarned: "$300",
    image: dot,
    actionHistory: [
      "Created on: 2024-01-13",
    ],
  },
  {
    id: 6,
    name: "USDC Strategy",
    status: "Paused",
    liquidityAmount: "$10,000",
    currentYield: "1.5%",
    impermanentLoss: "$100",
    rewardsEarned: "$150",
    image: usdc,
    actionHistory: [
      "Created on: 2024-01-15",
    ],
  },
];

const StrategyOverview = () => {
  const [strategiesData, setStrategiesData] = useState(initialStrategiesData);
  const [selectedStrategy, setSelectedStrategy] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [filter, setFilter] = useState("All");
  const [sortBy, setSortBy] = useState("Name");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedStrategies, setSelectedStrategies] = useState([]);
  const toast = useToast();
  const [loadingData, setLoadingData] = useState(false);
  const [editName, setEditName] = useState("");

  const handleImageClick = (strategy) => {
    setSelectedStrategy(strategy);
    setEditName(strategy.name); // Set initial name for editing
    onOpen();
  };

  const handlePauseStrategy = () => {
    setLoading(true);
    setTimeout(() => {
      const updatedStrategies = strategiesData.map(strategy => {
        if (strategy.id === selectedStrategy.id) {
          return { ...strategy, status: "Paused" };
        }
        return strategy;
      });
      setStrategiesData(updatedStrategies);
      toast({
        title: "Strategy Paused",
        description: `${selectedStrategy.name} has been paused.`,
        status: "info",
        duration: 5000,
        isClosable: true,
      });
      onClose();
      setLoading(false);
    }, 1000);
  };

  const handleStopStrategy = () => {
    setLoading(true);
    setTimeout(() => {
      const updatedStrategies = strategiesData.map(strategy => {
        if (strategy.id === selectedStrategy.id) {
          return { ...strategy, status: "Stopped" };
        }
        return strategy;
      });
      setStrategiesData(updatedStrategies);
      toast({
        title: "Strategy Stopped",
        description: `${selectedStrategy.name} has been stopped.`,
        status: "warning",
        duration: 5000,
        isClosable: true,
      });
      onClose();
      setLoading(false);
    }, 1000);
  };

  const handleEditStrategy = () => {
    setLoading(true);
    setTimeout(() => {
      const updatedStrategies = strategiesData.map(strategy => {
        if (strategy.id === selectedStrategy.id) {
          return { ...strategy, name: editName };
        }
        return strategy;
      });
      setStrategiesData(updatedStrategies);
      toast({
        title: "Strategy Edited",
        description: `${selectedStrategy.name} has been renamed to ${editName}.`,
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      onClose();
      setLoading(false);
    }, 1000);
  };

  // Filter and sort strategies
  const filteredStrategies = strategiesData
    .filter(strategy => (
      (filter === "All" || strategy.status === filter) &&
      strategy.name.toLowerCase().includes(searchTerm.toLowerCase())
    ))
    .sort((a, b) => {
      if (sortBy === "Yield") {
        return parseFloat(b.currentYield) - parseFloat(a.currentYield);
      } else if (sortBy === "Liquidity") {
        return parseFloat(b.liquidityAmount.replace(/\$|,/g, '')) - parseFloat(a.liquidityAmount.replace(/\$|,/g, ''));
      }
      return a.name.localeCompare(b.name); // Default to sorting by name
    });

  // Download CSV function
  const downloadCSV = () => {
    const csvContent = [
      ["Strategy Name", "Status", "Liquidity Amount", "Current Yield", "Impermanent Loss", "Rewards Earned"],
      ...filteredStrategies.map(strategy => [
        strategy.name,
        strategy.status,
        strategy.liquidityAmount,
        strategy.currentYield,
        strategy.impermanentLoss,
        strategy.rewardsEarned,
      ])
    ].map(e => e.join(",")).join("\n");

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "strategies_overview.csv");
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCheckboxChange = (strategyId) => {
    if (selectedStrategies.includes(strategyId)) {
      setSelectedStrategies(selectedStrategies.filter(id => id !== strategyId));
    } else {
      setSelectedStrategies([...selectedStrategies, strategyId]);
    }
  };

  const areAllSelected = filteredStrategies.length === selectedStrategies.length;

  // Simulating data loading
  useEffect(() => {
    setLoadingData(true);
    const timeoutId = setTimeout(() => {
      setLoadingData(false);
    }, 2000);
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <Card p="4" shadow="md" borderWidth="1px" >
    <Box p={5}>
      <Text fontSize="2xl" mb={4}>Strategy Overview</Text>
      <Flex mb={4} justify="space-between" align="center">
        <Input
          placeholder="Search Strategies"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          width="200px"
        />
        <Flex>
          <Select onChange={(e) => setFilter(e.target.value)} value={filter}>
            <option value="All">All</option>
            <option value="Active">Active</option>
            <option value="Paused">Paused</option>
            <option value="Stopped">Stopped</option>
          </Select>
          <Select onChange={(e) => setSortBy(e.target.value)} value={sortBy} ml={2}>
            <option value="Name">Name</option>
            <option value="Yield">Current Yield</option>
            <option value="Liquidity">Liquidity Amount</option>
          </Select>
          <IconButton 
            onClick={downloadCSV} 
            icon={<FaFileCsv />} 
            aria-label="Download CSV" 
            ml={2}
          />
        </Flex>
      </Flex>
      {loadingData ? (
        <Spinner />
      ) : (
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>
                <Checkbox 
                  isChecked={areAllSelected}
                  onChange={() => {
                    if (areAllSelected) {
                      setSelectedStrategies([]);
                    } else {
                      setSelectedStrategies(filteredStrategies.map(strategy => strategy.id));
                    }
                  }}
                />
              </Th>
              <Th>Strategy Name</Th>
              <Th>Status</Th>
              <Th>Liquidity Amount</Th>
              <Th>Current Yield</Th>
              <Th>Impermanent Loss</Th>
              <Th>Rewards Earned</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {filteredStrategies.map(strategy => (
              <Tr key={strategy.id}>
                <Td>
                  <Checkbox 
                    isChecked={selectedStrategies.includes(strategy.id)}
                    onChange={() => handleCheckboxChange(strategy.id)}
                  />
                </Td>
                <Td>
                  <Flex align="center">
                    <Image src={strategy.image} boxSize="40px" mr={2} />
                    {strategy.name}
                  </Flex>
                </Td>
                <Td>{strategy.status}</Td>
                <Td>{strategy.liquidityAmount}</Td>
                <Td>{strategy.currentYield}</Td>
                <Td>{strategy.impermanentLoss}</Td>
                <Td>{strategy.rewardsEarned}</Td>
                <Td>
                  <IconButton 
                    icon={<MdEdit />} 
                    onClick={() => handleImageClick(strategy)} 
                    aria-label="Edit Strategy" 
                    mr={2} 
                  />
                  <IconButton 
                    icon={<MdPause />} 
                    onClick={handlePauseStrategy} 
                    aria-label="Pause Strategy" 
                    mr={2} 
                  />
                  <IconButton 
                    icon={<MdStop />} 
                    onClick={handleStopStrategy} 
                    aria-label="Stop Strategy" 
                  />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      )}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Strategy</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text mb={2}>Edit the strategy name:</Text>
            <Input 
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
            />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={handleEditStrategy}>Save</Button>
            <Button onClick={onClose} ml={2}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
        </Card>

  );
};

export default StrategyOverview;
