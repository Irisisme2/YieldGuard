import React, { useState } from "react";
import {
  Box,
  Flex,
  Text,
  Grid,
  VStack,
  Image,
  Tooltip,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  Badge,
  Select,
  HStack,
  Spinner,
  useColorModeValue,
} from "@chakra-ui/react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend } from 'recharts';
import Card from "components/card/Card.js";
import LTC from "assets/img/icons/ltc.png";
import eth from "assets/img/icons/eth.png";
import btc from "assets/img/icons/btc.png";
import ada from "assets/img/icons/ada.png";
import dai from "assets/img/icons/dai.png";
import bnb from "assets/img/icons/bnb.png"; 
import avax from "assets/img/icons/avalanche.png"; 
// Sample data for user’s crypto balances
const cryptoBalances = [
  { name: "Ethereum", symbol: "ETH", amount: 2.5, price: 1600, image: eth, performance: [1500, 1600, 1700, 1600, 1550], transactions: [{ date: "2024-09-01", amount: 0.5 }, { date: "2024-09-02", amount: 1.0 }] },
  { name: "Bitcoin", symbol: "BTC", amount: 0.1, price: 26000, image: btc, performance: [25000, 26000, 27000, 26500, 26000], transactions: [{ date: "2024-09-03", amount: 0.01 }, { date: "2024-09-04", amount: 0.05 }] },
  { name: "Cardano", symbol: "ADA", amount: 1500, price: 0.45, image: ada, performance: [0.4, 0.45, 0.5, 0.48, 0.46], transactions: [{ date: "2024-09-05", amount: 100 }, { date: "2024-09-06", amount: 200 }] },
  { name: "Binance Coin", symbol: "BNB", amount: 1.5, price: 300, image: bnb, performance: [290, 300, 310, 295, 305], transactions: [{ date: "2024-09-07", amount: 0.5 }, { date: "2024-09-08", amount: 0.5 }] },
  { name: "Dai", symbol: "DAI", amount: 0.75, price: 90, image: dai, performance: [85, 90, 95, 92, 90], transactions: [{ date: "2024-09-09", amount: 0.2 }, { date: "2024-09-10", amount: 0.3 }] },
  { name: "Litecoin", symbol: "LTC", amount: 0.75, price: 90, image: LTC, performance: [85, 90, 95, 92, 90], transactions: [{ date: "2024-09-09", amount: 0.2 }, { date: "2024-09-10", amount: 0.3 }] },
];

const CryptoWallet = () => {
  const [selectedCrypto, setSelectedCrypto] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [sortOption, setSortOption] = useState("value");
  
  const handleCardClick = (crypto) => {
    setSelectedCrypto(crypto);
    onOpen();
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  const sortedCryptoBalances = [...cryptoBalances].sort((a, b) => {
    if (sortOption === "value") {
      return (b.amount * b.price) - (a.amount * a.price); // Sort by total value
    } else {
      return b.amount - a.amount; // Sort by amount
    }
  });

  return (
    <Box >
      <Card borderWidth="1px" p={4} boxShadow="lg">
        <Text fontSize="2xl" fontWeight="bold" mb={4}>
          My Crypto Wallet 💰
        </Text>

        <HStack mb={4}>
          <Select value={sortOption} onChange={handleSortChange} width="200px">
            <option value="value">Sort by Total Value</option>
            <option value="amount">Sort by Amount</option>
          </Select>
        </HStack>

        <Grid templateColumns="repeat(auto-fill, minmax(250px, 1fr))" gap={6}>
          {sortedCryptoBalances.map((crypto) => (
            <Card
              key={crypto.symbol}
              borderWidth="1px"
              p={4}
              boxShadow="md"
              borderRadius="md"
              position="relative"
              transition="0.3s"
              _hover={{ transform: "scale(1.05)", boxShadow: "lg" }}
              onClick={() => handleCardClick(crypto)}
            >
              <Flex align="center">
                <Image src={crypto.image} alt={crypto.name} boxSize="40px" mr={3} />
                <VStack align="start">
                  <Text fontWeight="bold">{crypto.name}</Text>
                  <Tooltip label={`Amount: ${crypto.amount} ${crypto.symbol}`} aria-label="A tooltip">
                    <Text color="gray.500">{crypto.amount} {crypto.symbol}</Text>
                  </Tooltip>
                  <Badge colorScheme="green">
                    ${Math.round(crypto.amount * crypto.price)}
                  </Badge>
                </VStack>
              </Flex>
              
              {/* Performance Graph */}
              <Box mt={4}>
                <LineChart width={220} height={100} data={crypto.performance.map((value, index) => ({ name: index + 1, value }))} >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" hide />
                  <YAxis hide />
                  <RechartsTooltip />
                  <Line type="monotone" dataKey="value" stroke="#8884d8" />
                </LineChart>
              </Box>
            </Card>
          ))}
        </Grid>
      </Card>

      {/* Modal for Cryptocurrency Details */}
      {selectedCrypto && (
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>{selectedCrypto.name} Details</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Text mb={2}><strong>Symbol:</strong> {selectedCrypto.symbol}</Text>
              <Text mb={2}><strong>Amount:</strong> {selectedCrypto.amount} {selectedCrypto.symbol}</Text>
              <Text mb={2}><strong>Current Price:</strong> ${selectedCrypto.price}</Text>
              <Text mb={2}><strong>Total Value:</strong> ${Math.round(selectedCrypto.amount * selectedCrypto.price)}</Text>
              
              <Text mt={4} fontWeight="bold">Recent Transactions</Text>
              {selectedCrypto.transactions.length > 0 ? (
                <Box mt={2}>
                  {selectedCrypto.transactions.map((tx, index) => (
                    <Text key={index} color="gray.500">{tx.date}: {tx.amount} {selectedCrypto.symbol}</Text>
                  ))}
                </Box>
              ) : (
                <Text color="gray.500">No recent transactions.</Text>
              )}
            </ModalBody>
            <ModalFooter>
              <Button colorScheme='blue' mr={3} onClick={onClose}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </Box>
  );
};

export default CryptoWallet;
