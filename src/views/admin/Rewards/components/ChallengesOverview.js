import React, { useState } from 'react';
import {
  Box,
  SimpleGrid,
  Text,
  Image,
  Button,
  Flex,
} from '@chakra-ui/react';
import Card from 'components/card/Card.js';

// Import challenge icons
import matic from "assets/img/icons/matic.png"; // Replace with actual path
import LTC from "assets/img/icons/ltc.png";
import eth from "assets/img/icons/eth.png";
import btc from "assets/img/icons/btc.png";
import ada from "assets/img/icons/ada.png";
import dai from "assets/img/icons/dai.png";
import usdc from "assets/img/icons/usdc.png"; 
import avax from "assets/img/icons/avalanche.png"; 

const challengesData = [
  {
    id: 1,
    category: 'Staking',
    title: 'Stake 100 MATIC',
    amount: 'Reward: 10 MATIC',
    imageUrl: matic,
    description: 'Stake 100 MATIC to earn 10 MATIC as a reward.',
  },
  {
    id: 2,
    category: 'Staking',
    title: 'Stake 10 LTC',
    amount: 'Reward: 5 LTC',
    imageUrl: LTC,
    description: 'Stake 10 LTC to earn 5 LTC as a reward.',
  },
  {
    id: 3,
    category: 'Liquidity Mining',
    title: 'Provide Liquidity for ETH',
    amount: 'Reward: 15 ETH',
    imageUrl: eth,
    description: 'Provide liquidity for ETH and earn rewards.',
  },
  {
    id: 4,
    category: 'Staking',
    title: 'Stake 200 ADA',
    amount: 'Reward: 20 ADA',
    imageUrl: ada,
    description: 'Stake 200 ADA to earn 20 ADA as a reward.',
  },
  {
    id: 5,
    category: 'Referral',
    title: 'Refer a Friend',
    amount: 'Reward: $50',
    imageUrl: matic, // Use a suitable image
    description: 'Refer a friend and earn $50 reward.',
  },
  {
    id: 6,
    category: 'Seasonal',
    title: 'Participate in Seasonal Challenge',
    amount: 'Reward: $100',
    imageUrl: avax, // Use a suitable image
    description: 'Participate in the seasonal challenge to earn rewards.',
  },
  {
    id: 7,
    category: 'Daily Challenge',
    title: 'Complete Daily Tasks',
    amount: 'Reward: $20',
    imageUrl: dai, // Use a suitable image
    description: 'Complete daily tasks to earn rewards.',
  },
  {
    id: 8,
    category: 'Special Event',
    title: 'Join Special Event',
    amount: 'Reward: $75',
    imageUrl: matic, // Use a suitable image
    description: 'Join our special event to earn rewards.',
  },
  {
    id: 9,
    category: 'Trading',
    title: 'Trade 1000 USDC',
    amount: 'Reward: $10',
    imageUrl: usdc, 
    description: 'Trade 1000 USDC to earn rewards.',
  },
  {
    id: 10,
    category: 'Staking',
    title: 'Stake 500 BTC',
    amount: 'Reward: 50 BTC',
    imageUrl: btc, // Use a suitable image
    description: 'Stake 500 BTC to earn 0.0005 BTC as a reward.',
  },
];

const ChallengesOverview = () => {
  const [selectedChallenge, setSelectedChallenge] = useState(null);

  const handleAcceptChallenge = (challenge) => {
    // Logic for accepting the challenge goes here
    console.log(`Challenge accepted: ${challenge.title}`);
    // You can add more functionality here like updating state or notifying the user
  };

  return (
    <Box p={5}>
                <Card borderWidth="1px" p={4} boxShadow="lg" height="1930px">
      <Text fontSize="2xl" mb={4}>Challenges Overview</Text>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={5}>
        {challengesData.map(challenge => (
          <Card key={challenge.id} borderWidth="1px" p={4} boxShadow="lg" height="350px">
            <Flex direction="column" align="center" justify="center" height="100%">
              <Image 
                src={challenge.imageUrl} 
                boxSize="95%" 
                height="50%" 
                objectFit="contain" 
                mb={2} 
              />
              <Text fontWeight="bold">{challenge.title}</Text>
              <Text fontSize="lg" color="green.500">{challenge.amount}</Text>
              <Text color="gray.600" fontSize="sm">{challenge.category}</Text>
              <Button 
                colorScheme="blue" 
                mt={4} 
                onClick={() => handleAcceptChallenge(challenge)}
                size="lg" // Make the button larger
                fontSize="lg" // Increase font size
                px={6} // Increase horizontal padding
                py={4} // Increase vertical padding
              >
                Accept Challenge
              </Button>
            </Flex>
          </Card>
        ))}
      </SimpleGrid>
      </Card>
    </Box>
  );
};

export default ChallengesOverview;
