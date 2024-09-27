import React, { useState } from 'react';
import {
  Box,
  SimpleGrid,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  Flex,
  ModalBody,
  ModalFooter,
  Image,
  Button,
  useDisclosure,
} from '@chakra-ui/react';

import Card from 'components/card/Card.js';
import TotalRewards from "assets/img/rewards/TotalRewards.png"; 
import Withdrawal from "assets/img/rewards/Withdrawal.png"; 
import Pending from "assets/img/rewards/Pending.png"; 
import Liquidity from "assets/img/rewards/Liquidity.png"; 
import Referral from "assets/img/rewards/Referral.png"; 
import Loyalty from "assets/img/rewards/Loyalty.png"; 
import Promotional from "assets/img/rewards/Promotional.png"; 
import Seasonal from "assets/img/rewards/Seasonal.png"; 
import eth from "assets/img/icons/eth.png";
import btc from "assets/img/icons/btc.png";
import ltc from "assets/img/icons/ltc.png";
import ada from "assets/img/icons/ada.png";
import dot from "assets/img/icons/dot.png";
import usdc from "assets/img/icons/usdc.png"; 
const rewardsData = [
  {
    id: 1,
    category: 'Total Rewards',
    title: 'Total Rewards Earned',
    amount: '$1,500.00',
    imageUrl: TotalRewards,
    description: 'This represents the total rewards accumulated across all strategies.',
  },
  {
    id: 2,
    category: 'Withdrawals',
    title: 'Available for Withdrawal',
    amount: '$300.00',
    imageUrl: Withdrawal,
    description: 'This amount is currently available for withdrawal.',
  },
  {
    id: 3,
    category: 'Pending Rewards',
    title: 'Pending Rewards',
    amount: '$200.00',
    imageUrl: Pending,
    description: 'Rewards that are still being calculated and will be available soon.',
  },
  {
    id: 4,
    category: 'Liquidity Mining',
    title: 'Liquidity Mining Rewards',
    amount: '$400.00',
    imageUrl: Liquidity,
    description: 'Rewards earned from providing liquidity to the market.',
  },
  {
    id: 5,
    category: 'Staking Rewards',
    title: 'Staking Rewards - Ethereum',
    amount: '$350.00',
    imageUrl: eth, // Replace with the actual import for ETH image
    description: 'Rewards earned from staking Ethereum in the network.',
  },
  {
    id: 6,
    category: 'Staking Rewards',
    title: 'Staking Rewards - Cardano',
    amount: '$450.00',
    imageUrl: ada, // Replace with the actual import for ADA image
    description: 'Rewards earned from staking Cardano in the network.',
  },
  {
    id: 7,
    category: 'Referral Rewards',
    title: 'Referral Program Rewards',
    amount: '$50.00',
    imageUrl: Referral,
    description: 'Rewards earned from referring new users to the platform.',
  },
  {
    id: 8,
    category: 'Loyalty Rewards',
    title: 'Loyalty Program Rewards',
    amount: '$100.00',
    imageUrl: Loyalty,
    description: 'Rewards earned for being a loyal customer over time.',
  },
  {
    id: 9,
    category: 'Promotional Rewards',
    title: 'Seasonal Promotion Rewards',
    amount: '$75.00',
    imageUrl: Promotional,
    description: 'Extra rewards earned during special seasonal promotions.',
  },
  {
    id: 10,
    category: 'Seasonal Rewards',
    title: 'Holiday Rewards',
    amount: '$125.00',
    imageUrl: Seasonal,
    description: 'Rewards available during the holiday season events.',
  },
];



const RewardsOverview = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedReward, setSelectedReward] = useState(null);

  const handleImageClick = (reward) => {
    setSelectedReward(reward);
    onOpen();
  };

  return (
    <Card  borderWidth="1px"  p={4} boxShadow="lg">

    <Box p={5}>
      <Text fontSize="2xl" mb={4}>Rewards Overview</Text>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={5}>
        {rewardsData.map(reward => (
          <Card key={reward.id} borderWidth="1px"  p={4} boxShadow="lg" height="350px">
            <Flex direction="column" align="center" justify="center" onClick={() => handleImageClick(reward)} cursor="pointer" height="100%">
              <Image 
                src={reward.imageUrl} 
                width="300px" // Set the image size to occupy 95% of the card width
                height="70%" // Increase the height of the image
                objectFit="contain" 
                mb={2} 
              />
              <Text fontWeight="bold">{reward.title}</Text>
              <Text fontSize="lg" color="green.500">{reward.amount}</Text>
              <Text color="gray.600" fontSize="sm">{reward.category}</Text>
            </Flex>
          </Card>
        ))}
      </SimpleGrid>

      {/* Modal for displaying selected reward details */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{selectedReward?.title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text mb={4}>{selectedReward?.description}</Text>
            <Text fontWeight="bold">Amount: {selectedReward?.amount}</Text>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
    </Card>
  );
};



export default RewardsOverview;