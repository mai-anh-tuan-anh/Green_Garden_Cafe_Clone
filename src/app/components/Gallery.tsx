import furniture1 from "../../assets/images/furniture1.png";
import backyard from "../../assets/images/backyard.png";
import cake from "../../assets/images/cake.png";
import hero from "../../assets/images/hero.jpg";
import table from "../../assets/images/table.jpg";
export function Gallery() {
  const images = [
    {
      id: 1,
      url: hero,
      alt: "Khuôn viên",
    },
    {
      id: 2,
      url: furniture1,
      alt: "Nội thất bên trong",
    },
    {
      id: 3,
      url: "https://images.unsplash.com/photo-1771159978458-3df74f41a918?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYXJpc3RhJTIwbWFraW5nJTIwY29mZmVlfGVufDF8fHx8MTc3Mjg2NDEyM3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      alt: "Barista lành nghề",
    },
    {
      id: 4,
      url: backyard,
      alt: "Sân vườn",
    },
    {
      id: 5,
      url: "https://images.unsplash.com/photo-1667388363683-a07bbf0c84b1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYXR0ZSUyMGFydCUyMGNhcHB1Y2Npbm98ZW58MXx8fHwxNzcyODU3NTk0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      alt: "Nghệ thuật latte",
    },
    {
      id: 6,
      url: "https://images.unsplash.com/photo-1548693563-25dc13e7b2c1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYWZlJTIwcGFzdHJ5JTIwZGVzc2VydHxlbnwxfHx8fDE3NzI3NTM3MzJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      alt: "Đồ ăn nhanh",
    },
    {
      id: 7,
      url: "https://images.unsplash.com/photo-1638978127697-e4d55e88a6e4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYXRjaGElMjBsYXR0ZSUyMGdyZWVuJTIwdGVhfGVufDF8fHx8MTc3Mjg0NTQ2MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      alt: "Matcha Latte",
    },
    {
      id: 8,
      url: cake,
      alt: "Bánh ngọt",
    },
    {
      id: 9,
      url: table,
      alt: "Bàn ghế cổ điển",
    },
  ];

  return (
    <section id="gallery" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl mb-4 text-gray-800 bg-green-400 w-full py-4 text-center">
            Thư viện ảnh
          </h2>
          <div className="w-24 h-1 bg-green-600 mx-auto mb-4" />
          <p className="text-gray-600 text-lg">
            Khám phá không gian và những món đồ uống tuyệt vời của chúng tôi
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {images.map((image) => (
            <div
              key={image.id}
              className="relative overflow-hidden rounded-lg shadow-lg group aspect-square"
            >
              <img
                src={image.url}
                alt={image.alt}
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <p className="text-white text-lg">{image.alt}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
