import { useEffect, useState } from "react"
import Wrapper from "../components/Wrapper"
import localforage from "localforage"

const Dashboard = () => {
  const [attendees, setAttendees] = useState([])

  useEffect(() => {
    const fetchAttendees = async () => {
      try {
        let attendees = await localforage.getItem("users")

        attendees = attendees.filter(attendee => attendee.role === "user")
        setAttendees(attendees)
      } catch (err) {
        console.log(err)
      }
    }

    fetchAttendees()
  }, [])

  return (
    <Wrapper>
      <h1>Dashboard</h1>

      <h3 className="mt-4">List Of Attendes</h3>
      <ul>
        {attendees.map(attendee => (
          <li key={attendee.id}>{attendee.name}</li>
        ))}
      </ul>
    </Wrapper>
  )
}

export default Dashboard