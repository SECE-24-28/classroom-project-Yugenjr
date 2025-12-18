// src/components/PromoBanner.jsx
import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

// For Swiper v10+ the modules live in "swiper/modules"
import { EffectCoverflow, Pagination, Autoplay } from "swiper/modules";

import { useAppContext } from "../context/AppContext";

const slides = [
  {
    id: "prime-lite",
    image:
      "https://i.pinimg.com/1200x/ff/89/de/ff89def4e27d5ef26df2dc35f4abc9fe.jpg",
    planTitle: "Prime Lite",
    priceLine: "56 days @ ₹696",
    subtitle: "Unlimited calls & data",
    ctaText: "Get Now »",
  },
  {
    id: "ott-combo",
    image:
      "https://i.pinimg.com/736x/bb/1c/19/bb1c195511bc2b75ded16128994f5f89.jpg",
    planTitle: "OTT Combo Pack",
    priceLine: "30 days @ ₹95",
    subtitle: "Stream your favorites",
    ctaText: "Know More »",
  },
  {
    id: "entertainment",
    image:
      "https://i.pinimg.com/736x/d1/16/68/d116686ac9c4f5e093547f0ee5dae1af.jpg",
    planTitle: "Entertainment Pack",
    priceLine: "30 days @ ₹149",
    subtitle: "Unlimited fun",
    ctaText: "Know More »",
  },
  {
    id: "recharge-bonus",
    image:
      "https://i.pinimg.com/1200x/80/83/a9/8083a96b53779bac4cced4f5b7d4f212.jpg",
    planTitle: "Recharge Bonus",
    priceLine: "Varies",
    subtitle: "Save more on every recharge",
    ctaText: "Get Bonus »",
  },
];

const PromoBanner = () => {
  const [swiperInstance, setSwiperInstance] = useState(null);
  const { setSelectedPlan, setShowPlanModal } = useAppContext();

  const onCtaClick = (plan) => {
    setSelectedPlan(plan);
    setShowPlanModal(true);
  };

  return (
    <div className="w-full flex justify-center py-10">
      <div className="w-full" style={{ maxWidth: "calc(100% - 16rem)" }}>
        <Swiper
          onSwiper={setSwiperInstance}
          effect="coverflow"
          grabCursor={true}
          centeredSlides={true}
          slidesPerView="auto"
          spaceBetween={40}
          coverflowEffect={{
            rotate: 12,
            stretch: 0,
            depth: 150,
            modifier: 1,
            slideShadows: false,
          }}
          pagination={{ clickable: true }}
          autoplay={{ delay: 2500 }}
          modules={[EffectCoverflow, Pagination, Autoplay]}
          className="mx-auto"
        >
          {slides.map((s) => (
            <SwiperSlide
              key={s.id}
              className="w-96 md:w-[500px] relative rounded-2xl overflow-hidden shadow-2xl"
            >
              <img
                src={s.image}
                alt={s.planTitle}
                className="w-full h-64 md:h-72 object-cover"
              />

              <div className="absolute left-0 top-0 bottom-0 w-[45%] bg-black/35 backdrop-blur-md text-white p-4 md:p-6 flex flex-col justify-center rounded-tr-2xl rounded-br-2xl">
                <p className="text-sm opacity-90">Special Offer</p>
                <h3 className="text-xl md:text-2xl font-extrabold mt-1">
                  {s.planTitle}
                </h3>
                <p className="text-lg md:text-xl font-bold text-yellow-300 mt-1">
                  {s.priceLine}
                </p>
                <p className="text-sm mt-1 opacity-90">{s.subtitle}</p>

              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default PromoBanner;
