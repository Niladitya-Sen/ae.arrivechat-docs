export type API = {
    api: string,
    endpoint: string,
    method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH",
    description: string,
    request: {
        headers: {
            [key: string]: string,
        }
        body: {
            [key: string]: string,
        },
        query: {
            [key: string]: {
                type: string,
                description: string,
            }
        },
        params: {
            [key: string]: {
                type: string,
                description: string,
            }
        }
    },
    response: {
        type: string,
        body: {
            [key: string]: string
        }
    }
}

export type APIDataType = {
    [key: string]: API[];
};

export const data: APIDataType = {
    "Chat Bot": [
        {
            api: "Chat Endpoint",
            endpoint: "/api/chat",
            method: "POST",
            description: "API for generating the chat response to user queries",
            request: {
                headers: {},
                body: {
                    email: "Customer's email address.",
                    user_input: "User's input for the chat.",
                },
                query: {},
                params: {},
            },
            response: {
                type: 'application/json',
                body: {
                    response: "Bot's response based on user input.",
                    error: "Present if there is an error during the chat operation.",
                },
            },
        },
    ],
    "Customer": [
        {
            api: "Translate Text Endpoint",
            endpoint: "/api/translate",
            method: "POST",
            description: "Translate text",
            request: {
                headers: {},
                body: {
                    text: "Text to be translated",
                    to: "Target language code",
                },
                query: {},
                params: {}
            },
            response: {
                type: 'application/json',
                body: {
                    translated_text: "Translated text",
                    error: "Error message if any",
                },
            },
        },
        {
            api: "Verify Token Endpoint",
            endpoint: "/api/auth/verify-token",
            method: "GET",
            description: "API for verification of generated token",
            request: {
                headers: {},
                body: {},
                query: {
                    token: { type: "string", description: "JWT token for verification." },
                },
                params: {},
            },
            response: {
                type: 'application/json',
                body: {
                    success: "Indicates whether the token is valid.",
                    message: "Describes the status of the token verification.",
                    decoded_token: "Decoded information from the JWT token.",
                    room_number: "Room number associated with the customer.",
                    language: "Customer's preferred language.",
                },
            },
        },
        {
            api: "Update Language Endpoint",
            endpoint: "/api/language",
            method: "POST",
            description: "API for updating the language in the database.",
            request: {
                body: {
                    language: "New preferred language for the customer.",
                },
                query: {},
                params: {},
                headers: {
                    Authorization: "Bearer token for authentication.",
                },
            },
            response: {
                type: 'application/json',
                body: {
                    success: "Indicates whether the operation was successful.",
                    message: "Describes the status of the language update.",
                    error: "Present if there is an error during the operation.",
                },
            },
        },
    ],
    "Captain": [
        {
            api: "Customer Endpoint",
            endpoint: "/api/customer",
            method: "POST",
            description: "Create a new customer",
            request: {
                headers: {},
                body: {
                    name: "Customer's name",
                    email: "Customer's email",
                    phone_number: "Customer's phone number",
                    unique_id: "Customer's unique id",
                    arrival_date: "Arrival date in YYYY-MM-DD format",
                    departure_date: "Departure date in YYYY-MM-DD format",
                },
                query: {},
                params: {}
            },
            response: {
                type: 'application/json',
                body: {
                    success: "Indicates whether the operation was successful i.e. whether the customer was added and mail was sent or not.",
                    message: "Message indicating success or failure",
                    error: "Error message if any",
                }
            }
        },
        {
            api: "Get Services by Room Endpoint",
            endpoint: "/get-services-by-room/:roomno",
            method: "GET",
            description: "Get services by room number",
            request: {
                headers: {},
                body: {},
                query: {},
                params: {
                    roomno: {
                        type: "string",
                        description: "Room number",
                    }
                }
            },
            response: {
                type: 'application/json',
                body: {
                    success: "Indicates whether the operation was successful",
                    services: "List of services associated with the room",
                    error: "Error message if any",
                }
            }
        },
        {
            api: "Add Room Number Endpoint",
            endpoint: "/api/customer/add-roomno",
            method: "POST",
            description: "API for allocating a room number to the customer in the database.",
            request: {
                body: {
                    roomno: "Room number to be added to the customer's details.",
                },
                query: {},
                params: {},
                headers: {
                    Authorization: "Bearer token for authentication.",
                },
            },
            response: {
                type: 'application/json',
                body: {
                    success: "Indicates whether the operation was successful.",
                    message: "Describes the status of the room number addition.",
                    error: "Present if there is an error during the operation.",
                },
            },
        },
        {
            api: "Captain Login Endpoint",
            endpoint: "/api/captain/auth/login",
            method: "POST",
            description: "API for authorizing a captain to log in to their account.",
            request: {
                body: {
                    employee_id: "Captain's employee ID.",
                    password: "Captain's password.",
                },
                query: {},
                params: {},
                headers: {},
            },
            response: {
                type: 'application/json',
                body: {
                    success: "Indicates whether the captain login was successful.",
                    token: "Bearer token for authenticated captain.",
                    message: "Describes the status of the captain login.",
                    error: "Present if there is an error during the operation.",
                },
            },
        },
    ],
};
