export interface ProjectItemType {
  number: number;
  title: string;
  description: string;
  subDescription?: string;
  main_tag: string;
  tags: string[];
  imageUrl: string;
  videoUrl?: string;
  showcaseUrl?: string;
  figmaUrl: string;
}

export const projectItems: ProjectItemType[] = [
  {
    number: 1,
    title: "VExtract",
    description: "AI-powered GovTech",
    subDescription: "AI-powered GovTech",
    main_tag: "Web App",
    tags: ["ADP", "OCR", "Dashboard"],
    imageUrl:
      "https://res.cloudinary.com/ojnl7vfz/image/upload/v1784646666/Intro_Vextract_rwey9g.png",
    videoUrl:
      "https://res.cloudinary.com/ojnl7vfz/video/upload/v1786201206/Extract_ulg7jl.mp4",
    figmaUrl:
      "https://www.figma.com/design/7Hl6wHhAlOIDD5S7cHPy0N/OCR?node-id=2-5&t=S7rciGV41SZHxS5H-1",
    showcaseUrl:
      "https://res.cloudinary.com/ojnl7vfz/image/upload/v1786425648/Vextract_showcase_v4uxkm.pdf",
  },
  {
    number: 2,
    title: "Pawmate",
    description: "Android mobile app for pet owners",
    subDescription: "Mobile Application",
    main_tag: "Mobile App",
    tags: ["Solution", "Pet Care"],
    imageUrl:
      "https://res.cloudinary.com/ojnl7vfz/image/upload/v1786201091/pawmate_thumbnail_locgyi.png",
    showcaseUrl:
      "https://res.cloudinary.com/ojnl7vfz/image/upload/Pawmate_research_gigmab.pdf",
    figmaUrl:
      "https://www.figma.com/design/Tv48Bo5a4GwP2Md2K2ovbX/UIUX-Fresher-%E2%80%93-Hu%E1%BB%B3nh-Th%E1%BB%8B-Tr%C3%BAc-Lam-%E2%80%93-Track-A?node-id=58-1325&t=8CNkJS2LBpND3MgH-1",
  },
  {
    number: 3,
    title: "Melody",
    description: "Social Music Experience",
    subDescription: "Discover, connect, and enjoy music together.",
    main_tag: "Mobile App",
    tags: ["Music", "Social", "Streaming"],
    imageUrl:
      "https://res.cloudinary.com/ojnl7vfz/image/upload/v1786365744/Melody_thumbnail_c8rox6.png",
    figmaUrl:
      "https://www.figma.com/design/1ZbA0tZ6xvl7DdpvZaBlCV/Music-Mobile-App--Android-?node-id=94-2888&t=T1H4rRkw23xD9KvH-1",
    showcaseUrl:
      "https://res.cloudinary.com/ojnl7vfz/image/upload/v1786424629/Melody_Showcase_uybnza.pdf",
  },
];
