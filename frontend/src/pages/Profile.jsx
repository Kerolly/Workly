// Profile.jsx

import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from "react";
import {authFetch} from "@/apiClient.js";
import {logout} from "@/authHandler.js"

import {Alert, Box, VStack, Heading, Spinner, Text, Button} from "@chakra-ui/react";

export default function Profile(){

    // init navigate
    const navigate = useNavigate();

    // settings for data
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // run only once, when load the page
    useEffect( () => {
        const fetchProfileData = async () => {

            try {
                // getting the data from server
                const data = await authFetch("GET", "/profile");
                setUser(data);

            }catch(err){ // catch some errors
                setError(err.message);
                console.log(err);
            }finally {
                setIsLoading(false); // set the loading to false
            }

        };

        fetchProfileData();

    }, [])

    const handleLogout = () => {
        logout() // call the logout component
        navigate("/login") // go to login page
    }


    // transmit the error to the user
    if (error) {
        return(
            <Alert.Root status="error">
                <Alert.Indicator />
                <Alert.Content>
                    <Alert.Title>Server Error</Alert.Title>
                    <Alert.Description>
                        Getting data from the server was occurred!
                    </Alert.Description>
                </Alert.Content>
            </Alert.Root>
        )
    }


    return(
        <Box minH="100vh" bg="gray.50"> {/* <-- Un fundal gri deschis */}

            {/* Un container pentru conținut, centrat */}
            <Box maxW="800px" mx="auto" p={8}>

                {/* Logica de afișare */}
                {isLoading ? (
                    <Box d="flex" justifyContent="center" alignItems="center" h="50vh">
                        <Spinner size="xl" />
                    </Box>
                ) : error ? (
                    <Alert status="error" m={4} w="auto">

                        {error}
                    </Alert>
                ) : (
                    // Cardul de profil
                    <VStack as="div"
                            bg="white"
                            p={8}
                            borderRadius="md"
                            shadow="md"
                            align="start"
                            spacing={4}
                            color="black"
                    >
                        <Heading mb={6}>Profilul Meu</Heading>
                        <Box>
                            <Text fontWeight="bold">Prenume:</Text>
                            <Text fontSize="lg">{user?.first_name}</Text>
                        </Box>
                        <Box>
                            <Text fontWeight="bold">Nume:</Text>
                            <Text fontSize="lg">{user?.last_name}</Text>
                        </Box>
                        <Box>
                            <Text fontWeight="bold">Email:</Text>
                            <Text fontSize="lg">{user?.email}</Text>
                        </Box>
                        <Box>
                            <Text fontWeight="bold">Rol:</Text>
                            <Text fontSize="lg" textTransform="capitalize">{user?.role}</Text>
                        </Box>

                        {/* --- BUTONUL DE LOGOUT ADĂUGAT AICI --- */}
                        <Button
                            colorScheme="red"     // Culoare roșie pentru logout
                            w="100%"                // Lățime completă
                            mt={4}                  // Un spațiu deasupra
                            onClick={handleLogout}  // Funcția pe care o apelează
                        >
                            Logout
                        </Button>
                        {/* --- SFÂRȘITUL ADĂUGĂRII --- */}

                    </VStack>
                )}
            </Box>
        </Box>
    );


}