import { assets } from "../assets/assets";
import Title from "./Title";
import {motion} from 'motion/react'

const Testimonial = () => {

    const testimonials = [
  {
    name: "Aarav Sharma",
    location: "Delhi, India",
    image: assets.testimonial_image_1,
    testimonial:
      "CarRentals provided an excellent experience from start to finish. The car was clean, well-maintained, and delivered on time. I would highly recommend their service to anyone looking for a reliable rental."
  },
  {
    name: "Priya Nair",
    location: "Bengaluru, India",
    image: assets.testimonial_image_2,
    testimonial:
      "I was truly impressed by the quality of service offered by CarRentals. The booking process was smooth, the car performance was great, and the customer support team was very professional."
  },
  {
    name: "Rohit Verma",
    location: "Mumbai, India",
    image: assets.testimonial_image_3,
    testimonial:
      "CarRentals exceeded my expectations. The vehicle was in excellent condition and the pricing was transparent. I would definitely encourage others to rent a car from CarRentals for a hassle-free journey."
  }
];


  return (
    <div className="py-28 px-6 md:px-16 lg:px-24 xl:px-44">

     <Title title="What Our Customers Says" subTitle="Discover why discerning travelers choose StayVenture for thie luxury accomodations around the world" />


      <div className="grid gird-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-18">
        {testimonials.map((testimonial,index) => (
          <motion.div
            initial={{opacity:0, y:40}} whileInView={{opacity:1,y:0}} transition={{duration: 0.6,delay:index*0.2, ease:'easeOut'}} viewport={{once: true, amount: 0.3}}
            key={index}
            className="bg-white p-6 rounded-xl shadow-lg hover:-translate-y-1 transition-all duration-500"
          >
            <div className="flex items-center gap-3">
              <img
                className="w-12 h-12 rounded-full"
                src={testimonial.image}
                alt={testimonial.name}
              />
              <div>
                <p className="text-xl">{testimonial.name}</p>
                <p className="text-gray-500">{testimonial.location}</p>
              </div>
            </div>
            <div className="flex items-center gap-1 mt-4">
              {Array(5)
                .fill(0)
                .map((_, index) => (
                  <img key={index} src={assets.star_icon} alt="star_icon" />
                ))}
            </div>
            <p className="text-gray-500 max-w-90 mt-4 font-light">
              "{testimonial.testimonial}"
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Testimonial;
