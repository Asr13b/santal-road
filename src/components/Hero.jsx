import { useState, useEffect } from "react";

const slides = [
  { src: "/h1.jpg", alt: "የመንገድ ልማት ፕሮጀክት ምስል 1" },
  { src: "/h2.jpg", alt: "የመንገድ ልማት ፕሮጀክት ምስል 2" },
  { src: "/h3.jpg", alt: "የመንገድ ልማት ፕሮጀክት ምስል 3" },
  { src: "/h4.jpg", alt: "የመንገድ ልማት ፕሮጀክት ምስል 4" },
];

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const [loaded, setLoaded] = useState({});

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative w-full overflow-hidden bg-emerald-900">
      <div className="relative h-[55vh] min-h-[320px] max-h-[600px] w-full">
        {slides.map((slide, index) => (
          <div
            key={slide.src}
            className={`absolute inset-0 transition-opacity duration-[1200ms] ease-in-out ${
              index === current ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
            aria-hidden={index !== current}
          >
            {loaded[index] ? (
              <img
                src={slide.src}
                alt={slide.alt}
                className="w-full h-full object-cover"
                loading={index === 0 ? "eager" : "lazy"}
                onError={(e) => {
                  e.target.style.display = "none";
                }}
              />
            ) : (
              <img
                src={slide.src}
                alt={slide.alt}
                className="w-full h-full object-cover"
                loading={index === 0 ? "eager" : "lazy"}
                onLoad={() => setLoaded((p) => ({ ...p, [index]: true }))}
                onError={() => setLoaded((p) => ({ ...p, [index]: true }))}
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/40 to-black/20" />
          </div>
        ))}

        {/* የጽሑፍ ይዘት */}
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-3 drop-shadow-lg leading-tight">
            ሳንታል የህብረተሰብ
            <br />
            መንገድ ልማት
          </h1>
          <p className="text-base xs:text-lg sm:text-xl md:text-2xl text-amber-300 font-semibold drop-shadow-md mb-6 max-w-2xl">
            በአንድነት እንሰራ መንገዳችንን
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2">
            <span className="px-3 py-1.5 bg-white/20 backdrop-blur-sm rounded-full text-white text-xs sm:text-sm font-medium">
              የህብረት ስራ
            </span>
            <span className="px-3 py-1.5 bg-white/20 backdrop-blur-sm rounded-full text-white text-xs sm:text-sm font-medium">
              የማህበረሰብ ተሳትፎ
            </span>
          </div>
        </div>

        {/* የስላይድ አመልካቾች */}
        <div className="absolute bottom-4 left-0 right-0 z-20 flex justify-center gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              aria-label={`ወደ ምስል ${index + 1} ሂድ`}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === current
                  ? "w-8 bg-amber-400"
                  : "w-2 bg-white/60 hover:bg-white/90"
              }`}
            />
          ))}
        </div>
      </div>

      {/* መግለጫ */}
      <div className="bg-emerald-50 px-4 py-6">
        <div className="container-app">
          <p className="text-sm xs:text-base sm:text-lg text-gray-800 leading-relaxed text-center max-w-3xl mx-auto">
            ይህ ፕሮጀክት የሳንታል ማህበረሰብ የመንገድ ልማት ፕሮጀክት ሲሆን፣ በሁሉም የማህበረሰቡ አባላት ተሳትፎ እና
            አስተዋጽኦ የሚከናወን ነው። ጠንካራ እና ዘላቂ የሆነ የመንገድ መሰረተ ልማት በመገንባት የማህበረሰቡን ኑሮ
            ለማሻሻል እንሰራለን።
          </p>
        </div>
      </div>
    </section>
  );
}
