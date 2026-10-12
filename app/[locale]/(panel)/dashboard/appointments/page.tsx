import { GetUserAppointments } from "@/actions/user"
import FetchProvider from "@/components/providers/FetchProvider"
import AppointmentsSection from "@/containers/dashboard/appointments/AppointmentsSection"
import { SearchParams } from "@/types/query"

interface Props {
  searchParams: SearchParams
}

export default async function AppointmentsPage({ searchParams }: Props) {
  const getAppointments = await GetUserAppointments(searchParams)

  return (
    <main>
      {getAppointments.data &&
        <FetchProvider
          action={GetUserAppointments}
          initialData={getAppointments.data}
          searchParams={{
            page: (searchParams.page ?? '1') as string,
          }}>
          <AppointmentsSection />
        </FetchProvider>
      }
    </main>
  )
}
