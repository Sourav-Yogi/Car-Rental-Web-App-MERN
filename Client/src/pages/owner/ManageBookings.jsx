import { useEffect, useState } from 'react'
import { dummyMyBookingsData } from '../../assets/assets';
import Title from '../../components/owner/Title';
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';

const ManageBookings = () => {

  const { currency, axios, isOwner, authLoading } = useAppContext();
  const [bookings, setBookings] = useState([]);

  const fetchOwnerBookings =async ()=>{
     try {
      const {data}=await axios.get('/api/booking/owner')
      data.success ? setBookings(data.bookings): toast.error(data.message)
     } catch (error) {
       toast.error(error.message)
     }
  }

  const changeBookingStatus =async (bookingId, status)=>{
     try {
      const {data}=await axios.post('/api/booking/change-status', {bookingId, status})
      if(data.success){
        toast.success(data.message)
        fetchOwnerBookings()
      }else{
        toast.error(data.message)
      }
     } catch (error) {
       toast.error(error.message)
     }
  }

    useEffect(() => {
      if (!authLoading && isOwner) {
        fetchOwnerBookings();
      }
    }, [authLoading, isOwner]);



  return (
    <div className="p-4 pt-10 md:px-10 w-full">
  <Title
    title="Manage Bookings"
    subtitle="Track all customer bookings, approve or cancle requests, and manage booking statuses."
  />

  <div className="max-w-4xl w-full rounded-lg overflow-hidden border border-borderColor mt-6 bg-white shadow-sm">
    <table className="w-full border-collapse text-left text-sm text-gray-600">
      <thead className="bg-light text-gray-600">
        <tr>
          <th className="p-3 font-medium">Car</th>
          <th className="p-3 font-medium max-md:hidden">Date Range</th>
          <th className="p-3 font-medium">Total</th>
          <th className="p-3 font-medium max-md:hidden">Status</th>
          <th className="p-3 font-medium">Actions</th>
        </tr>
      </thead>

      <tbody>
        {bookings.map((booking, index) => (
          <tr
            key={index}
            className="border-t border-borderColor text-gray-500 hover:bg-light transition"
          >
            <td className="p-3 flex items-center gap-3">
              <img
                src={booking.car.image}
                alt=""
                className="h-12 w-12 rounded-md object-cover border border-borderColor"
              />
              <p className="font-medium max-md:hidden">
                {booking.car.brand} {booking.car.model}
              </p>
            </td>

            <td className="p-3 max-md:hidden text-sm">
              {booking.pickupDate.split("T")[0]} to{" "}
              {booking.returnDate.split("T")[0]}
            </td>

            <td className="p-3 font-medium text-gray-700">
              {currency}
              {booking.price}
            </td>

            <td className="p-3 max-md:hidden">
              <span className="bg-gray-100 px-3 py-1 rounded-full text-xs font-medium">
                offline
              </span>
            </td>

            <td className="p-3">
              {booking.status === "pending" ? (
                <select onChange={e=>changeBookingStatus(booking._id, e.target.value)} className="px-3 py-1.5 text-sm text-gray-600 border border-borderColor rounded-md outline-none bg-white">
                  <option value="pending">Pending</option>
                  <option value="confirmed">Confirm</option>
                  <option value="cancelled">Cancel</option>
                </select>
              ) : (
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    booking.status === "confirmed"
                      ? "bg-green-100 text-green-500"
                      : "bg-red-100 text-red-500"
                  }`}
                >
                  {booking.status}
                </span>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>

  )
}

export default ManageBookings