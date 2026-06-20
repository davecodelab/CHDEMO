export type FeaturedProject = {
  info: string;
  title: string;
  description: string;
  image: string;
};

const featuredProjectsContent: FeaturedProject[] = [
  {
    info: "Handcrafted signage for indoor elegance and identity",
    title: "Custom Indoor Signs",
    description:
      "Precision-carved wooden and mixed-material signs designed for homes, studios, and businesses. Each piece blends typography and texture to create a warm, timeless identity within interior spaces.",
    image: "/handicrafts/signage.jpg",
  },
  {
    info: "Meaningful handcrafted gifts tailored to every moment",
    title: "Personalized Gifts",
    description:
      "Custom engraved keepsakes crafted from wood and natural materials. Each piece is personalized for birthdays, weddings, anniversaries, and special milestones that deserve lasting memory.",
    image: "/handicrafts/gifts.jpg",
  },
  {
    info: "Rustic centerpiece furniture with natural craftsmanship",
    title: "Rustic Coffee Tables",
    description:
      "Solid wood coffee tables built with raw textures, organic edges, and artisanal finishing. Designed to bring warmth, grounding, and character into modern and traditional living spaces.",
    image: "/handicrafts/table.png",
  },
  {
    info: "Artisanal handcrafted bags with natural materials",
    title: "Handmade Wooden & Fabric Bags",
    description:
      "Unique handcrafted bags combining wood accents, leather, and woven materials. Designed for durability and style, each piece reflects a fusion of tradition and contemporary craft.",
    image: "/handicrafts/bags.jpg",
  },
];

export default featuredProjectsContent;