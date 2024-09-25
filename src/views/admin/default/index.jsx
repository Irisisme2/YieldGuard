import {
  Avatar,
  Box,
  Flex,
  FormLabel,
  Icon,
  Select,
  SimpleGrid,
  useColorModeValue,
} from "@chakra-ui/react";
import MiniStatistics from "components/card/MiniStatistics";
import IconBox from "components/icons/IconBox";
import React from "react";
import {
  MdShowChart,
  MdAttachMoney,
  MdBarChart,
  MdCardGiftcard,
} from "react-icons/md";
import MarketInsights from "views/admin/default/components/MarketInsights";
import AnalyticsSection from "views/admin/default/components/AnalyticsSection";
import ActiveStrategiesPanel from "views/admin/default/components/ActiveStrategiesPanel";

export default function UserReports() {
  // Chakra Color Mode
  const brandColor = useColorModeValue("brand.500", "white");
  const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
<SimpleGrid
  columns={{ base: 1, md: 2, lg: 3, "2xl": 6 }}
  gap='20px'
  mb='20px'>
  
  <MiniStatistics
    startContent={
      <IconBox
        w='56px'
        h='56px'
        bg={boxBg}
        icon={
          <Icon w='32px' h='32px' as={MdBarChart} color={brandColor} />
        }
      />
    }
    name='Total Liquidity Provided'
    value='$10,500' // Example value, this would be dynamically populated
  />
  
  {/* Current Yield */}
  <MiniStatistics
    startContent={
      <IconBox
        w='56px'
        h='56px'
        bg={boxBg}
        icon={
          <Icon w='32px' h='32px' as={MdAttachMoney} color={brandColor} />
        }
      />
    }
    name='Current Yield'
    value='4.5%' // Example yield percentage, this would be dynamically populated
  />
  
  {/* Impermanent Loss */}
  <MiniStatistics
    startContent={
      <IconBox
        w='56px'
        h='56px'
        bg={boxBg}
        icon={
          <Icon w='32px' h='32px' as={MdShowChart} color={brandColor} />
        }
      />
    }
    name='Impermanent Loss'
    value='-2.3%' // Example impermanent loss percentage, this would be dynamically populated
  />
  
  {/* Rewards Earned */}
  <MiniStatistics
    startContent={
      <IconBox
        w='56px'
        h='56px'
        bg={boxBg}
        icon={
          <Icon w='32px' h='32px' as={MdCardGiftcard} color={brandColor} />
        }
      />
    }
    name='Rewards Earned'
    value='$850' 
  />
</SimpleGrid>

<SimpleGrid
        columns={{ base: 1, md: 2 }}
        spacing='20px' 
        mb='20px'
        templateColumns='3fr 1fr'
      >
        <AnalyticsSection />
        <ActiveStrategiesPanel />
      </SimpleGrid>

      <SimpleGrid columns={{ base: 1 }} gap='20px' mb='20px'>
        <MarketInsights />
      </SimpleGrid>
    </Box>
  );
}
