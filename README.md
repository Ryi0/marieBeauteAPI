Comment utiliser le api
GET
/api/reservations/day/XXX/month/XXX Ici, remplace les XXX par les chiffres recherches pour trouver la liste des reservations de la journee


POST
/api/reservations/
{
  "day": 15,
  "month": 6,
  "timeStart": 14,
  "services": ["672c2d814bdae0199e653e1f", "672c2d904bdae0199e653e21"],
  "client": "ID_DU_CLIENT",
  "specialist": "ID_DU_SPECIALISTE"
}


POST
/api/specialists
{
       "name": "Jane Smith",
       "email": "jane@example.com",
       "number" : 819 998 2427
}

//Self explanatory i think

POST
/api/clients
{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "number": "+1234567890"
}

//Self explanatory i think
