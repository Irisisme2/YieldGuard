// Pools.js
import React, { useState } from "react";
import {
  Box,
  Button,
  Flex,
  Grid,
  Text,
  useColorModeValue,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Input,
  Select,
  VStack,
  Tooltip,
  Alert,
  Spinner,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  CloseButton,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react"; 
import { MdWarning, MdCheckCircle } from "react-icons/md";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend } from 'recharts';
import Card from 'components/card/Card.js';

// Import images
import eth from "assets/img/icons/eth.png";
import btc from "assets/img/icons/btc.png";
import ada from "assets/img/icons/ada.png";
import dot from "assets/img/icons/dot.png";
import bnb from "assets/img/icons/bnb.png";
import LTC from "assets/img/icons/ltc.png";

// Sample staking pools data
const stakingPools = [
  {
    id: 1,
    name: 'ETH Staking Pool',
    totalLiquidity: '1000 ETH',
    apy: '5%',
    fees: '0.5%',
    tokenPair: 'ETH-USDC',
    historicalPerformance: [5, 6, 4, 5, 7],
    recentTransactions: [
      { date: "2024-09-01", amount: "10 ETH" },
      { date: "2024-09-02", amount: "15 ETH" },
    ],
    image: eth,
  },
  {
    id: 2,
    name: 'BTC Staking Pool',
    totalLiquidity: '500 BTC',
    apy: '7%',
    fees: '0.6%',
    tokenPair: 'BTC-USDT',
    historicalPerformance: [7, 8, 6, 7, 9],
    recentTransactions: [
      { date: "2024-09-01", amount: "2 BTC" },
      { date: "2024-09-03", amount: "1.5 BTC" },
    ],
    image: btc,
  },
  {
    id: 3,
    name: 'ADA Staking Pool',
    totalLiquidity: '3000 ADA',
    apy: '6.5%',
    fees: '0.4%',
    tokenPair: 'ADA-BNB',
    historicalPerformance: [6, 5.5, 6.5, 7, 6.5],
    recentTransactions: [
      { date: "2024-09-01", amount: "1000 ADA" },
      { date: "2024-09-04", amount: "500 ADA" },
    ],
    image: ada,
  },
  {
    id: 4,
    name: 'DOT Staking Pool',
    totalLiquidity: '800 DOT',
    apy: '8%',
    fees: '0.5%',
    tokenPair: 'DOT-ETH',
    historicalPerformance: [8, 9, 7, 8.5, 8],
    recentTransactions: [
      { date: "2024-09-02", amount: "200 DOT" },
      { date: "2024-09-05", amount: "150 DOT" },
    ],
    image: dot,
  },
  {
    id: 5,
    name: 'BNB Staking Pool',
    totalLiquidity: '200 BNB',
    apy: '6%',
    fees: '0.3%',
    tokenPair: 'BNB-BUSD',
    historicalPerformance: [6, 6.5, 5.5, 6, 6.5],
    recentTransactions: [
      { date: "2024-09-03", amount: "20 BNB" },
      { date: "2024-09-06", amount: "10 BNB" },
    ],
    image: bnb,
  },
  {
    id: 6,
    name: 'LTC Staking Pool',
    totalLiquidity: '1500 LTC',
    apy: '9%',
    fees: '0.7%',
    tokenPair: 'LTC-DOGE',
    historicalPerformance: [9, 8.5, 9.5, 9, 8],
    recentTransactions: [
      { date: "2024-09-02", amount: "300 LTC" },
      { date: "2024-09-07", amount: "200 LTC" },
    ],
    image: LTC,
  },
];
export default function Marketplace() {
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedPool, setSelectedPool] = useState(null);
  const [liquidityAmount, setLiquidityAmount] = useState("");
  const [liquidityToken, setLiquidityToken] = useState("ETH");
  const [userWallet, setUserWallet] = useState("");
  const [notification, setNotification] = useState(null);
  const [loading, setLoading] = useState(false);
  const [confirmJoin, setConfirmJoin] = useState(false); // For confirmation modal
  const [userBalance, setUserBalance] = useState({ ETH: 50, BTC: 2, ADA: 1000, BNB: 20, LTC: 10 }); // Sample balances

  const handleJoinPoolClick = (poolId) => {
    setSelectedPool(poolId);
    onOpen();
  };

  const validateWalletAddress = (address) => {
    // Simple wallet address validation
    return address.length > 0;
  };

  const handleJoinPool = () => {
    if (!validateWalletAddress(userWallet)) {
      setNotification({ type: "error", message: "Invalid wallet address." });
      return;
    }
    if (liquidityAmount <= 0) {
      setNotification({ type: "error", message: "Amount must be greater than zero." });
      return;
    }
    if (liquidityAmount > userBalance[liquidityToken]) {
      setNotification({ type: "error", message: `Insufficient balance. You have ${userBalance[liquidityToken]} ${liquidityToken}.` });
      return;
    }

    setConfirmJoin(true); // Show confirmation modal
  };

  const confirmJoinPool = () => {
    setLoading(true);
    setConfirmJoin(false);

    // Simulate an asynchronous operation (like a blockchain transaction)
    setTimeout(() => {
      // Update the user's balance by deducting the liquidity amount
      setUserBalance((prevBalance) => ({
        ...prevBalance,
        [liquidityToken]: prevBalance[liquidityToken] - liquidityAmount,
      }));

      setLoading(false);
      setNotification({ type: "success", message: `Successfully added ${liquidityAmount} ${liquidityToken} to the pool from wallet ${userWallet}!` });
      setLiquidityAmount("");
      setLiquidityToken("ETH");
      setUserWallet("");
      onClose();
    }, 2000);
  };

  const pool = selectedPool !== null ? stakingPools.find(pool => pool.id === selectedPool) : null;

  return (
    <Box>
      <Card borderWidth="1px" p={4} boxShadow="lg">
      {notification && (
        <Alert status={notification.type} mb={4}>
          <AlertIcon />
          <AlertTitle mr={2}>Notification:</AlertTitle>
          <AlertDescription>{notification.message}</AlertDescription>
          <CloseButton position="absolute" right="8px" top="8px" />
        </Alert>
      )}

      <Grid mb="20px">
        <Text fontSize="2xl" fontWeight="bold" mb="4">Pool List 📊</Text>
        <Table variant="simple" colorScheme="teal">
          <Thead>
            <Tr>
              <Th>Pool Name</Th>
              <Th>Total Liquidity</Th>
              <Th>APY</Th>
              <Th>Fees</Th>
              <Th>Token Pair</Th>
              <Th>Pool Status</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {stakingPools.map(pool => (
              <Tr key={pool.id}>
                <Td>
                  <Flex align="center">
                    <img src={pool.image} alt={pool.name} width="30px" style={{ marginRight: '10px' }} />
                    {pool.name}
                  </Flex>
                </Td>
                <Td>{pool.totalLiquidity}</Td>
                <Td>
                  <Tooltip label="Annual Percentage Yield" aria-label="A tooltip">
                    <Text>{pool.apy}</Text>
                  </Tooltip>
                </Td>
                <Td>
                  <Tooltip label="Transaction Fees" aria-label="A tooltip">
                    <Text>{pool.fees}</Text>
                  </Tooltip>
                </Td>
                <Td>{pool.tokenPair}</Td>
                <Td>
                  {parseFloat(pool.apy) > 7 ? (
                    <MdCheckCircle color="green" />
                  ) : (
                    <MdWarning color="orange" />
                  )}
                </Td>
                <Td>
                  <Button
                    colorScheme="blue"
                    onClick={() => handleJoinPoolClick(pool.id)}
                  >
                    Join Pool ➕
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Grid>

      <Modal isOpen={isOpen} onClose={onClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Join Pool: {pool ? pool.name : "Loading..."}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {pool ? (
              <>
                <Text mb="4">Add liquidity to the selected pool:</Text>
                <VStack spacing={4}>
                  <Input
                    placeholder="Enter amount"
                    type="number"
                    value={liquidityAmount}
                    onChange={(e) => setLiquidityAmount(e.target.value)}
                  />
                  <Select
                    value={liquidityToken}
                    onChange={(e) => setLiquidityToken(e.target.value)}
                  >
                    <option value="ETH">ETH</option>
                    <option value="USDC">USDC</option>
                    <option value="BTC">BTC</option>
                    <option value="USDT">USDT</option>
                    <option value="ADA">ADA</option>
                    <option value="BNB">BNB</option>
                    <option value="LTC">LTC</option>
                  </Select>
                  <Input
                    placeholder="Enter your wallet address"
                    value={userWallet}
                    onChange={(e) => setUserWallet(e.target.value)}
                  />
                  <Text color="gray.500" fontSize="sm">Current Balance: {userBalance[liquidityToken]} {liquidityToken}</Text>
                </VStack>
              </>
            ) : (
              <Text>Loading pool details...</Text>
            )}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleJoinPool}>
              Add Liquidity
            </Button>
            <Button variant="ghost" onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Modal isOpen={confirmJoin} onClose={() => setConfirmJoin(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Confirm Joining Pool</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>Are you sure you want to add {liquidityAmount} {liquidityToken} to the {pool ? pool.name : "pool"}?</Text>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={confirmJoinPool} isLoading={loading}>
              Confirm
            </Button>
            <Button variant="ghost" onClick={() => setConfirmJoin(false)}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Card>
    </Box>
  );
}
