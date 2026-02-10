// PersonalInfoCard.jsx

import {Box, Flex, Heading, Icon, Text} from "@chakra-ui/react";
import {CircleUserRound} from "lucide-react";

export default function PersonalInfoCard() {

    return (
        <Box bg={"white"} borderRadius={"15px"}
             maxWidth={"700px"}>

            <Flex p={"40px"}
                  direction={"row"} justify={"space-between"} align={"flex-start"}>

                <Box>
                    <Heading>Personal Information</Heading>
                    <Text>You can view and edit your data</Text>
                </Box>

                <Flex  align={"center"} gap={"12px"}>
                    <Icon color={"primary.500"}><CircleUserRound size={"50px"} strokeWidth={1.2} /></Icon>
                    <Box>
                        <Heading>Ticarat Andrei</Heading>
                        <Text>Manager</Text>
                    </Box>
                </Flex>
            </Flex>

        </Box>
    )
}