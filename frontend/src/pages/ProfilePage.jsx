// ProfilePage.jsx

import {Box, Flex, Grid, GridItem, Heading, Text} from "@chakra-ui/react";
import SidebarComponent from "@/components/layout/SidebarComponent.jsx";
import PersonalInfoCard from "@/components/layout/PersonalInfoCard.jsx";

export default function ProfilePage() {
    return (
        <>
            <Flex direction={"row"}>
                <SidebarComponent/>
                <Grid templateColumns={{base: "1fr", lg: "3fr 1fr"}} >

                    <Box bg={"aqua"}>
                        <PersonalInfoCard/>

                    </Box>
                    <Box bg={"black"}>
                        <Text>Find your personal information and activities rate</Text>
                    </Box>



                </Grid>
            </Flex>

        </>

    )
}