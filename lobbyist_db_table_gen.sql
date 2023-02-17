-- Drop table if already exists
DROP TABLE IF EXISTS lobbyist_employer_client_combo;

-- Create main table
CREATE TABLE lobbyist_employer_client_rel (
	client_id VARCHAR,
	client_name VARCHAR,
	employer_id VARCHAR,
	employer_name VARCHAR,
	lobbyist_first_name VARCHAR,
	lobbyist_id VARCHAR,
	lobbyist_last_name VARCHAR,
	lobbyist_middle_initial VARCHAR,
	lobbyist_salutation VARCHAR,
	year VARCHAR
);

CREATE TABLE lobbyist_contribution (
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
    period_end VARCHAR,
    period_start VARCHAR
);

-- Data loaded validation
Select * From lobbyist_employer_client_rel;
Select * From compensation;
