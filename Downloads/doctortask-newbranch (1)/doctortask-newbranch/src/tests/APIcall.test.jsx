import DoctorForm from "../Components/DoctorForm";
import * as services from "../services/api";
import { render } from "@testing-library/react";
test("test api call", () =>{
    const mockFetchData = jest.spyOn(services, 'fetchApiData')
        .mockImplementation(async () => {
            return [{
                doctor: 'kunal'
            }];
        })
         render(<DoctorForm></DoctorForm>);
 expect(mockFetchData).toHaveBeenCalled();
});