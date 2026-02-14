// ProfilePage.jsx

import {Box, Flex, Grid, Heading, Text} from "@chakra-ui/react";
import SidebarComponent from "@/components/layout/SidebarComponent.jsx";
import PersonalInfoCard from "@/components/layout/PersonalInfoCard.jsx";
import InfoCard from "@/components/shared/InfoCard.jsx";
import {Briefcase} from "lucide-react";

export default function ProfilePage() {
    return (
        <>
            <Flex direction={"row"}>
                <SidebarComponent/>
                <Grid width={"100%"} templateColumns={{base: "1fr", lg: "4fr 1fr"}}>

                    <Box bg={"secondary.50"}>

                        <Box ml={["20px", "80px"]} mt={"35px"}>
                            <Box>
                                <Heading fontSize={"30px"} fontWeight={"bold"}>My Profile</Heading>
                                <Text fontSize={"16px"}>Find your personal information and activities rate</Text>
                            </Box>

                            {/*--- Import Personal Info Card ---*/}
                            <PersonalInfoCard mt={"35px"}/>


                        </Box>

                    </Box>

                    <Box bg={"black"}>

                        <InfoCard upperText={"Activities"} text={"6"}
                                  bg={"primary.200"} icon={Briefcase} iconSize={"45px"}
                                  upperTextColor={"grey"} textColor={"primary.500"}/>

                    </Box>


                </Grid>
            </Flex>

        </>

    )
}