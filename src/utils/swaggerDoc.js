const swaggerDoc = {
    openapi: "3.0.0",
    info: {
        title: "Rash-diary API",
        version: "1.0.0",
        description: "API Documentation",
    },
    servers: [
        {
            url: "https://rash-diary.onrender.com/api/v1",
            description: "Api server",
        },
    ],
    "tags": [
        {
          "name": "Users",
          "description": "Operations related to users"
        }
      ],
      "paths": {
        "/users/login": {
          "post": {
            "tags": ["Users"],
            "summary": "User Login",
            "description": "Authenticate a user and return an access token and a refresh token.",
            "requestBody": {
              "required": true,
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "oneOf": [
                      {
                        "properties": {
                          "email": {
                            "type": "string",
                            "format": "email"
                          },
                          "password": {
                            "type": "string"
                          }
                        },
                        "required": ["email", "password"]
                      },
                      {
                        "properties": {
                          "username": {
                            "type": "string"
                          },
                          "password": {
                            "type": "string"
                          }
                        },
                        "required": ["username", "password"]
                      }
                    ]
                  },
                  "examples": {
                    "Using Email": {
                      "summary": "Example with email",
                      "value": {
                        "email": "user@example.com",
                        "password": "password123"
                      }
                    },
                    "Using Username": {
                      "summary": "Example with username",
                      "value": {
                        "username": "dummyUser",
                        "password": "password123"
                      }
                    }
                  }
                }
              }
            },
            "responses": {
              "200": {
                "description": "Successful login",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "object",
                      "properties": {
                        "statusCode": {
                          "type": "integer",
                          "example": 200
                        },
                        "data": {
                          "type": "object",
                          "properties": {
                            "user": {
                              "type": "object",
                              "properties": {
                                "_id": {
                                  "type": "string",
                                  "example": "12345abcde"
                                },
                                "username": {
                                  "type": "string",
                                  "example": "dummyUser"
                                },
                                "email": {
                                  "type": "string",
                                  "example": "user@example.com"
                                },
                                "createdAt": {
                                  "type": "string",
                                  "example": "2024-01-01T00:00:00.000Z"
                                },
                                "updatedAt": {
                                  "type": "string",
                                  "example": "2024-01-01T01:00:00.000Z"
                                }
                              }
                            },
                            "accessToken": {
                              "type": "string",
                              "example": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                            },
                            "refreshToken": {
                              "type": "string",
                              "example": "dXNlcm5hbWU6cGFzc3dvcmQxMjM="
                            }
                          }
                        },
                        "message": {
                          "type": "string",
                          "example": "User logged in successfully"
                        },
                        "success": {
                          "type": "boolean",
                          "example": true
                        }
                      }
                    }
                  }
                }
              },
              "401": {
                "description": "Unauthorized - Invalid credentials",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "object",
                      "properties": {
                        "statusCode": {
                          "type": "integer",
                          "example": 401
                        },
                        "message": {
                          "type": "string",
                          "example": "Invalid email or password"
                        },
                        "success": {
                          "type": "boolean",
                          "example": false
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
}

export default swaggerDoc;