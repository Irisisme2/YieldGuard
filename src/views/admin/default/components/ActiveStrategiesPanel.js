import React, { useState } from 'react';
import {
  Box,
  SimpleGrid,
  Text,
  Image,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Button,
  Tag,
  Input,
  useToast,
  HStack,
  Select,
  IconButton,
  Divider,
  Checkbox,
  useDisclosure,
  Flex,
} from '@chakra-ui/react';
import { FiEdit, FiTrash, FiCheck, FiPause } from 'react-icons/fi';

// Import images for strategies
import eth from "assets/img/icons/eth.png";
import btc from "assets/img/icons/btc.png";
import ltc from "assets/img/icons/ltc.png";
import ada from "assets/img/icons/ada.png";
import dot from "assets/img/icons/dot.png";
import usdc from "assets/img/icons/usdc.png"; 
import Card from 'components/card/Card.js';

// Sample data for strategies
const initialStrategies = [
  {
    id: 1,
    name: 'ETH Liquidity Strategy',
    status: 'Active',
    yield: '5.2%',
    impermanentLoss: '2.1%',
    entryFee: '0.5%',
    exitFee: '0.3%',
    description: 'A robust strategy focused on providing liquidity to ETH markets.',
    image: eth,
    historicalData: [5.0, 5.1, 5.3, 5.2, 5.4], // Example historical yields
  },
  {
    id: 2,
    name: 'BTC Liquidity Strategy',
    status: 'Paused',
    yield: '3.7%',
    impermanentLoss: '1.5%',
    entryFee: '0.4%',
    exitFee: '0.2%',
    description: 'A conservative approach for BTC liquidity provision.',
    image: btc,
    historicalData: [3.5, 3.6, 3.8, 3.7, 3.9],
  },
  {
    id: 3,
    name: 'LTC Liquidity Strategy',
    status: 'Stopped',
    yield: '4.0%',
    impermanentLoss: '3.0%',
    entryFee: '0.6%',
    exitFee: '0.3%',
    description: 'Targeting high returns in the LTC market.',
    image: ltc,
    historicalData: [4.1, 4.0, 3.9, 3.8, 3.7],
  },
  {
    id: 4,
    name: 'ADA Liquidity Strategy',
    status: 'Active',
    yield: '6.0%',
    impermanentLoss: '1.8%',
    entryFee: '0.5%',
    exitFee: '0.3%',
    description: 'Utilizing ADA volatility for liquidity gains.',
    image: ada,
    historicalData: [5.8, 5.9, 6.1, 6.0, 6.2],
  },
  {
    id: 5,
    name: 'DOT Liquidity Strategy',
    status: 'Paused',
    yield: '4.5%',
    impermanentLoss: '2.5%',
    entryFee: '0.5%',
    exitFee: '0.3%',
    description: 'Focusing on the growth of the DOT ecosystem.',
    image: dot,
    historicalData: [4.4, 4.5, 4.6, 4.5, 4.7],
  },
  {
    id: 6,
    name: 'USDC Liquidity Strategy',
    status: 'Active',
    yield: '4.8%',
    impermanentLoss: '1.2%',
    entryFee: '0.2%',
    exitFee: '0.1%',
    description: 'Stable and low-risk liquidity provision.',
    image: usdc,
    historicalData: [4.7, 4.8, 4.9, 4.8, 4.9],
  },
];

const ActiveStrategiesPanel = () => {
  const [strategies, setStrategies] = useState(initialStrategies);
  const [filteredStrategies, setFilteredStrategies] = useState(initialStrategies);
  const [selectedStrategy, setSelectedStrategy] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('name');
  const [selectedIds, setSelectedIds] = useState(new Set());
  const toast = useToast();
  const { isOpen: isConfirmOpen, onOpen: onConfirmOpen, onClose: onConfirmClose } = useDisclosure();
  const [strategyToDelete, setStrategyToDelete] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const strategiesPerPage = 3; // Number of strategies per page

  const handleOpen = (strategy) => {
    setSelectedStrategy(strategy);
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
    setSelectedStrategy(null);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active':
        return 'green';
      case 'Paused':
        return 'orange';
      case 'Stopped':
        return 'red';
      default:
        return 'gray';
    }
  };

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
    const filtered = strategies.filter(strategy => 
      strategy.name.toLowerCase().includes(value)
    );
    setFilteredStrategies(filtered);
  };

  const handleStatusChange = (newStatus) => {
    if (selectedStrategy) {
      const updatedStrategies = strategies.map(strategy => {
        if (strategy.id === selectedStrategy.id) {
          return { ...strategy, status: newStatus };
        }
        return strategy;
      });
      setStrategies(updatedStrategies);
      setSelectedStrategy({ ...selectedStrategy, status: newStatus });
      toast({
        title: "Status Updated.",
        description: `The strategy status has been changed to ${newStatus}.`,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleSortChange = (e) => {
    const value = e.target.value;
    setSortOption(value);
    const sortedStrategies = [...filteredStrategies].sort((a, b) => {
      if (value === 'yield') {
        return parseFloat(b.yield) - parseFloat(a.yield); // Descending by yield
      }
      if (value === 'name') {
        return a.name.localeCompare(b.name); // Ascending by name
      }
      return 0;
    });
    setFilteredStrategies(sortedStrategies);
  };

  const handleDeleteStrategy = (strategy) => {
    setStrategyToDelete(strategy);
    onConfirmOpen();
  };

  const confirmDelete = () => {
    setStrategies(prev => prev.filter(s => s.id !== strategyToDelete.id));
    setFilteredStrategies(prev => prev.filter(s => s.id !== strategyToDelete.id));
    onConfirmClose();
    toast({
      title: "Strategy Deleted.",
      description: `${strategyToDelete.name} has been removed.`,
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  // Multi-select for bulk actions
  const handleCheckboxChange = (id) => {
    const updatedSelectedIds = new Set(selectedIds);
    if (updatedSelectedIds.has(id)) {
      updatedSelectedIds.delete(id);
    } else {
      updatedSelectedIds.add(id);
    }
    setSelectedIds(updatedSelectedIds);
  };

  const handleBulkDelete = () => {
    const updatedStrategies = strategies.filter(strategy => !selectedIds.has(strategy.id));
    setStrategies(updatedStrategies);
    setFilteredStrategies(updatedStrategies);
    toast({
      title: "Strategies Deleted.",
      description: "Selected strategies have been removed.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
    setSelectedIds(new Set());
  };

  const handleBulkStatusChange = (newStatus) => {
    const updatedStrategies = strategies.map(strategy => {
      if (selectedIds.has(strategy.id)) {
        return { ...strategy, status: newStatus };
      }
      return strategy;
    });
    setStrategies(updatedStrategies);
    setFilteredStrategies(updatedStrategies);
    toast({
      title: "Status Updated.",
      description: `Selected strategies have been changed to ${newStatus}.`,
      status: "success",
      duration: 3000,
      isClosable: true,
    });
    setSelectedIds(new Set());
  };

  // Pagination logic
  const indexOfLastStrategy = currentPage * strategiesPerPage;
  const indexOfFirstStrategy = indexOfLastStrategy - strategiesPerPage;
  const currentStrategies = filteredStrategies.slice(indexOfFirstStrategy, indexOfLastStrategy);
  const totalPages = Math.ceil(filteredStrategies.length / strategiesPerPage);

  return (
    <Card p="4" shadow="md" borderWidth="1px" width="430px">
      <Box width="400px">
        <HStack mb="4" spacing={2}>
          <Input 
            placeholder="Search Strategies..." 
            value={searchTerm}
            onChange={handleSearch}
            width="100%"
          />
          <Select onChange={handleSortChange} width="100px" placeholder="Sort">
            <option value="name">Name</option>
            <option value="yield">Yield</option>
          </Select>
        </HStack>
  
        {/* Updated SimpleGrid for vertical layout */}
        <SimpleGrid columns={1} spacing={4}>
          {currentStrategies.map((strategy) => (
            <Card key={strategy.id} p="4" shadow="md" borderWidth="1px" width="400px">
              <HStack mb="2">
                <Image boxSize="50px" src={strategy.image} alt={strategy.name} />
                <Text fontWeight="bold" fontSize="md" isTruncated maxWidth="200px">{strategy.name}</Text>
                <Checkbox 
                  isChecked={selectedIds.has(strategy.id)} 
                  onChange={() => handleCheckboxChange(strategy.id)} 
                  size="lg"
                />
              </HStack>
              <Text>Status: 
                <Tag colorScheme={getStatusColor(strategy.status.toLowerCase())} ml="2">
                  {strategy.status}
                </Tag>
              </Text>
              <Text>Yield: {strategy.yield}</Text>
              <Text>Impermanent Loss: {strategy.impermanentLoss}</Text>
              <HStack mt="4">
                <Button colorScheme="blue" onClick={() => handleOpen(strategy)}>View Details</Button>
                <IconButton 
                  aria-label="Delete Strategy" 
                  icon={<FiTrash />} 
                  colorScheme="red" 
                  onClick={() => handleDeleteStrategy(strategy)} 
                />
              </HStack>
              <Divider my="4" />
            </Card>
          ))}
        </SimpleGrid>
        {/* Pagination Controls */}
        <HStack mt="4" justifyContent="space-between">
          <Button 
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} 
            isDisabled={currentPage === 1}
          >
            Previous
          </Button>
          <Text>{`Page ${currentPage} of ${totalPages}`}</Text>
          <Button 
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} 
            isDisabled={currentPage === totalPages}
          >
            Next
          </Button>
        </HStack>
  
        {/* Modal for Strategy Details */}
        {selectedStrategy && (
          <Modal isOpen={isOpen} onClose={handleClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>{selectedStrategy.name}</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Text fontWeight="bold">Status: 
                  <Tag colorScheme={getStatusColor(selectedStrategy.status.toLowerCase())} ml="2">
                    {selectedStrategy.status}
                  </Tag>
                </Text>
                <Text>Yield: {selectedStrategy.yield}</Text>
                <Text>Impermanent Loss: {selectedStrategy.impermanentLoss}</Text>
                <Text>Entry Fee: {selectedStrategy.entryFee}</Text>
                <Text>Exit Fee: {selectedStrategy.exitFee}</Text>
                <Text mt="4" fontWeight="bold">Description:</Text>
                <Text>{selectedStrategy.description}</Text>
                <Text mt="4" fontWeight="bold">Historical Yield:</Text>
                <SimpleGrid columns={3} spacing={2}>
                  {selectedStrategy.historicalData.map((data, index) => (
                    <Text key={index} textAlign="center">{data}%</Text>
                  ))}
                </SimpleGrid>
                <Button colorScheme="blue" mt="4" onClick={() => handleStatusChange('Active')}>Activate</Button>
                <Button colorScheme="orange" mt="4" ml="2" onClick={() => handleStatusChange('Paused')}>Pause</Button>
                <Button colorScheme="red" mt="4" ml="2" onClick={() => handleStatusChange('Stopped')}>Stop</Button>
                <Button colorScheme="teal" mt="4" ml="2" onClick={() => alert('Edit strategy parameters!')}>Edit Parameters</Button>
              </ModalBody>
            </ModalContent>
          </Modal>
        )}
  
        {/* Confirmation Modal for Deleting Strategy */}
        <Modal isOpen={isConfirmOpen} onClose={onConfirmClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Confirm Deletion</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Text>Are you sure you want to delete the strategy "{strategyToDelete?.name}"?</Text>
              <HStack mt="4" justifyContent="flex-end">
                <Button colorScheme="red" onClick={confirmDelete}>Delete</Button>
                <Button onClick={onConfirmClose}>Cancel</Button>
              </HStack>
            </ModalBody>
          </ModalContent>
        </Modal>
      </Box>
    </Card>
  );
  
};

export default ActiveStrategiesPanel;
