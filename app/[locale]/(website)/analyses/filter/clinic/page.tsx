import { GetClinics } from "@/actions/analysis"
import { GetAllPartner } from "@/actions/partner"
import ClinicSection from "@/containers/analyses/filter/ClinicSection"

export default async function FilterByCity() {
    const getPartners = await GetAllPartner()
    return(
        <main>
            {
                getPartners.data && <ClinicSection data={getPartners.data}/>
            }
        </main>
    )
}