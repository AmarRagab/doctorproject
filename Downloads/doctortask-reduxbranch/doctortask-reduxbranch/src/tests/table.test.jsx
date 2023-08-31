import { render } from "@testing-library/react";
import Table from "../Components/Table/Table";
import { AuthContextProvider } from "../Components/context/Auth/AuthContextProvider";
import { screen, configure } from '@testing-library/react'



const data=[
    {
        "id": 8251,
        "city_id": 7,
        "address": "",
        "major": "العظام و المفاصل",
        "doctor": "د. اياد زيد",
        "mobile": "",
        "language_id": 2,
        "slug": "830073735",
        "is_active": 1,
        "created_at": "2023-01-10 12:40:16",
        "updated_at": null,
        "city": "قلقيليه"
        },
        {
            "id": 7539,
            "city_id": 13,
            "address": "",
            "major": "الاسنان",
            "doctor": "د.نور جرار",
            "mobile": "",
            "language_id": 2,
            "slug": "239835730",
            "is_active": 1,
            "created_at": "2023-01-10 12:40:16",
            "updated_at": null,
            "city": "رام الله"
            },
    ]

test("test table",() =>{
    render(
        <AuthContextProvider>
   <Table data={data} rowsPerPage={2}></Table>
   </AuthContextProvider>
 );
 expect(screen.getByText(/د.نور جرار/i)).toBeInTheDocument();
 expect(screen.getByText(/الاسنان/i)).toBeInTheDocument();
 expect(screen.getByText(/د. اياد زيد/i)).toBeInTheDocument();
 expect(screen.getByText(/العظام و المفاصل/i)).toBeInTheDocument();

    
});