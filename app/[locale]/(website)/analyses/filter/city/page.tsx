import { GetCities } from "@/actions/analysis";
import CitySection from "@/containers/analyses/filter/CitySection";

export default async function FilterByCity() {
    const getCities = await GetCities()
    return(
        <main>
           {
            getCities.data &&  <CitySection data={getCities.data}/>
           }
        </main>
    )
}