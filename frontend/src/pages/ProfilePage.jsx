// ProfilePage.jsx

import {Box, Flex, Grid, GridItem, Heading, Text} from "@chakra-ui/react";
import SidebarComponent from "@/components/layout/SidebarComponent.jsx";

export default function ProfilePage() {
    return (
        <>
            <Flex direction={"row"}>
                <SidebarComponent/>
                <Box>

                    <Heading>My Profile</Heading>
                    <Text>Find your personal information and activities rate</Text>

                </Box>
            </Flex>

        </>

    )
}