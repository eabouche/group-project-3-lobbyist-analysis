
<div><img align=left width=200px height=120px src="https://github.com/eabouche/group-project-3-lobbyist-analysis/blob/main/images/lobbyist_img.png">
  
# Group Project 3 - Lobbyist Analysis
  
This was a group project in which our team picked the subject, found the data sets to use in the city of chicago data portal, and had to quickly collect the datasets via APIs, clean the data, store it in a datbase, and use it to build an insightful dashboard and a visualization map of the dataset.  Project duration was 2 weeks.</div>


## Contributors
  
- Sandhya Datla
- Andrew Kang
- Enrique Bouche
- Daniel Andreou
  
## Topic Chosen Description

We decided to use the Chicago Data Portal to investigate lobbying activity within the city of Chicago.


## DataSets

<div> Source: <a href="https://data.cityofchicago.org/Health-Human-Services/Food-Inspections/4ijn-s7e5" target="_blank">Chicago Data Portal - CHANGE ME.</a> 
Dataset #1 - DESCRIPTION. Dataset #2 - DESCRIPTION ...</div>
  
  | Column Name   | Type    | Description              |
  | ------------- | ------- | ------------------------ |
  | Inspection Id | Int     | Unique Id per inspection 
  | DBA Name      | String  | Business Name            
  | AKA Name      | String  | Also Known As Name
  
  

## Questions we are trying to answer

Are there certain geographic concentrations of lobbyists?

Who are the most well compensated lobbyists and where are they located?

What companies are the most prevalent in lobbying in general and for the above individuals

## Steps to cleanup the data

Data was extracted from 3 tables in the Chicago Data Portal. These are the Lobbyist, Contribution, and Compensation table.
Initial stages of cleanup involve extracting the data via API into Pandas dataframes and then converting the datatypes into the
proper forms - dates, and integers mostly. Answering the question of the 'who are the most wellc ompensated lobbyists and where are they located' and
'are there certain geographic concentration of lobbyists?' involved using GeoApify to convert the street address information provided in the Lobbyist Table
to latitude and longitude coordinates. The Lobbyist and Compensation table were additionally merged for the well compensated lobbyist locations.

## Project Results - Dashboard

- CHANGE ME


## Project Limitations

- DESCRIPTION.
