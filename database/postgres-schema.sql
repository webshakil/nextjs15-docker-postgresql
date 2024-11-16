CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TYPE AuthRole AS ENUM ('USER', 'ADMIN');
CREATE TABLE users (
    id uuid NOT NULL DEFAULT uuid_generate_v4(),                     
    name VARCHAR(255) NOT NULL,                
    email VARCHAR(255) UNIQUE NOT NULL,         
    "emailVerified" TIMESTAMP WITH TIME ZONE,    
    image TEXT,                                 
    role AuthRole NOT NULL DEFAULT 'USER',            
    created_at TIMESTAMP DEFAULT NOW(),         
    updated_at TIMESTAMP DEFAULT NOW()          
    PRIMARY KEY (id)
);


CREATE TABLE accounts (
    id SERIAL PRIMARY KEY,                      
    userId INT NOT NULL REFERENCES users(id) ON DELETE CASCADE, 
    type VARCHAR(50) NOT NULL,                  
    provider VARCHAR(255) NOT NULL,             
    refresh_token TEXT,                         
    access_token TEXT,                          
    expires_at BIGINT,                          
    id_token TEXT,                              
    scope TEXT,                                
    session_state TEXT,                         
    token_type VARCHAR(50),                     
    created_at TIMESTAMP DEFAULT NOW(),        
    updated_at TIMESTAMP DEFAULT NOW()         
);
