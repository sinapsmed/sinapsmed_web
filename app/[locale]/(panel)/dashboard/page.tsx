import { GetUserCalendar } from "@/actions/user"
import HomeSection from "@/containers/dashboard/home/HomeSection"

export default async function Home() {
    const getCalendar = await GetUserCalendar()

    return (
        <main>
            {
              getCalendar.data && <HomeSection data={getCalendar.data}/>
            }
        </main>
    )
}