// SidebarComponent.jsx

import {Box, Button, Flex, HStack, Icon, Text, VStack} from "@chakra-ui/react";
import {Link} from "react-router-dom";
import {Tooltip} from "@/components/ui/tooltip"
import {ArrowLeft, ArrowRight, LayoutDashboard, LogOut, UserRoundCog} from "lucide-react";
import BrandLogo from "@/components/shared/BrandLogo.jsx";
import {useState} from "react";
import {logout} from "@/authHandler.js";



/**
 * Sidebar navigation component for the app.
 *
 * Renders a left sidebar with:
 * - A brand header and collapse/expand toggle
 * - A list of navigation links (with tooltips when collapsed)
 * - A logout action
 *
 * This component manages its own collapsed state and does not accept props.
 *
 * @component
 * @returns {JSX.Element} Sidebar UI.
 */
export default function SidebarComponent() {


    const [isCollapsed, setIsCollapsed] = useState(false);

    const menuItems = [
        {
            icon: LayoutDashboard,
            label: "Dashboard",
            path: "/dashboard/employee"
        },
        {
            icon: UserRoundCog,
            label: "Profile",
            path: "/profile"
        },
    ]

    return (
        <>
            <Box width={isCollapsed ? {base: 'none', lg: "50px", xl: "60px"} : {lg: "240px", xl: "260px"}}
                 height={"100vh"} bg={"secondary.800"}
                 transition={"width 0.5s ease"}
                 overflow={"hidden"} whiteSpace={"nowrap"}
                 display={"flex"} flexDirection={"column"}>

                <Flex>
                    <BrandLogo mt={"10px"} ml={"16px"} text={"Portal Manager"} isCollapsed={isCollapsed}/>

                    {isCollapsed ?
                        // if the sidebar is collapsed
                        <Icon as={ArrowRight} cursor={"pointer"}
                              color={{base: "secondary.600", _hover: "secondary.300"}}
                              transition={"all 0.2s"} onClick={() => setIsCollapsed(!isCollapsed)}
                              mt={"20px"} ml={"16px"}/> :

                        // if the sidebar isn't collapsed
                        <Icon as={ArrowLeft} cursor={"pointer"} color={{base: "secondary.600", _hover: "secondary.300"}}
                              transition={"all 0.2s"} onClick={() => setIsCollapsed(!isCollapsed)}
                              mt={"20px"} mr={"16px"}/>}

                </Flex>

                {/*Navigation items*/}
                <VStack as={"nav"} align={"stretch"} mt={"20px"}>

                    {menuItems.map((item, index) => {
                        const isActive = location.pathname === item.path; // get the page location

                        return (
                            <Tooltip content={item.label} positioning={{placement: "right"}} disabled={!isCollapsed}
                                     key={index}>
                                <Link to={item.path} style={{textDecoration: "none"}}>
                                    <HStack pl={"16px"} py={"10px"} cursor={"pointer"}
                                            color={{base: "secondary.200", _hover: "white"}} width={"100%"}
                                            bg={{base: isActive ? "primary.600" : "transparent", _hover: "primary.500"}}

                                            transition={"all 0.4s"} borderRadius={"sm"}>
                                        <Icon as={item.icon}/>
                                        {isCollapsed ? null : <Text>{item.label}</Text>}

                                    </HStack>
                                </Link>
                            </Tooltip>
                        )
                    })}


                </VStack>

                <Box mt={"auto"}>
                    <Button variant="plain"
                            color={{base: "secondary.200", _hover: "primary.500"}} transition={"all 0.4s ease-out"}
                            onClick={() => {
                                logout();
                                navigate("/login")
                            }}><LogOut/> {isCollapsed ? null : "Logout"}</Button>
                </Box>

            </Box>
        </>
    )
}