
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

<div> Main Source: <a href="https://data.cityofchicago.org/" target="_blank"> The Chicago Data Portal.</a> 
</div>
  
  | Dataset   | Description              |  Link |
  | ------------- | ------------------------ |----------|
  | Lobbyist Table | Contains a list of all registered lobbyists authorized to work with politicians in the city of Chicago |  <a href="https://data.cityofchicago.org/Ethics/Lobbyist-Data-Lobbyists/tq3e-t5yq" target="_blank">Lobbyist Data - Lobbyists </a> |
  | Contribution Table      | Contains all contributions made to politicians in the city of Chicago |   <a href="https://data.cityofchicago.org/Ethics/Lobbyist-Data-Contributions/p9p7-vfqc" target="_blank">Lobbyist Data - Contributions </a> |         
  | Compensation Table      | Contains a list of all payments to lobbyists and who the clients making the payments are | <a href="https://data.cityofchicago.org/Ethics/Lobbyist-Data-Compensation/dw2f-w78u" target="_blank">Lobbyist Data - Compensation </a> |
  
  

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
