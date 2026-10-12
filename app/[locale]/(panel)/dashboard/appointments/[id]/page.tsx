import { GetUserAppointmentDetail } from "@/actions/user"
import AppointmentDetailSection from "@/containers/dashboard/appointments/AppointmentDetailSection"

interface Props{
    params: {
        id: string
    }
}
export default async function AppointmentDetailPage({params}: Props) {
    const getAppointment = await GetUserAppointmentDetail(params.id)
    
  return (
    <main>
        {
            getAppointment.data && <AppointmentDetailSection data={getAppointment.data}/>
        }
    </main>
  )
}