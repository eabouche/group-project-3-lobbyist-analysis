-- Drop tables if already exists
DROP TABLE IF EXISTS lobbyists;
DROP TABLE IF EXISTS contribution;
DROP TABLE IF EXISTS compensation;
-- DROP TABLE IF EXISTS lobbyist_employer_client_rel; 

-- Create main tables
CREATE TABLE lobbyists (
	address_1  	VARCHAR,    
	city       	VARCHAR,    
	country     VARCHAR,   
	created_date   VARCHAR,
	email       VARCHAR,
	employer_id VARCHAR, 
	employer_name VARCHAR,
	fax			VARCHAR,
	first_name  VARCHAR,   
	last_name   VARCHAR,  
	lobbyist_id VARCHAR,
	phone       VARCHAR,
	salutation 	VARCHAR,
	state       VARCHAR,   
	year   		VARCHAR,        
	zip   		VARCHAR
);

CREATE TABLE contribution (
	contribution_id VARCHAR,
	period_start VARCHAR,
	period_end VARCHAR,
	contribution_date VARCHAR,
	recipient VARCHAR,
	amount float,
	lobbyist_id VARCHAR,
	lobbyist_first_name VARCHAR,
	lobbyist_last_name VARCHAR,
	created_date VARCHAR
);

CREATE TABLE compensation (
    client_id VARCHAR,
    client_name VARCHAR,
    compensation_amount FLOAT,
    compensation_id VARCHAR,
    lobbyist_first_name VARCHAR,
    lobbyist_id VARCHAR,
    lobbyist_last_name VARCHAR,
    lobbyist_middle_initial VARCHAR,
    period_end DATE,
    period_start DATE
);

-- CREATE TABLE lobbyist_employer_client_rel (
-- 	client_id INT,
-- 	client_name VARCHAR,
-- 	employer_id INT,
-- 	employer_name VARCHAR,
-- 	lobbyist_first_name VARCHAR,
-- 	lobbyist_id INT,
-- 	lobbyist_last_name VARCHAR,
-- 	lobbyist_middle_initial VARCHAR,
-- 	lobbyist_salutation VARCHAR,
-- 	year INT
-- );

-- Data loaded validation
Select * From lobbyists;
Select * From contribution;
Select * From compensation;
--Select * From lobbyist_employer_client_rel;

-- Look for duplication
Select count(*), count(DISTINCT lobbyist_id), count(DISTINCT employer_id) From lobbyists;
Select count(*), count(DISTINCT contribution_id) From contribution;
Select count(*), count(DISTINCT compensation_id) From compensation;