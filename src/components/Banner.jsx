import IconPlay from "../assets/play-button.png";

const Banner = () => {
  return (
    <section className="relative w-full h-[70vh] min-h-[480px] bg-banner bg-center bg-cover">
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent"></div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto h-full px-6 flex items-center">
        <div className="max-w-xl space-y-6">

          <span className="text-sm text-red-500 tracking-widest uppercase">
            TV Series
          </span>

          <h1 className="text-white font-extrabold text-4xl md:text-6xl leading-tight">
            Nghe nói em <br /> thích tôi
          </h1>

          <p className="text-white/80 text-sm md:text-base">
            Một câu chuyện tình cảm nhẹ nhàng, nơi những cảm xúc vụn vặt
            dần trở thành điều không thể thiếu trong cuộc sống.
          </p>

          <div className="flex items-center gap-4 pt-2">
            <button className="
              flex items-center gap-2
              bg-red-600 hover:bg-red-700
              text-white font-semibold
              px-6 py-3 rounded
              transition
            ">
              <img src={IconPlay} className="w-5 h-5" />
              Xem Phim
            </button>

            <button className="
              text-white/80 hover:text-white
              border border-white/30
              px-6 py-3 rounded
              transition
            ">
              Chi tiết
            </button>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Banner;
