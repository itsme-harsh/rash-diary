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
        "/users/register": {
            "post": {
              "tags": ["Users"],
              "summary": "Register a new user",
              "description": "Create a new user account with validation.",
              "requestBody": {
                "required": true,
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "object",
                      "properties": {
                        "avatar": {
                          "type": "string",
                          "description": "Upload your avatar image",
                          "example": "avatar.png"
                        },
                        "coverImage": {
                          "type": "string",
                          "description": "Upload your cover image",
                          "example": "cover.jpg"
                        },
                        "username": {
                          "type": "string",
                          "description": "Username must be between 5 and 30 characters",
                          "minLength": 5,
                          "maxLength": 30,
                          "example": "okay123"
                        },
                        "email": {
                          "type": "string",
                          "description": "Must be a valid email address",
                          "format": "email",
                          "example": "user@example.com"
                        },
                        "password": {
                          "type": "string",
                          "description": "Password must be at least 8 characters long",
                          "minLength": 8,
                          "example": "password123"
                        },
                        "confirmPassword": {
                          "type": "string",
                          "description": "Must match the password",
                          "example": "password123"
                        }
                      },
                      "required": ["username", "email", "password", "confirmPassword"]
                    }
                  }
                }
              },
              "responses": {
                "201": {
                  "description": "User registered successfully",
                  "content": {
                    "application/json": {
                      "schema": {
                        "type": "object",
                        "properties": {
                          "statusCode": {
                            "type": "integer",
                            "example": 201
                          },
                          "data": {
                            "type": "object",
                            "properties": {
                              "_id": {
                                "type": "string",
                                "example": "66cf321d9b5601123c8a662bd"
                              },
                              "username": {
                                "type": "string",
                                "example": "okay123"
                              },
                              "email": {
                                "type": "string",
                                "example": "user@example.com"
                              },
                              "createdAt": {
                                "type": "string",
                                "example": "2024-08-28T14:20:13.449Z"
                              },
                              "updatedAt": {
                                "type": "string",
                                "example": "2024-08-28T14:20:13.449Z"
                              },
                              "__v": {
                                "type": "integer",
                                "example": 0
                              }
                            }
                          },
                          "message": {
                            "type": "string",
                            "example": "User registered successfully"
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
                // "400": {
                //   "description": "Bad Request - Validation errors",
                //   "content": {
                //     "application/json": {
                //       "schema": {
                //         "type": "object",
                //         "properties": {
                //           "statusCode": {
                //             "type": "integer",
                //             "example": 400
                //           },
                //           "message": {
                //             "type": "string",
                //             "example": "Invalid input data"
                //           },
                //           "details": {
                //             "type": "array",
                //             "items": {
                //               "type": "string",
                //               "example": "Username must be at least 3 characters long"
                //             }
                //           },
                //           "success": {
                //             "type": "boolean",
                //             "example": false
                //           }
                //         }
                //       }
                //     }
                //   }
                // },
                "409": {
                    "description": "Conflict - User already exists",
                    "content": {
                      "application/json": {
                        "schema": {
                          "type": "object",
                          "properties": {
                            "success": {
                              "type": "boolean",
                              "example": false
                            },
                            "message": {
                              "type": "string",
                              "example": "User with this email or username already exists"
                            }
                          }
                        }
                      }
                    }
                }
              }
            }
          },
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